/**
 * Windsor Ward 9 GeoJSON Polygon Data & Boundary Utilities
 * Sourced from City of Windsor Open Data & Open North Represent Boundary API
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

// Query generator with address variations
export function queryVariations(raw) {
  const v = raw.trim().replace(/,.*$/, '');
  if (!v) return [];
  const variations = [v];
  const hasSuffix = /\b(ave|avenue|st|street|rd|road|dr|drive|blvd|boulevard|crt|court|crescent|cres|way|pl|place|ln|lane|hwy|pkwy|terrace|ter)\b\.?/i.test(v);
  if (!hasSuffix && /\d/.test(v)) {
    ['Walker Rd', 'Tecumseh Rd', 'Howard Ave', 'Provincial Rd', 'Division Rd', 'Cabana Rd'].forEach(s => variations.push(`${v} ${s}`));
  }
  return variations.map(x => `${x}, Windsor, ON, Canada`);
}

// OpenStreetMap Nominatim lookup (Primary & Most Reliable)
export async function nominatimSearch(q) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&countrycodes=ca&addressdetails=1`;
  try {
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en'
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter(item => inWindsor(parseFloat(item.lat), parseFloat(item.lon)))
      .map(item => {
        const addr = item.address || {};
        let primary = '';
        if (addr.house_number && addr.road) primary = `${addr.house_number} ${addr.road}`;
        else if (addr.road) primary = addr.road;
        else if (addr.pedestrian) primary = addr.pedestrian;
        else if (addr.building) primary = addr.building;
        else if (addr.amenity) primary = addr.amenity;
        else primary = (item.display_name || '').split(',')[0].trim();
        const quality = addr.house_number ? 'address' : (addr.road ? 'street' : 'place');
        return {
          label: `${primary || 'Windsor'}, Windsor, ON`,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          quality,
          source: 'nominatim'
        };
      });
  } catch {
    return [];
  }
}

// Canada Geolocation API lookup (Safe secondary fallback)
export async function geogratisSearch(q) {
  // Only query GeoGratis if query contains letters (not pure numbers like "1234" which break GeoGratis)
  if (!/[a-zA-Z]/.test(q.split(',')[0])) return [];
  const url = `https://www.geolocator.api.geo.ca/geolocation/en/locate?q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter(item => item.geometry?.coordinates && inWindsor(item.geometry.coordinates[1], item.geometry.coordinates[0]))
      .map(item => {
        const type = (item.type || '').toLowerCase();
        const quality = type.includes('address') ? 'address' : (type.includes('street') ? 'street' : 'place');
        const primary = (item.title || '').split(',')[0].trim();
        return {
          label: `${primary || 'Windsor'}, Windsor, ON`,
          lat: item.geometry.coordinates[1],
          lng: item.geometry.coordinates[0],
          quality,
          source: 'geogratis'
        };
      });
  } catch {
    return [];
  }
}

// Combined search with ranking and deduplication
export async function searchWindsorAddress(input) {
  const variations = queryVariations(input);
  if (!variations.length) return [];

  try {
    // Query Nominatim first as primary provider
    const nomResults = await nominatimSearch(variations[0]);
    let combined = [...nomResults];

    // If Nominatim returns few results and input has street names, query GeoGratis in background
    if (combined.length < 3 && /[a-zA-Z]/.test(input)) {
      const geoResults = await geogratisSearch(variations[0]);
      combined = [...combined, ...geoResults];
    }

    // Deduplicate and rank
    const qRank = { address: 0, street: 1, place: 2 };
    const sRank = { nominatim: 0, geogratis: 1 };
    combined.sort((a, b) => {
      const qa = qRank[a.quality] ?? 9;
      const qb = qRank[b.quality] ?? 9;
      if (qa !== qb) return qa - qb;
      return (sRank[a.source] ?? 9) - (sRank[b.source] ?? 9);
    });

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
