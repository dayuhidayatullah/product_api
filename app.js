const express = require("express");
const app = express();
const router = require("./router");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

module.exports = app;
