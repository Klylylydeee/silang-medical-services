const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const moment = require("moment");
const hbs = require("nodemailer-express-handlebars");
const path = require("path")

const Users = require("../model/userAccount");
const MessageLogs = require("../model/messageLog.js")

const { validateRequest } = require("../util/jsonValidate");
const { generatePin } = require("../util/numberHelper");
const mailer = require("../middleware/mailerConfig");

exports.userSignUp = async (req, res, next) => {

    try {

        validateRequest(req);

        let userData = await Users.create({
            ...req.body,
            status: false
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

        transporter.sendMail({
            from: process.env.NODEMAILER_ACCOUNT_USERNAME,
            to: req.body.email,
            subject: `Silang Medical Services - Account Verification`,
            // text: `: `,
            template: "signup",
            context: {
                url: `${process.env.SERVER_ENDPOINT}/authentication/sign-up-verification?payload=${userData.id}`
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
        }).then((onFinish) => {
            if(onFinish.accepted.length >= 1){
                MessageLogs.create({
                    receiver_user_id: userData._id,
                    subject: "Account Verification",
                    message: `${process.env.SERVER_ENDPOINT}/authentication/sign-up-verification?payload=${userData.id}`,
                    type: "Email",
                    status: true
                });
            } else if(onFinish.rejected.length >= 1) {
                MessageLogs.create({
                    receiver_user_id: userData._id,
                    subject: "Account Verification",
                    message: `${process.env.SERVER_ENDPOINT}/authentication/sign-up-verification?payload=${userData.id}`,
                    type: "Email",
                    status: false
                });
            }
        })

        await axios.get(`${process.env.VPS_SOCKET}/?num=${req.body.phone_number}&msg=Account Verification has been sent to your email address \n Silang Medical Services`);

        res.status(200).send({
            message: "Account has been created.",
            payload: userData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.userSignUpVerification = async (req, res, next) => {
    
    try {

        validateRequest(req);

        if(req.query.payload === null){
            let error = new Error("Incorrect payload.");
            error.statusCode = 501;
            throw error;
        };

        let findUser = await Users.findOneAndUpdate(
            { 
                _id: req.query.payload
            },
            {
                $set: {
                    "status": true
                }
            },
            { 
                new: true,
                timestamps: false,
                projection: {
                    password: 0,
                    __v: 0,
                    _id: 0,
                    createdAt: 0,
                }
            }
        );

        if(findUser === null){
            let error = new Error("Account does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.redirect(process.env.CLIENT_ENDPOINT);

    } catch (err) {
        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
};



exports.userSignIn = async (req, res, next) => {

    try {

        validateRequest(req);

        let findUser = await Users.findOne({ email: req.body.email });

        if(findUser === null){
            let error = new Error("Email does not exists.");
            error.statusCode = 501;
            throw error;
        };

        if(findUser.status === false){
            let error = new Error("Either Account has been disabled or not yet verified.");
            error.statusCode = 501;
            throw error;
        }

        if(findUser.designation === "Web Administrator"){
            let error = new Error("Web Administrator please refer to the designated portal.");
            error.statusCode = 501;
            throw error;
        }

        const validate = await bcrypt.compare(req.body.password, findUser.password);

        if(!validate){
            let error = new Error("Password does not match.");
            error.statusCode = 501;
            throw error;
        };

        if(findUser.pin_threshold === 0){
            let error = new Error("Max pin threshold has been meet. Please reset your account's password.");
            error.statusCode = 501;
            throw error;
        };

        if(findUser.createdAt.toString() === findUser.updatedAt.toString() || moment(findUser.updatedAt).add(15, "minutes").isBefore(moment())){

            let generatePIN = await Users.findOneAndUpdate(
                { 
                    email: req.body.email
                },
                {
                    $set: {
                        "pin": generatePin(),
                        "updatedAt": moment().format()
                    },
                },
                { 
                    new: true,
                    timestamps: false,
                    projection: {
                        password: 0,
                        __v: 0,
                        _id: 0,
                        createdAt: 0,
                    }
                }
            );

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

            transporter.sendMail({
                from: process.env.NODEMAILER_ACCOUNT_USERNAME,
                to: findUser.email,
                subject: `Silang Medical Services - Verification PIN`,
                template: "verify",
                context: {
                    pin: generatePIN.pin, 
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
            });

            await axios.get(`${process.env.VPS_SOCKET}/?num=${generatePIN.phone_number}&msg=Verification PIN: ${generatePIN.pin}\n Silang Medical Services`);

            res.status(200).send({
                message: "Authentication successful. Please verify the generated pin sent to your email and phone number before 15 minutes."
            });

        } else {

            res.status(200).send({
                message: "An existing pin has been sent to your email and phone number."
            });

        }
        

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};



exports.userPINVerification = async (req, res, next) => {

    try {

        validateRequest(req);

        let findUser = await Users.findOne({ email: req.body.email, status: true});

        if(findUser === null){
            let error = new Error("Email does not exists.");
            error.statusCode = 501;
            throw error;
        };

        if(findUser.pin_threshold === 0){
            let error = new Error("Max pin threshold has been meet. Please reset your account's password.");
            error.statusCode = 501;
            throw error;
        };

        if(findUser.pin === Number(req.body.pin)){

            let resetThreshold = await Users.findOneAndUpdate(
                { 
                    email: req.body.email
                },
                {
                    $set: {
                        "pin_threshold": 3,
                        "pin": generatePin(),
                        "updatedAt": moment().subtract(3, "hours").format()
                    },
                },
                { 
                    new: true,
                    timestamps: false,
                    projection: {
                        password: 0,
                        __v: 0,
                        _id: 0,
                        createdAt: 0,
                    }
                }
            );
            
            const token = await jwt.sign({
                ...resetThreshold._doc
            }, process.env.JWT_BACKEND, { 
                expiresIn: "24h",
                algorithm: "HS512"
            });

            res.status(200).send({
                message: "PIN verified sucessfully.",
                payload: token
            });

        } else {
            
            let decrementThreshold = await Users.findOneAndUpdate(
                { 
                    email: req.body.email
                },
                {
                    $set: {
                        "updatedAt": moment().subtract(3, "hours").format()
                    },
                    $inc: {
                        "pin_threshold": -1
                    }
                },
                { 
                    new: true,
                    timestamps: false,
                    projection: {
                        password: 0,
                        __v: 0,
                        _id: 0,
                        createdAt: 0,
                    }
                }
            );

            let error = new Error("PIN is incorrect.");
            error.statusCode = 501;
            throw error;

        }

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.userAccountReset = async (req, res, next) => {
    
    try {

        validateRequest(req);

        let findUser = await Users.findOne({ email: req.body.email });

        if(findUser === null){
            let error = new Error("Email does not exists.");
            error.statusCode = 501;
            throw error;
        };
        
        const token = await jwt.sign({
            id: findUser.id,
        }, process.env.JWT_BACKEND, { 
            expiresIn: "15m",
            algorithm: "HS512"
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

        transporter.sendMail({
            from: process.env.NODEMAILER_ACCOUNT_USERNAME,
            to: findUser.email,
            subject: `Silang Medical Services - Account Reset`,
            template: "reset",
            context: {
                url: `${process.env.SERVER_ENDPOINT}/authentication/verify-reset?payload=${token}`, 
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
        });

        res.status(200).send({
            message: "Account reset verification has been sent to your email and phone number."
        });

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
}

exports.userVerifyReset = async (req, res, next) => {
    
    try {

        validateRequest(req);
        
        let _verifyData = await jwt.verify(req.query.payload, process.env.JWT_BACKEND);
        let decodedData = await jwt.verify(req.query.payload, process.env.JWT_BACKEND);

        if(decodedData === null){
            let error = new Error("Incorrect payload.");
            error.statusCode = 501;
            throw error;
        };

        let findUser = await Users.findOneAndUpdate(
            { 
                _id: decodedData.id
            },
            {
                $set: {
                    "pin_threshold": 3
                }
            },
            { 
                new: true,
                timestamps: false,
                projection: {
                    password: 0,
                    __v: 0,
                    _id: 0,
                    createdAt: 0,
                }
            }
        );

        if(findUser === null){
            let error = new Error("Email does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.redirect(process.env.CLIENT_ENDPOINT);

    } catch (err) {
        err.message === "jwt expired" ? err.message = "Payload has expired. Please request for a reset verification token." : err.message;
        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
};