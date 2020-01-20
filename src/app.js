const path = require("path");
const express = require("express");
const app = express();
// console.log(path.join(__dirname, "../public"));
const publicDirectoryPath = path.join(__dirname, "../public");
app.set("view engine", "hbs");
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
    content: "This is the content"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    content: "This is the help content"
  });
});
app.get("/weather", (req, res) => {
  res.send({ temperature: 27, forecast: "Sunny", location: "Engandiyur" });
});
app.listen(3000, () => {
  console.log();
  console.log("Server is up on port 3000");
});
