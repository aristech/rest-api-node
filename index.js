const winston = require("winston");
const express = require("express");
const app = express();
const dev = process.env.NODE_ENV !== "production";

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
if (!dev) require("./startup/prod")(app);

const port = process.env.PORT || 4444;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
