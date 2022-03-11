const moment = require("moment");
const axios = require("axios");

const MedicalRecord = require("../model/medicalRecord");
const MessageLogs = require("../model/messageLog.js");

const { generateBarangayForm } = require("../middleware/puppeteerConfig");
const mailerConfig = require("../middleware/mailerConfig");

const { validateRequest } = require("../util/jsonValidate");
const { base64Encode } = require("../util/fileReader");
const { firstCharacterUppercase } = require("../util/stringHelper");
const { dateDayToSuffixString, getDayOfDate } = require("../util/dateHelper");
const hbs = require("nodemailer-express-handlebars");
const path = require("path")
const mailer = require("../middleware/mailerConfig");

exports.allBarangayMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = await MedicalRecord.find(
            {
                barangay: req.query.barangay,
                disable: false
            },
            null,
            {
                projection: {
                    first_name: 1,
                    last_name: 1,
                    outlier: 1,
                    createdAt: 1,
                    diagnosis: 1,
                    status: 1
                }
            }
        ).sort({ createdAt: -1 })

        res.status(200).send({
            message: `Medical Record for barangay ${req.query.barangay}`,
            payload: medicalRecord
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.allMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = await MedicalRecord.find(
            {
                disable: false
            }
        );

        res.status(200).send({
            message: `Medical Records`,
            payload: medicalRecord
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.createMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        let medicalRecordData = await MedicalRecord.create({
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
                subject: `Silang Medical Services - Medical Record`,
                template: "verify", // create new for this
                context: {
                    text: `Please open the following link to check your medical record update:`, 
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
                receiver_user_id: medicalRecordData._id,
                subject: "Medical Record",
                message: `Please open the following link to check your medical record update: `,
                type: "Email",
                status: true
            });
        } catch (err) {
            await MessageLogs.create({
                receiver_user_id: findUser._id,
                subject: "Medical Record",
                message: `Please open the following link to check your medical record update: `,
                type: "Email",
                status: false
            });
        }

        await axios.get(`${process.env.VPS_SOCKET}/?num=${req.body.phone_number}&msg=Please open the following link to check your medical record update: ${process.env.SERVER_ENDPOINT}/authentication/sign-up-verification?payload=${medicalRecordData.id}`);

        res.status(200).send({
            message: "Medical Record has been created.",
            payload: medicalRecordData
        });


    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.selectMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = await MedicalRecord.find(
            {
                _id: req.body.id,
                barangay: req.query.barangay,
                disable: false
            }
        );

        if(medicalRecord === null){
            let error = new Error("Medical Record does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: `Medical Records`,
            payload: medicalRecord
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.updateMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = await MedicalRecord.findOneAndUpdate(
            {
                _id: req.body.id,
                disable: false
            },
            {
                $set: {
                    ...req.body
                }
            },
            {
                new: true,
                timestamps: true,
                projection: {
                    __v: 0,
                    createdAt: 0,
                }
            }
        );

        if(medicalRecord === null){
            let error = new Error("Medical Record does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: `Medical Record has been updated`,
            payload: medicalRecord
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.selectGenerateMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = await MedicalRecord.find(
            {
                email: req.body.email,
                barangay: req.body.barangay,
                disable: false
            },
        );

        if(medicalRecord === null){
            let error = new Error("Medical Record does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: `Medical Record related to your query`,
            payload: medicalRecord
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.selectedMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = await MedicalRecord.findOne(
            {
                _id: req.query.id,
                disable: false
            }
        );

        if(medicalRecord === null){
            let error = new Error("Medical Record does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: `Medical Record related to your query`,
            payload: medicalRecord
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.generateMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = await MedicalRecord.findOne(
            {
                _id: req.query.id,
                disable: false
            },
        );

        if(medicalRecord === null){
            let error = new Error("Medical Record does not exists.");
            error.statusCode = 501;
            throw error;
        };


        const pdf = await generateBarangayForm(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                * {
                    box-sizing:border-box
                    padding: 0;
                    margin: 0;
                    font-family: Times New Roman, Times, serif;;
                }
                @media print {
                    .table {
                    break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
        </body>
        </html>
        `);

        res.set("Content-Type", "application/pdf");
        res.send(pdf);

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};


