exports.getGeoCodedAddress = async (address, requestId) => (
  await fetch('https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Geocoded_Addressing_Theme/FeatureServer/1/query?' + new URLSearchParams({
    where: `address = '${address}'`,
    outFields: '*',
    f: 'geojson'
  })).then(function(response) {
    return response.json();
  }).then(function(data) {
    return data;
  }).catch(error =>
    console.error(`[Error]: ${requestId} ${error.stack || error.message}`)
  )
);

exports.getSuburbDetails = async (coordinates, requestId) => (
  await fetch('https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Administrative_Boundaries_Theme/FeatureServer/4/query?' + new URLSearchParams({
    geometry: `${coordinates[0]}, ${coordinates[1]}`,
    geometryType: 'esriGeometryPoint',
    inSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
    returnGeometry: 'false',
    outFields: '*', f: 'geojson'
  })).then(function(response) {
    return response.json();
  }).then(function(data) {
    return data;
  }).catch(error =>
    console.error(`[Error]: ${requestId} ${error.stack || error.message}`)
  )
);