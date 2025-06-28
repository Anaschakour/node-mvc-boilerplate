const winston = require("winston");
const { createLogger, format, transports } = winston;
const { printf, combine, colorize, uncolorize, timestamp } = format;

const winstonFormat = format.printf(obj => {
    const { level, message, timestamp, stack } = obj;
    return `${timestamp}:${level}:${stack || message}:`;
});
const logger = createLogger({
    level: process.env.ENV === "development" ? "debug" : "info",

    format: combine(
        timestamp(),
        winstonFormat,
        process.env.ENV === "development" ? colorize() : uncolorize()
    ),
    transports: [new transports.Console()]
});
module.exports = logger;
