const cors = require("cors");

const whitelist = [
    process.env.DEPLOYMENT_STATUS === "YES" ? "http://api.silangmedical.com" : "http://localhost:3000",
    "http://localhost:1000"
];

const corsConfig = cors({
    origin: (origin, callback) => {
        let error = new Error("Site Origin is not allowed by CORS");
        error.statusCode = 400
        whitelist.indexOf(origin) !== -1 || !origin ?
            callback(null, true) : callback(error)
    },
    methods: "GET,PUT,PATCH,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
})

module.exports = corsConfig;