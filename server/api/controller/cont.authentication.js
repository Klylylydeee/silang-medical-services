const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const moment = require("moment");

const Users = require("../model/userAccount");

const { validateRequest } = require("../util/jsonValidate");
const { generatePin } = require("../util/numberHelper");
const mailerConfig = require("../middleware/mailerConfig");

exports.userSignUp = async (req, res, next) => {

    try {

        validateRequest(req);

        let userData = await Users.create({
            ...req.body,
            status: false
        });

        mailerConfig().sendMail({
            from: process.env.NODEMAILER_ACCOUNT_USERNAME,
            to: req.body.email,
            subject: `Silang Medical Services - Account Verification`,
            text: `Please open the following link to verify your account: ${process.env.SERVER_ENDPOINT}/authentication/sign-up-verification?payload=${userData.id}`
        });

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

        console.lo

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

            mailerConfig().sendMail({
                from: process.env.NODEMAILER_ACCOUNT_USERNAME,
                to: findUser.email,
                subject: `Silang Medical Services - Verification PIN`,
                text: `Verification PIN: ${generatePIN.pin}\n Silang Medical Services`
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

        mailerConfig().sendMail({
            from: process.env.NODEMAILER_ACCOUNT_USERNAME,
            to: findUser.email,
            subject: `Silang Medical Services - Account Reset`,
            text: `Please open the following link to reset your account: ${process.env.SERVER_ENDPOINT}/authentication/verify-reset?payload=${token}`
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