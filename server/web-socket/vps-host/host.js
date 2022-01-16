// Environment Variables
const dotenv = require("dotenv").config({ path: "./environment/config.env" });

// WS Server
const io = require("socket.io")(process.env.PORT);

// WS Instance
io.on('connection', (socket) => {

    // Logs once a user has connected
    console.log("Connected: ", socket.client.id)

    socket.on(`${process.env.WS_TOPIC_LOGIN}`, (data) => {
        // Whenever a new message is sent to this room, 
        // we automatically broadcast to all users connected into this room except the sender
        socket.broadcast.emit("login-otp", data);
    });

    // Logs once a user has been disconnected
    socket.on("disconnect",  () => {
        console.log("user disconnects")
    });
    
});