const fs = require("fs");
const path = require("path");
global.appRoot = path.resolve(`../${__dirname}`);

const base64Encode = (file) => {
    return fs.readFileSync(file, { encoding: "base64" });
};

module.exports = { base64Encode };