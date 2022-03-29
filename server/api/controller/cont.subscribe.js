const axios = require("axios");

const SubcribedCitizen = require("../model/subscribedCitizen.js");
const MessageLogs = require("../model/messageLog.js");

const { validateRequest } = require("../util/jsonValidate");
const hbs = require("nodemailer-express-handlebars");
const path = require("path")
const mailer = require("../middleware/mailerConfig");

exports.createSubscription = async (req, res, next) => {

    try {

        validateRequest(req);

        
        let emailExist = await SubcribedCitizen.findOne(
            {
                email: req.body.email
            }
        );

        if(emailExist !== null){
            let error = new Error("Email has already been registered.");
            error.statusCode = 501;
            throw error;
        };

        let phoneExist = await SubcribedCitizen.findOne(
            {
                phone_number: req.body.phone_number
            }
        );

        if(phoneExist !== null){
            let error = new Error("Phone Number has already been registered.");
            error.statusCode = 501;
            throw error;
        };

        let citizenRecord = await SubcribedCitizen.create({
            ...req.body,
        });

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
                to: req.body.email,
                subject: `Silang Medical Services - Announcement Subscription`,
                template: "subscription", // create new for this
                context: {
                    text: `Thank you for subscribing to the barangay ${req.body.barangay} announcement. You have been added to the Subscription list but is currently queued for approval.`
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
                receiver_user_id: citizenRecord._id,
                subject: "Announcement Subscription",
                message: `Thank you for subscribing to the barangay ${req.body.barangay} announcement. You have been added to the Subscription list but is currently queued for approval.`,
                type: "Email",
                status: true
            });
        } catch (err) {
            await MessageLogs.create({
                receiver_user_id: citizenRecord._id,
                subject: "Announcement Subscription",
                message: `Thank you for subscribing to the barangay ${req.body.barangay} announcement. You have been added to the Subscription list but is currently queued for approval.`,
                type: "Email",
                status: false
            });
        }

        let smsPayload = await MessageLogs.create({
            receiver_user_id: citizenRecord._id,
            subject: "Announcement Subscription",
            message: `Thank you for subscribing to the barangay ${req.body.barangay} announcement. You have been added to the Subscription list but is currently queued for approval.`,
            type: "Text",
            status: false
        });

        await axios.get(`${process.env.VPS_SOCKET}/default?smsId=${smsPayload._id}&num=${req.body.phone_number}&msg=You have been added to the Subscription list but is currently queued for approval.\n Silang Medical Services`, { headers: { Authorization: process.env.SECRET_CLIENT_KEY }});

        res.status(200).send({
            message: "You have been added to the Subscription list but is currently queued for approval.",
            payload: citizenRecord
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.getSubscription = async (req, res, next) => {

    try {

        validateRequest(req);

        let citizensRecord = await SubcribedCitizen.find({
            barangay: req.query.barangay
        });

        res.status(200).send({
            message: "Subscription Listing.",
            payload: citizensRecord.map((data) => {
                return data.status === false ?
                    {
                        ...data._doc
                    }
                :
                    {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        barangay: data.barangay,
                        email: data.email,
                        phone_number: data.phone_number,
                        address: data.address
                    }
            })
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.approveSubscription = async (req, res, next) => {

    try {

        validateRequest(req);

        let approvalData = await SubcribedCitizen.findOneAndUpdate(
            {
                _id: req.body.id
            },
            {
                $set: {
                    status: true
                }
            }
        );

        if(approvalData === null){
            let error = new Error("Incorrect subscription data.");
            error.statusCode = 501;
            throw error;
        };
        
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
                to: approvalData.email,
                subject: `Silang Medical Services - Announcement Subscription`,
                template: "subscription", // create new for this
                context: {
                    text: `Your subscription to the barangay ${approvalData.barangay} has been approved. You will now be able to receive sms alert on barangay announcement. Additionally, for easy process of your event listing here's your reference number: ${approvalData._id}`
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
                receiver_user_id: approvalData._id,
                subject: "Announcement Subscription",
                message: `Your subscription to the barangay ${approvalData.barangay} has been approved. You will now be able to receive sms alert on barangay announcement. Additionally, for easy process of your event listing here's your reference number: ${approvalData._id}`,
                type: "Email",
                status: true
            });
        } catch (err) {
            await MessageLogs.create({
                receiver_user_id: approvalData._id,
                subject: "Announcement Subscription",
                message: `Your subscription to the barangay ${approvalData.barangay} has been approved. You will now be able to receive sms alert on barangay announcement. Additionally, for easy process of your event listing here's your reference number: ${approvalData._id}`,
                type: "Email",
                status: false
            });
        }

        let smsPayload = await MessageLogs.create({
            receiver_user_id: approvalData._id,
            subject: "Announcement Subscription",
            message: `Your subscription to the barangay ${approvalData.barangay} has been approved.  Please check your email for the reference number. Thank you!`,
            type: "Text",
            status: false
        });

        await axios.get(`${process.env.VPS_SOCKET}/default?smsId=${smsPayload._id}&num=${approvalData.phone_number}&msg=Your subscription to the barangay ${approvalData.barangay} has been approved. Please check your email for the reference number.\n Silang Medical Services`, { headers: { Authorization: process.env.SECRET_CLIENT_KEY }});

        res.status(200).send({
            message: "Your subscription has been approved!",
            payload: approvalData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};