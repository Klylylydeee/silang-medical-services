// NPM Dependencies
const io = require("socket.io-client");
const express = require("express");

// Environment Variables
const dotenv = require("dotenv").config({ path: "./environment/config.env" });

// Express Initialization
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// WS Initilization
const socket = io.connect(`${process.env.WS_SERVER}`, {
    // reconnection: true
});

// NodeJS Port Instance
app.listen(process.env.PORT, () =>{
    console.log(`Running at port http://localhost:${process.env.PORT}/`)
});

// Routes and Rooms
app.get("/", async (req, res, next) => {

    // Get the query params and send it as data to the WS room
    socket.emit(`${process.env.WS_TOPIC_LOGIN}`, {
        number: req.query.num,
        message: req.query.msg
    })

    res.status(200).send({
        number: req.query.num,
        message: req.query.msg
    });
    
});