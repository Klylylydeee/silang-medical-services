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
            ...req.body
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
                    text: `Thank you for subscribing to the barangay ${req.body.barangay} announcement. You will receive both text messages and email whenever the barangay ${req.body.barangay} has a new announcement.`
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
                message: `Thank you for subscribing to the barangay ${req.body.barangay} announcement. You will receive both text messages and email whenever the barangay ${req.body.barangay} has a new announcement.`,
                type: "Email",
                status: true
            });
        } catch (err) {
            await MessageLogs.create({
                receiver_user_id: citizenRecord._id,
                subject: "Announcement Subscription",
                message: `Thank you for subscribing to the barangay ${req.body.barangay} announcement. You will receive both text messages and email whenever the barangay ${req.body.barangay} has a new announcement.`,
                type: "Email",
                status: false
            });
        }

        let smsPayload = await MessageLogs.create({
            receiver_user_id: citizenRecord._id,
            subject: "Announcement Subscription",
            message: `Thank you for subscribing to the barangay ${req.body.barangay} announcement. You will receive both text messages and email whenever the barangay ${req.body.barangay} has a new announcement.`,
            type: "Text",
            status: false
        });

        await axios.get(`${process.env.VPS_SOCKET}/default?smsId=${smsPayload._id}&num=${req.body.phone_number}&msg=You have been added to the subscription list of barangay ${req.body.barangay}.`, { headers: { Authorization: process.env.SECRET_CLIENT_KEY }});

        res.status(200).send({
            message: "You have been added to the Subscription list.",
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
            payload: citizensRecord
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};