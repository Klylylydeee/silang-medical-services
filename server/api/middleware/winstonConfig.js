const { createLogger, format, transports } = require("winston");

require("winston-mongodb");

const { printf, combine, timestamp, colorize, errors } = format;
const logFormat = printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} | ${level} | ${stack || message}`;
});

let logger;

process.env.LOGGER_TYPE === "LOCAL" ?
    logger = createLogger({
        level: process.env.LOGGER_LEVEL,
        format: combine(
            colorize(),
            timestamp({ format: "YYYY-MM-DD HH:mm" }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({
                level: "error",
                filename: "util/winston.log"
            })
        ],
    }) :
    logger = createLogger({
        level: process.env.LOGGER_LEVEL,
        format: combine(
            timestamp({ format: "YYYY-MM-DD HH:mm" }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console(),,
            new transports.MongoDB({
                level: "error",
                db : process.env.MONGO_URI,
                options: {
                    useUnifiedTopology: true
                },
                collection: "logs",
                format: format.combine(
                format.timestamp(),
                format.json())
            })
        ],
    })
;

module.exports = logger;