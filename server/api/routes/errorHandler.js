const logger = require("../middleware/winstonConfig");

const notFoundHandler = (req, res, next) => {
    const error = new Error(`EndPoint Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

const catchHandler = (error, req, res, next) => {
    const statusCode = error.statusCode === 500 || error.statusCode === undefined ? 500 : error.statusCode;
    logger.error(error, { metadata: { status: error.statusCode, stack: error.stack} });
    res.status(statusCode);
    res.json({
        message: error.message,
        metadata: {
            stack: error.stack,
            status: res.statusCode
        }
    });
};

module.exports = { notFoundHandler, catchHandler };