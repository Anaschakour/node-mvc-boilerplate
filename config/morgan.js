const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const config = require("./../config/config.js");
let counter = 0;
morgan.token("log-number", function getId(req) {
    counter++;
    return counter;
});

morgan.token("error", (req, res) => res.locals.errMessage.message || " ");

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "..", "logs/access.log"),
    { flags: "a" }
);

const getIpAdresse = () =>
    config.env === "development" ? ":remote-addr - " : "";

const successFormat = `:log-number --- ${getIpAdresse()} :method :url :status :response-time ms :date`;

const successHandler = morgan(successFormat, {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode >= 400
});

const errorFormat = `:log-number --- ${getIpAdresse()} :method :url :status
:response-time ms :date :error`;

const errorHandler = morgan(errorFormat, {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400
});

module.exports = { successHandler, errorHandler };
