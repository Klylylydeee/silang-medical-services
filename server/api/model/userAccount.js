const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const moment = require("moment");

const bcrypt = require("bcrypt");
const validator = require("validator");

const { firstCharacterUppercase, removeUnderscores} = require("../util/stringHelper");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    Authorization:
 *      type: http
 *      scheme: bearer
 *   schemas:
 *     Accounts:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - phone_number
 *         - barangay
 *         - designation
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         first_name:
 *           type: string
 *           description: first_name
 *         last_name:
 *           type: string
 *           description: last_name
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password 
 *         phone_number:
 *           type: number
 *           pattern: '^(639)\d{9}$'
 *           description: number 
 *         barangay:
 *           type: string
 *           description: barangay 
 *         designation:
 *           type: string
 *           description: designation 
 *         pin:
 *           type: number
 *           description: pin 
 *         pin_threshold:
 *           type: number
 *           description: pin_threshold 
 *         language:
 *           type: boolean
 *           description: language 
 *         status:
 *           type: boolean
 *           description: status 
 *         createdAt:
 *           type: string
 *           description: createdAt  
 *         updateAt:
 *           type: string
 *           description: updateAt
 */

const userAccountSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: 'Email is not a valid email.',
                isAsync: false
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 5
        },
        phone_number: {
            type: String,
            match: /^(639)\d{9}$/,
            required: true
        },
        barangay: {
            type: String,
            enum: {
                values: [
                    "Lumil",
                    "Puting Kahoy",
                    "Web Administrator"
                ],
                message: "Barangay does not exists."
            },
            required: true
        },
        designation: {
            type: String,
            enum: {
                values: [
                    "Chairman",
                    "Staff",
                    "Doctor",
                    "Nurse",
                    "Web Administrator"
                ],
                message: "Designation does not exists."
            },
            required: true
        },
        pin: {
            type: Number,
            maxlength: 6,
            default: 123456
        },
        pin_threshold: {
            type: Number,
            maxlength: 1,
            default: 3
        },
        language: {
            type: String,
            default: "en"
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: { 
            currentTime: () => {
                return moment().format();
            }
        }
    }
);

userAccountSchema.pre(
    "save", 
    async function(next) {
        this.first_name = firstCharacterUppercase(this.first_name);
        this.last_name =  firstCharacterUppercase(this.last_name);
        this.password = await bcrypt.hash(this.password, Number(process.env.HASHING));
        next();
    }
); 

userAccountSchema.post("save", function(error, doc, next) {
    let raiseErr;
    if (error.name === "MongoServerError" && error.code === 11000) {
        raiseErr = new Error(`${removeUnderscores(Object.getOwnPropertyNames(error.keyValue)[0])}: ${error.keyValue[`${Object.getOwnPropertyNames(error.keyValue)[0]}`]} is already existing.`);
        raiseErr.statusCode = 405;
        next(raiseErr);
    } else if (error.name === "ValidationError") {
        switch(true) {
            case Object.getOwnPropertyNames(error.errors).length > 1:
                filteredDataFields = Object.getOwnPropertyNames(error.errors).map((errorField) => {
                    return removeUnderscores(errorField)
                });
                raiseErr = new Error(`Missing parameters: ${filteredDataFields.join(", ")}.`);
                break;
            case error.errors.password !== undefined:
                raiseErr = new Error(`Password does not satisfy the minimum requirement string length.`);
                break;
            case error.errors.designation !== undefined:
                raiseErr = new Error(`${error.errors.designation.properties.message}`);
                break;
            case error.errors.barangay !== undefined:
                raiseErr = new Error(`${error.errors.barangay.properties.message}`);
                break;
            case error.errors.email !== undefined:
                raiseErr = new Error(`${error.errors.email.properties.message}`);
                break;
            case error.errors.phone_number !== undefined:
                raiseErr = new Error("Wrong phone number format");
                break;
            default:
                raiseErr = new Error(`Validation Error.`);
        }
        raiseErr.statusCode = 405;
        next(raiseErr);
    } else {
        next();
    }
});

const Users = model("users", userAccountSchema);

module.exports = Users;