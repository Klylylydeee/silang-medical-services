const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1 * 60 * 100,
    max: 100,
    statusCode: 403,
    message: {
        status: 403,
        type: "error",
        message: "Max request to the server has been met. IP is temporarily banned from requesting. Please wait for 1 minutes"
    }
});

module.exports = limiter;