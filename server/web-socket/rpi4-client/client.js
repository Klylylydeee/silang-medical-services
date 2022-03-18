// Web socket Modules
const io = require("socket.io-client");
// Environment Variables
const dotenv = require("dotenv").config({ path: "./environment/config.env" });
const databaseConnection = require("./database/mongoDBConfig");
databaseConnection();

const forAsync = require('for-async'); 

const Announcement = require("./model/announcement");
const MessageLogs = require("./model/messageLog");
const ErrorLogs = require("./model/errorLogs");

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
        try {

            let smsPayloadData = [];
            smsPayloadData[0] = data;
            
            if(smsPayloadData.length !== 0){
                forAsync(smsPayloadData, (userData, index) => {
                    return new Promise((resolve) => {
                        modem.sendSMS(userData.number, userData.message, false, async (params) => {
                            if(params.data){
                                if(params.data.response === "Successfully Sent to Message Queue"){
                                } else if(params.data.response === "Message Successfully Sent"){
                                    await MessageLogs.findOneAndUpdate(
                                        {
                                            _id: userData.id
                                        },
                                        {
                                            $set: {
                                                status: true
                                            }
                                        }
                                    )
                                    resolve();
                                } else {
                                    resolve();
                                }
                            }
                        })
                    })
                })
            }

        } catch(err) {
            ErrorLogs.create({
                timestamp: new Date(),
                level: "error",
                message: err.message,
                meta: {
                    status: 500,
                    stack: err.stack
                }
            })
        }
    });
    socket.on(`${process.env.WS_TOPIC_COMMS}`, async (data) => {
        try {

            let annResult = await Announcement.findOne({
                _id: data.id
            });
            
            if(annResult.subscribed.length !== 0){
                forAsync(annResult.subscribed, (userData, index) => {
                    return new Promise((resolve) => {
                        modem.sendSMS(userData.phone_number, data.announcement, false, async (params) => {
                            if(params.data){
                                if(params.data.response === "Successfully Sent to Message Queue"){
                                    await Announcement.updateOne(
                                        {
                                            "subscribed._id": userData._id
                                        },
                                        {
                                            $set: {
                                                "subscribed.$.status": "Sending",
                                            }
                                        }
                                    )
                                } else if(params.data.response === "Message Successfully Sent"){
                                    await Announcement.updateOne(
                                        {
                                            "subscribed._id": userData._id
                                        },
                                        {
                                            $set: {
                                                "subscribed.$.status": "Sent",
                                            }
                                        }
                                    )
                                    await MessageLogs.create({
                                        request_user_id: annResult.requestor.email,
                                        receiver_user_id: userData._id,
                                        subject: data.announcement,
                                        message: annResult.message,
                                        type: "Text",
                                        status: true
                                    });
                                    resolve();
                                } else {
                                    await Announcement.updateOne(
                                        {
                                            "subscribed._id": userData._id
                                        },
                                        {
                                            $set: {
                                                "subscribed.$.status": "Failed",
                                            }
                                        }
                                    );
                                    await MessageLogs.create({
                                        request_user_id: annResult.requestor.email,
                                        receiver_user_id: userData._id,
                                        subject: data.announcement,
                                        message: annResult.message,
                                        type: "Text",
                                        status: false
                                    });
                                    resolve();
                                }
                            }
                        })
                    })
                })
            }

        } catch(err) {
            ErrorLogs.create({
                timestamp: new Date(),
                level: "error",
                message: err.message,
                meta: {
                    status: 500,
                    stack: err.stack
                }
            })
        }
    });
});
socket.on("disconnect", () => {
    // If the WS server suddenly/accidently turns off, the server will automatically close its instance
    console.log("Socket Host is turned off. Nodejs shutting down");
    process.exit();
});