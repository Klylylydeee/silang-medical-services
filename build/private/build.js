const path = require("path");
const express = require("express");
const app = express(); // create express app

// add middlewares
app.use(express.static(path.join(__dirname, "./", "single-page")));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "./", "single-page", "index.html"));
});

// start express server on port 5000
app.listen(5004, () => {
    console.log(`server started on port ${process.env.PORT || 5004}`);
});