const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Silang Medical Services",
            version: "1.0.0",
            description: "Public and Private Routes",
        },
        servers: [
            {
                url: process.env.DEPLOYMENT_STATUS === "YES" && process.env.SERVER_MODE !== "admin" ? "https://api.silangmedical.com" : "http://localhost:1000",
            },
            {
                url: process.env.DEPLOYMENT_STATUS === "YES" && process.env.SERVER_MODE === "admin" && "https://admin-api.silangmedical.com",
            }
        ],
    },
    apis: ["server.js", "./view/*.js", "./model/*.js"],
};

const swaggerConfig = swaggerJsDoc(options);

module.exports = swaggerConfig;