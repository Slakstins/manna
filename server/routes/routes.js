
const express = require("express");
const req = require("express/lib/request");
const app = express();
const addAddressRoutes = require("./address");
const addDriverRoutes = require("./driver");

addAddressRoutes(app);
addDriverRoutes(app);

module.exports = app;