const Activity = require("../model/activityLog");
const ErrorLogs = require("../model/errorLogs");

exports.activityLogger = async (req, res, next) => {
    try {
        const ip = (req.headers['x-forwarded-for'] ||  req.connection.remoteAddress ||  req.socket.remoteAddress || req.connection.socket.remoteAddress || req.ip ).split(",")[0];
        Activity.create({
            ...(req.originalUrl) && { path: req.originalUrl },
            meta: {
                ...(req.body) && { body: { ...req.body } },
                ...(req.params) && { params: { ...req.params } },
                ...(req.query) && { query: { ...req.query } },
            },
            ...(req.authDataPayload) && { auth: req.authDataPayload},
            type: req.authDataPayload ? "Private" : "Public",
            httpMethod: req.method,
            ...(ip) && { ipSource: ip}
        })
        next();
    } catch(err) {
        ErrorLogs.create({
            timestamp: new Date(),
            level: "error",
            message: "Acitivty log create error",
            meta: {
                status: 500,
                stack: err.stack
            }
        })
        next();
    }
};
