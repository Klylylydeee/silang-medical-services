const moment = require("moment");
const axios = require("axios");

const Announcement = require("../model/announcement");
const SubcribedCitizen = require("../model/subscribedCitizen");
const MessageLogs = require("../model/messageLog");

const { validateRequest } = require("../util/jsonValidate");
const hbs = require("nodemailer-express-handlebars");
const path = require("path")
const mailer = require("../middleware/mailerConfig");

exports.retrieveAllAnnouncement = async (req, res, next) => {

    try {

        validateRequest(req)

        let announcementsData = await Announcement.find(
            {
                barangay: req.params.id,
                status: true
            }
        ).sort({ createdAt: -1 })

        res.status(200).send({
            message: `Announcements listing`,
            payload: announcementsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.createAnnouncement = async (req, res, next) => {

    try {

        validateRequest(req);

        let citizenData = await SubcribedCitizen.find({
            barangay: req.body.barangay
        });

        let announcementsData = await Announcement.create({
            ...req.body,
            subscribed: citizenData.map((citizen) => {
                return {
                    first_name: citizen.first_name,
                    last_name: citizen.last_name,
                    email: citizen.email,
                    phone_number: citizen.phone_number,
                    status: "Queued"
                }
            })
        });

        if(req.body.send_right_now){
            const transporter = mailer.transport();

            transporter.use(
                "compile", 
                hbs({
                    viewEngine: {
                        extName: ".handlebars",
                        partialsDir: path.resolve(__dirname, "handlebar"),
                        defaultLayout: false,
                    },
                    viewPath: path.resolve(__dirname, "handlebar"),
                    extName: ".handlebars",
                })
            );

            try {
                transporter.sendMail({
                    to: citizenData.map((citizen) => {
                        return `${citizen.email}`
                    }),
                    subject: `Silang Medical Services - Barangay Announcement`,
                    template: "announcement",
                    context: {
                        announcement: req.body.announcement,
                        message: req.body.message
                    },
                    attachments: [
                        {
                            
                            filename: "app-logo.png",
                            path: __dirname +'/handlebar/asset/app-logo.png',
                            cid: 'app-logo'
                        },
                        {
                            
                            filename: "web-app-bg.png",
                            path: __dirname +'/handlebar/asset/web-app-bg.png',
                            cid: 'web-app-bg'
                        },
                    ]
                })
                await MessageLogs.create({
                    receiver_user_id: announcementsData._id,
                    subject: `Barangay Announcement: ${req.body.announcement}`,
                    message: req.body.message,
                    type: "Email",
                    status: true
                });
            } catch(err) {
                MessageLogs.create({
                    receiver_user_id: announcementsData._id,
                    subject: `Barangay Announcement: ${req.body.announcement}`,
                    message: req.body.message,
                    type: "Email",
                    status: false
                });
            }

            await axios.get(
                `${process.env.VPS_SOCKET}/announcement?id=${announcementsData._id}&announcement=Barangay ${announcementsData.barangay} Announcement. Please check your email or the website for more details. \n Silang Medical Services`,
                {
                    headers: {
                        Authorization: process.env.SECRET_CLIENT_KEY
                    }
                }
            );

        }

        res.status(200).send({
            message: `Announcement has been made!`,
            payload: announcementsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.updateAnnouncement = async (req, res, next) => {

    try {

        validateRequest(req);

        let citizenData = await SubcribedCitizen.find({
            barangay: req.body.barangay
        });

        let announcementsData = await Announcement.findOneAndUpdate(
            { 
                _id: req.body._id
            },
            {
                $set: {
                    ...req.body,
                    ...(!req.body.status) && {
                        subscribed: citizenData.map((citizen) => {
                            return {
                                first_name: citizen.first_name,
                                last_name: citizen.last_name,
                                email: citizen.email,
                                phone_number: citizen.phone_number,
                                status: "Queued"
                            }
                        })
                    }
                }
            },
            { 
                new: true,
                timestamps: true
            }
        );

        
        if(req.body.send_right_now){
            const transporter = mailer.transport();

            transporter.use(
                "compile", 
                hbs({
                    viewEngine: {
                        extName: ".handlebars",
                        partialsDir: path.resolve(__dirname, "handlebar"),
                        defaultLayout: false,
                    },
                    viewPath: path.resolve(__dirname, "handlebar"),
                    extName: ".handlebars",
                })
            );

            try {
                transporter.sendMail({
                    to: citizenData.map((citizen) => {
                        return `${citizen.email}`
                    }),
                    subject: `Silang Medical Services - Barangay Announcement`,
                    template: "announcement",
                    context: {
                        announcement: req.body.announcement,
                        message: req.body.message
                    },
                    attachments: [
                        {
                            
                            filename: "app-logo.png",
                            path: __dirname +'/handlebar/asset/app-logo.png',
                            cid: 'app-logo'
                        },
                        {
                            
                            filename: "web-app-bg.png",
                            path: __dirname +'/handlebar/asset/web-app-bg.png',
                            cid: 'web-app-bg'
                        },
                    ]
                })
                await MessageLogs.create({
                    receiver_user_id: announcementsData._id,
                    subject: `Barangay Announcement: ${req.body.announcement}`,
                    message: req.body.message,
                    type: "Email",
                    status: true
                });
            } catch(err) {
                MessageLogs.create({
                    receiver_user_id: announcementsData._id,
                    subject: `Barangay Announcement: ${req.body.announcement}`,
                    message: req.body.message,
                    type: "Email",
                    status: false
                });
            }

            await axios.get(
                `${process.env.VPS_SOCKET}/announcement?id=${announcementsData._id}&announcement=Barangay ${announcementsData.barangay} Announcement. Please check your email or the website for more details. \n Silang Medical Services`,
                {
                    headers: {
                        Authorization: process.env.SECRET_CLIENT_KEY
                    }
                }
            );

        }
        
        res.status(200).send({
            message: `Announcement has been updated!`,
            payload: announcementsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};