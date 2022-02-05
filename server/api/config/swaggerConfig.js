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
                // url: `https://silang-medical-services-api.com`,
                url: `http://localhost:1000`,
            },
        ],
    },
    apis: ["server.js", "./view/*.js", "./model/*.js"],
};

const swaggerConfig = swaggerJsDoc(options);

module.exports = swaggerConfig;