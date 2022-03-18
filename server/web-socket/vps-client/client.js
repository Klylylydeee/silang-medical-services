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
app.get("/default", 
    
    async (req, res, next) => {
        const authHeader = req.get("Authorization");
        if (authHeader === undefined) {
            res.status(403).send({
                message: "Authorization does not exist!",
                status: "Error",
                statusCode: 403
            });
        }
        if(authHeader !== process.env.SECRET_CLIENT_KEY){
            res.status(403).send({
                message: "Incorrect authorization code!",
                status: "Error",
                statusCode: 403
            });
        }
        next();
    },

    async (req, res, next) => {
        // Get the query params and send it as data to the WS room
        socket.emit(`${process.env.WS_TOPIC_LOGIN}`, {
            id: req.query.smsId,
            number: req.query.num,
            message: req.query.msg
        })

        res.status(200).send({
            id: req.query.smsId,
            number: req.query.num,
            message: req.query.msg
        });
    }
    
);

app.get("/announcement", 
    
    async (req, res, next) => {
        const authHeader = req.get("Authorization");
        if (authHeader === undefined) {
            res.status(403).send({
                message: "Authorization does not exist!",
                status: "Error",
                statusCode: 403
            });
        }
        if(authHeader !== process.env.SECRET_CLIENT_KEY){
            res.status(403).send({
                message: "Incorrect authorization code!",
                status: "Error",
                statusCode: 403
            });
        }
        next();
    },

    async (req, res, next) => {
        // Get the query params and send it as data to the WS room
        socket.emit(`${process.env.WS_TOPIC_COMMS}`, {
            id: req.query.id,
            announcement: req.query.announcement
        });

        res.status(200).send({
            id: req.query.announcementId,
            announcement: req.query.announcement
        });
    }
    
);