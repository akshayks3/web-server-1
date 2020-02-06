const request = require("request");
const forecast = (latitude, longtitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/59a08518ea5618d98e44a3f95187ebda/" +
    latitude +
    "," +
    longtitude +
    "?units=si";
  request({ url: url, json: true }, (error, response) => {
    console.log(response);
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.error) {
      callback("Location not found", undefined);
    } else {
      callback(undefined, {
        temperature: response.body.currently.temperature,
        forecast: response.body.currently.summary
      });
    }
  });
};
module.exports = forecast;
