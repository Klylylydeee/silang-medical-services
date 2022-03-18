// Web socket Modules
const io = require("socket.io-client");
// Environment Variables
const dotenv = require("dotenv").config({ path: "./environment/config.env" });
const databaseConnection = require("./database/mongoDBConfig");
databaseConnection();

const forAsync = require('for-async'); 

const Announcement = require("./model/announcement");
const EventListing = require("./model/eventListing");
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
            
            if(annResult === null){
                throw new Error("Does not exists!")
            }
            
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

const schedule = require('node-schedule');
const moment = require("moment");

schedule.scheduleJob(
    {
        rule: '* * 6 * * *',
        tz: "Asia/Manila"
    },
    async () => {
        try{

            let getAnnouncementData = await Announcement.find(
                {
                    announcement_datetime: {
                        $gte: moment(`${moment().format("Y")}-${moment().format("M") >= 10 ? `${moment().format("M")}` : `0${moment().format("M")}` }-${moment().format("D")}` + ` ` + "00:00").format("M D,Y h:mm a"),
                        $lt: moment(`${moment().format("Y")}-${moment().format("M") >= 10 ? `${moment().format("M")}` : `0${moment().format("M")}` }-${moment().format("D")}` + ` ` + "24:00").format("M D,Y h:mm a")
                    }
                }
            );
            
            if(getAnnouncementData === null){
                throw new Error("Does not exists!")
            }

            if(getAnnouncementData.length !== 0){
                forAsync(getAnnouncementData, (recordData, dataIndex) => {
                    return new Promise((resolveData) => {
                        forAsync(recordData.subscribed, (userData, dataIndex) => {
                            return new Promise((resolveUser) => {
                                modem.sendSMS(
                                    userData.phone_number,
                                    `Barangay ${recordData.barangay} Announcement. Please check your email or the website for more details. \n Silang Medical Services`,
                                    false,
                                    async (params) => {
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
                                                    request_user_id: recordData.requestor.email,
                                                    receiver_user_id: userData._id,
                                                    subject: data.announcement,
                                                    message: recordData.message,
                                                    type: "Text",
                                                    status: true
                                                });
                                                resolveUser();
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
                                                    request_user_id: recordData.requestor.email,
                                                    receiver_user_id: userData._id,
                                                    subject: data.announcement,
                                                    message: recordData.message,
                                                    type: "Text",
                                                    status: false
                                                });
                                                resolveUser();
                                            }
                                        }
                                    }
                                )
                            })
                        })
                        resolveData();
                    })
                })
            }
            
        } catch (err) {
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
    }
)

schedule.scheduleJob(
    {
        rule: '* * 7 * * *',
        tz: "Asia/Manila"
    },
    async () => {
        try{

            let getEventListing = await EventListing.find(
                {
                    start_datetime: {
                        $gte: moment(`${moment().format("Y")}-${moment().format("M") >= 10 ? `${moment().format("M")}` : `0${moment().format("M")}` }-${moment().format("D")}` + ` ` + "00:00").format("M D,Y h:mm a"),
                        $lt: moment(`${moment().format("Y")}-${moment().format("M") >= 10 ? `${moment().format("M")}` : `0${moment().format("M")}` }-${moment().format("D")}` + ` ` + "24:00").format("M D,Y h:mm a")
                    },
                    status: true
                }
            );

            console.log(getEventListing)
            
            if(getEventListing === null){
                throw new Error("Does not exists!")
            }

            if(getEventListing.length !== 0){
                forAsync(getEventListing, (recordData, dataIndex) => {
                    return new Promise((resolveData) => {
                        forAsync(recordData.attendee, (userData, dataIndex) => {
                            return new Promise((resolveUser) => {
                                modem.sendSMS(
                                    userData.phone_number,
                                    `Barangay ${recordData.barangay} Event. Please check your email or the website for more details. \n Silang Medical Services`,
                                    false,
                                    async (params) => {
                                        if(params.data){
                                            if(params.data.response === "Successfully Sent to Message Queue"){
                                                await EventListing.updateOne(
                                                    {
                                                        "attendee._id": userData._id
                                                    },
                                                    {
                                                        $set: {
                                                            "attendee.$.status": "Sending",
                                                        }
                                                    }
                                                )
                                            } else if(params.data.response === "Message Successfully Sent"){
                                                await EventListing.updateOne(
                                                    {
                                                        "attendee._id": userData._id
                                                    },
                                                    {
                                                        $set: {
                                                            "attendee.$.status": "Sent",
                                                        }
                                                    }
                                                )
                                                await MessageLogs.create({
                                                    request_user_id: recordData.requestor.email,
                                                    receiver_user_id: userData._id,
                                                    subject: recordData.event,
                                                    message: recordData.description,
                                                    type: "Text",
                                                    status: true
                                                });
                                                resolveUser();
                                            } else {
                                                await EventListing.updateOne(
                                                    {
                                                        "attendee._id": userData._id
                                                    },
                                                    {
                                                        $set: {
                                                            "attendee.$.status": "Failed",
                                                        }
                                                    }
                                                );
                                                await MessageLogs.create({
                                                    request_user_id: recordData.requestor.email,
                                                    receiver_user_id: userData._id,
                                                    subject: recordData.event,
                                                    message: recordData.description,
                                                    type: "Text",
                                                    status: false
                                                });
                                                resolveUser();
                                            }
                                        }
                                    }
                                )
                            })
                        })
                        resolveData();
                    })
                })
            }
            
        } catch (err) {
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
    }
)