const { getGeoCodedAddress, getSuburbDetails } = require('./api');
const { v4: uuidv4 } = require('uuid');
const { isAddressValid } = require('./validation');
const ApiError = require('./errors/apiError');
const ClientError = require('./errors/clientError');

module.exports.handler = async (event) => {
  const requestId = uuidv4();
  const addressString = event.queryStringParameters?.address;

  console.info(`[request id - ${requestId}] Received request for ${addressString}`);

  if (!isAddressValid(addressString)) {
    console.error(`[Error]: ${requestId} address string validation failed`);
    return new ClientError();
  }

  const geoCodedAddress = await getGeoCodedAddress(addressString, requestId);
  if (!geoCodedAddress || !geoCodedAddress.features || !geoCodedAddress.features.length > 0)
    return new ApiError();

  const featureCollection = geoCodedAddress.features;
  const coordinates = featureCollection[0].geometry.coordinates;

  const suburbDetails = await getSuburbDetails(coordinates, requestId);
  if (!suburbDetails || !suburbDetails.features)
    return new ApiError();

  const suburbFeature = suburbDetails.features[0];


  return {
    statusCode: 200,
    headers: {
      requestId: requestId
    },
    body: JSON.stringify(
      {
        location: {
          longitude: `${coordinates[0]}`,
          latitude: `${coordinates[1]}`
        },
        suburb: suburbFeature.properties.districtname,
        district: suburbFeature.properties.districtname
      },
      null,
      2
    )
  };
};
