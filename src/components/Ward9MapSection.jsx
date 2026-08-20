import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Search, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Loader2,
  MousePointerClick
} from 'lucide-react';
import { 
  WARD9_GEOJSON, 
  WARD9_CENTER, 
  WARD9_BOUNDS, 
  pointInWard9, 
  searchWindsorAddress 
} from '../data/ward9Data';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Ward9MapSection = ({ onLawnSignClick, onVolunteerClick }) => {
  useScrollReveal();

  const [addressInput, setAddressInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const wardLayerRef = useRef(null);
  const markerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const isMobile = window.innerWidth < 768;

    const map = L.map(mapContainerRef.current, {
      center: WARD9_CENTER,
      zoom: isMobile ? 11 : 12,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Ward 9 GeoJSON Styling (Red #FF0000 Boundary)
    const wardLayer = L.geoJSON(WARD9_GEOJSON, {
      style: {
        color: '#FF0000',
        weight: 3.5,
        opacity: 0.95,
        fillColor: '#FF0000',
        fillOpacity: 0.22,
        dashArray: '4, 4'
      }
    }).addTo(map);

    wardLayerRef.current = wardLayer;

    const padding = isMobile ? [12, 12] : [30, 30];
    map.fitBounds(WARD9_BOUNDS, { padding });
    if (isMobile) {
      map.setZoom(map.getZoom() - 1);
    }

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const inside = pointInWard9(lat, lng);
      handleLocationCheck(lat, lng, `Tapped Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`, inside);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setAddressInput(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (val.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchWindsorAddress(val);
        setSuggestions(results);
      } catch (err) {
        console.error('Lookup failed', err);
      }
    }, 200);
  };

  const handleLocationCheck = (lat, lng, label, forceInside = null) => {
    const inside = forceInside !== null ? forceInside : pointInWard9(lat, lng);
    const resultObj = {
      status: inside ? 'in' : 'out',
      label: label,
      lat,
      lng
    };

    setSearchResult(resultObj);
    setSuggestions([]);

    const map = mapInstanceRef.current;
    if (!map) return;

    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    const markerColor = inside ? '#FF0000' : '#0A3E88';
    const pinHtml = `
      <div style="
        background: ${markerColor};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          transform: rotate(45deg);
        "></div>
      </div>
    `;

    const customIcon = L.divIcon({
      html: pinHtml,
      className: 'custom-ward-pin',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    markerRef.current = marker;

    map.flyTo([lat, lng], 15, { duration: 0.8 });

    const popupContent = `
      <div style="font-family: 'Oswald', sans-serif; padding: 4px;">
        <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: ${inside ? '#FF0000' : '#0A3E88'}; margin-bottom: 4px; text-transform: uppercase; font-size: 13px;">
          ${inside ? '✓ Inside Ward 9' : '✕ Outside Ward 9'}
        </div>
        <div style="font-size: 12px; color: #1E293B; font-weight: 600; margin-bottom: 4px;">${label}</div>
        <div style="font-size: 11px; color: #64748B; line-height: 1.4;">
          ${inside 
            ? 'Eligible to vote for Soham Patel for Windsor City Council.' 
            : 'This location is outside the Windsor Ward 9 boundary.'}
        </div>
      </div>
    `;

    marker.bindPopup(popupContent).openPopup();
  };

  const handleSearchSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!addressInput.trim()) return;

    setIsLoading(true);
    setSuggestions([]);

    try {
      const results = await searchWindsorAddress(addressInput);
      setIsLoading(false);

      if (results && results.length > 0) {
        const top = results[0];
        setAddressInput(top.label);
        handleLocationCheck(top.lat, top.lng, top.label);
      } else {
        setSearchResult({
          status: 'unknown',
          label: `"${addressInput}" could not be located`,
          lat: WARD9_CENTER[0],
          lng: WARD9_CENTER[1]
        });
      }
    } catch {
      setIsLoading(false);
      setSearchResult({
        status: 'unknown',
        label: 'Lookup service temporarily unavailable',
        lat: WARD9_CENTER[0],
        lng: WARD9_CENTER[1]
      });
    }
  };

  const handleSelectSuggestion = (item) => {
    setAddressInput(item.label);
    setSuggestions([]);
    handleLocationCheck(item.lat, item.lng, item.label);
  };

  const handleClear = () => {
    setAddressInput('');
    setSuggestions([]);
    setSearchResult(null);
    if (markerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
      markerRef.current = null;
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      const isMobile = window.innerWidth < 768;
      const padding = isMobile ? [12, 12] : [30, 30];
      mapInstanceRef.current.fitBounds(WARD9_BOUNDS, { padding });
      if (isMobile) {
        mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() - 1);
      }
    }
  };

  return (
    <section id="ward9" className="scroll-mt-24 w-full space-y-8">
      
      {/* =================================================================
         SECTION HEADER & INTRO
         ================================================================= */}
      <div className="border-l-4 border-[#FF0000] pl-4 sm:pl-6 space-y-2 reveal-up">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A3E88]">
          Ward 9 Interactive Map
        </h2>
        <p className="text-slate-600 font-medium text-base sm:text-lg max-w-3xl leading-relaxed">
          Ward 9 covers a beautiful stretch of South & East Windsor — home to strong neighbourhoods, growing families, and steady new development. Use the search tool below or click on your house/area to find out if you're in Ward 9.
        </p>
      </div>

      {/* =================================================================
         INTERACTIVE MAP CONTAINER CARD (Static Container - No Hover Lift)
         ================================================================= */}
      <div className="w-full rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden relative reveal-zoom">
        
        {/* Floating Instruction Callout Banner on Top of Map */}
        <div className="bg-[#0A3E88] text-white px-4 py-2.5 text-center text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 border-b border-blue-900">
          <MousePointerClick className="w-4 h-4 text-[#FF0000] shrink-0 animate-bounce" />
          <span>Click on your house / neighborhood area to find out if you are in Ward 9</span>
        </div>

        {/* Floating Top Search Bar */}
        <div className="absolute top-14 left-4 right-4 sm:left-6 sm:right-auto sm:w-[480px] md:w-[540px] z-[1000] space-y-1">
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-300 shadow-lg flex items-center p-1.5 transition-all focus-within:border-[#FF0000] focus-within:ring-2 focus-within:ring-red-500/20 gap-1.5"
          >
            <div className="pl-3 pr-1 text-[#FF0000] shrink-0">
              <Search className="w-5 h-5" />
            </div>

            <input 
              type="text"
              value={addressInput}
              onChange={handleInputChange}
              placeholder="Enter Windsor address..."
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 py-2.5 px-1"
            />

            {addressInput && (
              <button 
                type="button" 
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm ml-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Checking</span>
                </>
              ) : (
                <span>Check</span>
              )}
            </button>
          </form>

          {/* Autocomplete Suggestions Box */}
          {suggestions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleSelectSuggestion(item)}
                  className="p-3 hover:bg-red-50 transition-colors cursor-pointer flex items-start gap-2.5 text-left"
                >
                  <MapPin className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{item.label}</p>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{item.quality}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live Status Result Banner */}
          {searchResult && (
            <div className={`p-4 rounded-2xl border shadow-lg backdrop-blur-md animate-slide-up-fade ${
              searchResult.status === 'in'
                ? 'bg-[#0A3E88]/95 border-[#FF0000] text-white'
                : searchResult.status === 'out'
                ? 'bg-slate-900/90 border-slate-700 text-slate-100'
                : 'bg-amber-900/90 border-amber-500 text-white'
            }`}>
              <div className="flex items-start gap-3">
                {searchResult.status === 'in' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#FF0000] bg-white rounded-full shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm uppercase tracking-wide">
                      {searchResult.status === 'in' 
                        ? 'You are in Ward 9!' 
                        : searchResult.status === 'out' 
                        ? 'Address is Outside Ward 9' 
                        : 'Search Notice'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200">{searchResult.label}</p>
                  
                  {searchResult.status === 'in' && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={onLawnSignClick}
                        className="px-3.5 py-1.5 rounded-lg bg-[#FF0000] hover:bg-[#D90000] text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                      >
                        Request Lawn Sign
                      </button>
                      <button
                        onClick={onVolunteerClick}
                        className="px-3.5 py-1.5 rounded-lg bg-[#062654] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-sm border border-blue-400/30"
                      >
                        Join Team Soham
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Leaflet Map Canvas */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-[480px] sm:h-[560px] lg:h-[620px] z-10"
        />

        {/* Recenter & Map Controls Overlay */}
        <div className="absolute bottom-4 left-4 z-[1000] flex items-center gap-2">
          <button
            onClick={handleRecenter}
            className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-300 shadow-md hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FF0000]" />
            <span>Reset Ward 9 View</span>
          </button>
        </div>

        {/* Map Legend (Bottom Right) */}
        <div className="absolute bottom-4 right-14 z-[1000] bg-white/95 backdrop-blur-md border border-slate-300 rounded-xl px-3 py-2 shadow-md flex items-center gap-2 text-xs font-bold text-slate-700 hidden sm:flex uppercase">
          <div className="w-4 h-4 rounded bg-[#FF0000]/30 border-2 border-[#FF0000]" />
          <span>Windsor Ward 9 Zone</span>
        </div>

      </div>

    </section>
  );
};
