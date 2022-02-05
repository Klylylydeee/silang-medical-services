const morgan = require("morgan");

const morganConfig = morgan(
    ":date[web] :remote-addr :method :url :status :res[content-length] - :response-time ms"
);

module.exports = morganConfig;