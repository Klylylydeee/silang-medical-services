const Users = require("../model/userAccount");
const MessageLogs = require("../model/messageLog.js")
const hbs = require("nodemailer-express-handlebars");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const path = require("path")
const mailer = require("../middleware/mailerConfig");
const bcrypt = require("bcrypt");

const { validateRequest } = require("../util/jsonValidate");

exports.personalSetting = async (req, res, next) => {

    try {

        validateRequest(req);

        let updatedSettings = await Users.findOneAndUpdate(
            { 
                _id: req.body.id,
                status: true
            },
            {
                $set: {
                    ...req.body
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

        if(updatedSettings === null){
            let error = new Error("Account does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: "User setting has been updated",
            payload: updatedSettings
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }

}

exports.userList = async (req, res, next) => {

    try {

        validateRequest(req);

        let barangayUsers = await Users.find(
            { 
                barangay: req.query.barangay
            }
        ).select({
            password: 0,
            pin: 0,
            pin_threshold: 0,
            __v: 0
        });

        res.status(200).send({
            message: "User list for barangay",
            payload: barangayUsers
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);
        
    }

}

exports.userData = async (req, res, next) => {

    try {

        validateRequest(req);

        let userData = await Users.findOne(
            { 
                ...(req.body.id && { _id: req.body.id }),
                ...(req.body.email && { email: req.body.email }),
                ...(req.body.barangay && { barangay: req.body.barangay }),
            }
        ).select({
            pin: 0,
            pin_threshold: 0,
            __v: 0
        });

        if(userData === null){
            let error = new Error("Email does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: "User Data",
            payload: {
                ...JSON.parse(JSON.stringify(userData)),
                language: userData.language === "en" ? "English" : "Tagalog",
                status: userData.status === true ? "Active" : "Inactive",
                phone_number: userData.phone_number.substring(3)
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);
        
    }

}

exports.userStatus = async (req, res, next) => {

    try {

        validateRequest(req);

        let userData = await Users.findOneAndUpdate(
            { 
                _id: req.body._id,
                barangay: req.body.barangay
            },
            {
                $set: {
                    status: req.body.status === true ? false : true
                }
            },
            {
                timestamps: false
            }
        ).select({
            password: 0,
            pin: 0,
            pin_threshold: 0,
            __v: 0
        });

        res.status(200).send({
            message: `User has been ${req.body.status === true ? "Deactivated" : "Reactivated"}`
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);
        
    }

}

exports.requestPasswordChange = async (req, res, next) => {

    try {

        validateRequest(req);

        const userData = await Users.findOne({
            _id: req.body._id
        })

        if(userData === null){
            let error = new Error("Account does not exists.");
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
            
        const token = await jwt.sign({
            userData
        }, process.env.JWT_BACKEND, { 
            expiresIn: "15m",
            algorithm: "HS512"
        });

        try {
            transporter.sendMail({
                to: userData.email,
                subject: `Silang Medical Services - Reset Password Request`,
                template: "password-request",
                context: {
                    url: `${process.env.CLIENT_ENDPOINT}/?payload=${token}&reset=true`
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
            MessageLogs.create({
                receiver_user_id: userData._id,
                subject: "Reset Password Request",
                message: `${process.env.SERVER_ENDPOINT}/?payload=${userData.id}&reset=true`,
                type: "Email",
                status: true
            });
        } catch(err) {
            MessageLogs.create({
                receiver_user_id: userData._id,
                subject: "Reset Password Request",
                message: `${process.env.SERVER_ENDPOINT}/?payload=${userData.id}&reset=true`,
                type: "Email",
                status: false
            });
        }

        await axios.get(`${process.env.VPS_SOCKET}/?num=${req.body.phone_number}&msg=Reset Password Request has been sent to your email address \n Silang Medical Services`, { headers: { Authorization: process.env.SECRET_CLIENT_KEY }});

        res.status(200).send({
            message: "Password reset request has been sent."
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};


exports.userChangeSetting = async (req, res, next) => {

    try {

        validateRequest(req);

        if(req.body.prev_password){
            let verifyUser = await Users.findOne(
                { 
                    _id: req.query.id,
                    status: true
                }
            )
    
            if(verifyUser === null){
                let error = new Error("Account does not exists.");
                error.statusCode = 501;
                throw error;
            };

            const validate = await bcrypt.compare(req.body.prev_password, verifyUser.password);
    
            if(!validate){
                let error = new Error("Password does not match.");
                error.statusCode = 501;
                throw error;
            };
        }

        let userData = await Users.findOneAndUpdate(
            { 
                _id: req.query.id,
                status: true
            },
            {
                $set: {
                    ...req.body,
                    ...(req.body.password && { password: await bcrypt.hash(req.body.password, Number(process.env.HASHING)) })
                }
            },
            {
                timestamps: false
            }
        ).select({
            password: 0,
            pin: 0,
            pin_threshold: 0,
            __v: 0
        });

        if(userData === null){
            let error = new Error("Account does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: `User setting has been changed!`
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);
        
    }

}
