const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const momentRandom = require('moment-random');

const moment = require("moment");

const validator = require("validator");
const { generatePin } = require("../util/numberHelper");

/**
 * @swagger
 * components:
 *   schemas:
 *     Medical Records:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - date_of_birth
 *         - gender
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
 *         age:
 *           type: number
 *           description: age
 *         gender:
 *           type: string
 *           description: gender
 *         date_of_birth:
 *           type: date
 *           description: date_of_birth
 *         phone_number:
 *           type: number
 *           pattern: '^(639)\d{9}$'
 *           description: number 
 *         address:
 *           type: string
 *           description: address 
 *         barangay:
 *           type: string
 *           description: barangay 
 *         diagnosis :
 *           type: string
 *           description: diagnosis  
 *         detailed_report:
 *           type: string
 *           description: detailed_report 
 *         outlier:
 *           type: number
 *           description: outlier 
 *         createdBy:
 *           type: string
 *           description: createdBy 
 *         approvedBy:
 *           type: string
 *           description: approvedBy 
 *         pin:
 *           type: number
 *           description: pin 
 *         pin_threshold:
 *           type: number
 *           description: pin_threshold 
 *         prescription:
 *           type: object
 *           properties:
 *             prescription:
 *               type: String
 *               description: prescription
 *             dosage:
 *               type: String
 *               description: dosage
 *         status:
 *           type: boolean
 *           description: status 
 *         disable:
 *           type: boolean
 *           description: disable 
 *         pin_reset:
 *           type: boolean
 *           description: pin_reset 
 *         request_change:
 *           type: boolean
 *           description: request_change 
 *         createdAt:
 *           type: string
 *           description: createdAt  
 *         updateAt:
 *           type: string
 *           description: updateAt 
 */

const medicalRecordSchema = new Schema(
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
            required: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: 'Email is not a valid email.',
                isAsync: false
            }
        },
        phone_number: {
            type: String,
            match: /^(639)\d{9}$/,
            required: true
        },
        gender: {
            type: String,
            enum: {
                values: [
                    "Male",
                    "Female",
                    "Others"
                ],
                message: "Gender type does not exists."
            },
            required: true
        },
        date_of_birth: {
            type: Date,
            required: true
        },
        age: {
            type: Number
        },
        address: {
            type: String,
            required: true
        },
        diagnosis: {
            type: String,
            required: true
        },
        detailed_report: {
            type: String,
            required: true
        },
        outlier: {
            type: Number,
            min: 1,
            max: 10,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        approvedBy: {
            type: String,
            default: undefined
        },
        barangay: {
            type: String,
            enum: {
                values: [
                    "Lumil",
                    "Puting Kahoy"
                ],
                message: "Barangay does not exists."
            },
            required: true
        },
        prescription: {
            type: [
                {
                    prescription: {
                        type: String
                    },
                    dosage: {
                        type: String
                    }
                }
            ]
        },
        pin: {
            type: String,
            maxlength: 6
        },
        pin_reset: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        },
        disable: {
            type: Boolean,
            default: false
        },
        disabledBy: {
            type: String
        },
        request_change: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: { 
            currentTime: () => {
                // return moment(momentRandom("2022-04-18", "2022-04-01")).utc("Asia/Singapore").format();
                return moment().format();
            }
        }
    }
);

medicalRecordSchema.pre(
    "save", 
    async function(next) {
        const unique_identifier_string = this._id.toString().split("");
        const randomSelect = () => Math.floor(Math.random() * unique_identifier_string.length);
        this.pin = `${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}`;
        this.age = moment().diff(moment(this.date_of_birth).format("YYYY-MM-DD"), 'years', false);
        next();
    }
); 

const MedicalRecords = model("medical-records", medicalRecordSchema);

module.exports = MedicalRecords;