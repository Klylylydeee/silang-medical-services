// Web socket Modules
const io = require("socket.io-client");
// Environment Variables
const dotenv = require("dotenv").config({ path: "./environment/config.env" });
// In-premise SMS Module
const serialportgsm = require("./modules/serialport-gsm");
const serialConfig = require("./modules/gsmConfig.json");
const modem = serialportgsm.Modem();

// Initialize GSM Modem
modem.open("/dev/ttyUSB0", serialConfig, {});  // COM05 for windows, ttyUSB0 for linux
modem.setOwnNumber(`${process.env.GSM_PHONENUMBER}`, {});
modem.on("open", data => {
    modem.initializeModem((data) => {
        console.log("modem initialized");
    });
});

//Initialize WS connection 
const socket = io.connect(`${process.env.WS_SERVER}`, {});
socket.on("connect", () => {
    // Log once connected to a working/on WS server
    console.log("Connected to web socket");
    // Run this instance whenever the login-otp room has a new message
    socket.on(`${process.env.WS_TOPIC_LOGIN}`, (data) => {
        // Send the message for this specific room into the GSM Module
        // This would run twice, first once the msg is enqueued and second once the message has been sent/failed
        modem.sendSMS(data.number, data.message, false, (params) => {
            console.log(data);
            console.log(params);
        })
    });
});
socket.on("disconnect", () => {
    // If the WS server suddenly/accidently turns off, the server will automatically close its instance
    console.log("Socket Host is turned off. Nodejs shutting down");
    process.exit();
});