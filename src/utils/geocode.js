const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWtzaGF5MzU3MyIsImEiOiJjazVmNTd3dWkyNWZjM2tyZjB4YmdkZnpoIn0.v8z9QWRu8pSzdwc0o8o_hA";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("error", undefined);
    } else if (response.body.features.length == 0) {
      console.log("Unable to find location");
      callback("error", undefined);
    } else {
      const longtitude = response.body.features[0].center[0];
      const latitude = response.body.features[0].center[1];
      const location = response.body.features[0].place_name;
      callback(error, {
        longtitude: longtitude,
        latitude: latitude,
        location: location
      });
    }
  });
};
module.exports = geocode;
