const moment = require("moment");
const axios = require("axios");

const MedicalRecord = require("../model/medicalRecord");
const MessageLogs = require("../model/messageLog.js");

const { validateRequest } = require("../util/jsonValidate");
const hbs = require("nodemailer-express-handlebars");
const path = require("path")
const mailer = require("../middleware/mailerConfig");
const jwt = require("jsonwebtoken");

exports.allBarangayMedicalRecord = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = req.query.designation === "Doctor" ?
        await MedicalRecord.find(
            {
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
                    status: 1,
                    barangay: 1,
                    detailed_report: 1,
                    email: 1,
                    phone_number: 1
                }
            }
        ).sort({ createdAt: -1 })
        :
        await MedicalRecord.find(
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
                    status: 1,
                    barangay: 1
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
            const createAuth = () => {
                const token = jwt.sign({
                    email: req.body.email,
                    barangay: req.body.barangay
                }, process.env.JWT_BACKEND, { 
                    expiresIn: "1d",
                    algorithm: "HS512"
                });
                return token
            }
            transporter.sendMail({
                to: req.body.email,
                subject: `Silang Medical Services - Medical Record`,
                template: "medical-record",
                context: {
                    text: `Please open the following link to check your medical record update:`, 
                    url: `${process.env.CLIENT_ENDPOINT}/medical-record?auth=${createAuth()}`
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
                message: `Please open the following link to check your medical record update: ${process.env.CLIENT_ENDPOINT}/medical-record?auth=`,
                type: "Email",
                status: true
            });
        } catch (err) {
            console.log(err)
            await MessageLogs.create({
                receiver_user_id: medicalRecordData._id,
                subject: "Medical Record",
                message: `Please open the following link to check your medical record update: ${process.env.CLIENT_ENDPOINT}/medical-record?auth=`,
                type: "Email",
                status: false
            });
        }

        let smsPayload = await MessageLogs.create({
            receiver_user_id: medicalRecordData._id,
            subject: "Medical Record",
            message: `Please open the following link to check your medical record update: ${process.env.CLIENT_ENDPOINT}/medical-record?auth=`,
            type: "Text",
            status: false
        });

        await axios.get(`${process.env.VPS_SOCKET}/default?smsId=${smsPayload}&num=${req.body.phone_number}&msg=A medical record has been created under your name. Please check your email for more information.`, { headers: { Authorization: process.env.SECRET_CLIENT_KEY }});

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
        ).sort({ createdAt: -1 });

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

exports.autoCompleteDistict = async (req, res, next) => {

    try {

        validateRequest(req);

        const medicalRecord = await MedicalRecord.find({ barangay: req.query.barangay }).distinct("diagnosis")

        res.status(200).send({
            message: `Auto complete fields for barangay`,
            payload: medicalRecord.map((value) => {
                return {
                    value: value
                }
            })
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};



