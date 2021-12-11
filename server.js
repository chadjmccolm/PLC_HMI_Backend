// Necessary imports
const express = require("express");
const bodyParser  = require("body-parser");
const cors = require("cors");

// Create the express server
const app = express();

// Establish cors and attach to express
app.use(cors());

// Parse requests of content-type = application/json
app.use(bodyParser.json());

// parse requests of content-type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 80;
require("./src/controller.routes")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});