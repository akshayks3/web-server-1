const path = require("path");
const hbs = require("hbs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");
// console.log(path.join(__dirname, "../public"));
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "akshay"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "akshay"
  });
});
app.get("/weather", (req, res) => {
  var forecastresult;
  var temperature;
  var location;
  if (!req.query.address) {
    return res.send({ error: "No address parameter" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error != null) {
        return res.send({ error: "Location not found" });
      }

      forecast(latitude, longtitude, (error, response) => {
        if (error == undefined) {
          res.send({
            forecast: response.forecast,
            temperature: response.temperature,
            address: req.query.address
          });
        } else {
          console.log("error");
        }
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "No search parameter" });
  }
  console.log(req.query);
  res.send({ products: [] });
});
app.get("/help/*", (req, res) => {
  res.render("404page", { body: "help article not found", name: "Akshay" });
});
app.get("*", (req, res) => {
  res.render("404page", { body: "Error 404 page not found", name: "Akshay" });
});

app.listen(port, () => {
  console.log();
  console.log("Server is up on port port");
});
