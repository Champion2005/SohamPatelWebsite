/**
 * Windsor Ward 9 GeoJSON Polygon Data & High-Speed Geocoding Utilities
 * Sourced from City of Windsor Open Data, ESRI ArcGIS World Geocoding & Photon OSM
 */

export const WARD9_GEOJSON = {
  type: "Feature",
  properties: {
    WARD: "WARD 9",
    NUMBER: "9",
    NAME: "Ward 9 - Windsor, ON"
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-82.970130571786711, 42.244889958572799],
        [-82.972770695182291, 42.245097095043455],
        [-82.977662542573313, 42.246509370903631],
        [-82.997643273567093, 42.251078254937582],
        [-82.999714959578611, 42.252000726228175],
        [-83.000823100624402, 42.253031042304933],
        [-83.003805301020137, 42.257175888712958],
        [-83.016028271709132, 42.276145589448817],
        [-83.008426289503021, 42.277114310197689],
        [-83.00051676596172, 42.279814111117581],
        [-82.99547854303799, 42.280911452483579],
        [-82.981605186217479, 42.283537846373328],
        [-82.968373454380426, 42.285118126394927],
        [-82.94500498860701, 42.28931930172341],
        [-82.933125463156387, 42.291587670370852],
        [-82.918121960524232, 42.29540142525974],
        [-82.905778565859293, 42.297651006451453],
        [-82.903472926009982, 42.298497106727545],
        [-82.895119705332846, 42.304010881193207],
        [-82.89499864261856, 42.303534748314298],
        [-82.896644668283216, 42.301650891133669],
        [-82.897938670275806, 42.298042784718547],
        [-82.895945517950622, 42.288383017251611],
        [-82.900408721766951, 42.28847168315761],
        [-82.897637274176418, 42.276442338787376],
        [-82.897996825226357, 42.276378979287323],
        [-82.897866661597718, 42.275824763488096],
        [-82.904909203367154, 42.274583829307382],
        [-82.904055753293818, 42.272356112618503],
        [-82.903587019531514, 42.272339231398462],
        [-82.905745717206855, 42.242016235978923],
        [-82.935262512853853, 42.242986239065885],
        [-82.938570430295684, 42.243691827203492],
        [-82.951863436212832, 42.248063187147842],
        [-82.95370933445453, 42.248402278736158],
        [-82.95496671861676, 42.24904741065518],
        [-82.957628947166384, 42.249433564583747],
        [-82.959236047318001, 42.249204243610713],
        [-82.960986632384461, 42.249543595597302],
        [-82.960951258013083, 42.247332553082806],
        [-82.970130571786711, 42.244889958572799]
      ]
    ]
  }
};

export const WARD9_CENTER = [42.2682, -82.9485]; // [lat, lng]
export const WARD9_BOUNDS = [
  [42.2420, -83.0160], // Southwest [lat, lng]
  [42.3040, -82.8950]  // Northeast [lat, lng]
];

// Windsor Bounding Box
export function inWindsor(lat, lng) {
  return lat >= 42.20 && lat <= 42.36 && lng >= -83.12 && lng <= -82.85;
}

// Ray-casting algorithm for Point in Polygon test
export function pointInWard9(lat, lng) {
  const vs = WARD9_GEOJSON.geometry.coordinates[0];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > lat) !== (yj > lat)) &&
      (lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// 1. ESRI ArcGIS World Geocoding (Primary - Ultra Fast & Precise for Canadian Addresses)
export async function arcgisSearch(input) {
  const q = input.trim();
  if (!q) return [];
  const query = q.toLowerCase().includes('windsor') ? q : `${q}, Windsor, ON`;
  const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${encodeURIComponent(query)}&location=-82.9485,42.2682&distance=30000&maxLocations=5&outFields=Match_addr,Addr_type,StAddr,City`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.candidates || !Array.isArray(data.candidates)) return [];
    return data.candidates
      .filter(c => c.location && inWindsor(c.location.y, c.location.x))
      .map(c => {
        const addr = c.address || c.attributes?.Match_addr || '';
        const cleanLabel = addr.includes('Windsor') ? addr : `${addr}, Windsor, ON`;
        return {
          label: cleanLabel,
          lat: c.location.y,
          lng: c.location.x,
          quality: (c.attributes?.Addr_type || '').toLowerCase().includes('point') ? 'address' : 'street',
          source: 'arcgis'
        };
      });
  } catch {
    return [];
  }
}

// 2. Photon OSM (Secondary - High speed, no rate limit)
export async function photonSearch(input) {
  const q = input.trim();
  if (!q) return [];
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&lat=42.2682&lon=-82.9485&limit=5`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.features || !Array.isArray(data.features)) return [];
    return data.features
      .filter(f => f.geometry?.coordinates && inWindsor(f.geometry.coordinates[1], f.geometry.coordinates[0]))
      .map(f => {
        const props = f.properties || {};
        const house = props.housenumber ? `${props.housenumber} ` : '';
        const street = props.name || props.street || '';
        const primary = (house || street) ? `${house}${street}`.trim() : (props.city || 'Windsor');
        return {
          label: `${primary}, Windsor, ON`,
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
          quality: props.housenumber ? 'address' : 'street',
          source: 'photon'
        };
      });
  } catch {
    return [];
  }
}

// Fast parallel search engine
export async function searchWindsorAddress(input) {
  if (!input || input.trim().length < 2) return [];

  try {
    // Run ESRI ArcGIS and Photon in parallel for maximum speed
    const [arcResults, photonResults] = await Promise.allSettled([
      arcgisSearch(input),
      photonSearch(input)
    ]);

    const arcList = arcResults.status === 'fulfilled' ? arcResults.value : [];
    const photonList = photonResults.status === 'fulfilled' ? photonResults.value : [];

    const combined = [...arcList, ...photonList];

    // Deduplicate and rank
    const seen = {};
    const unique = [];
    for (const r of combined) {
      const key = `${r.lat.toFixed(4)},${r.lng.toFixed(4)}`;
      if (!seen[key]) {
        seen[key] = true;
        unique.push(r);
      }
    }
    return unique.slice(0, 5);
  } catch {
    return [];
  }
}
