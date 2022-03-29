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
 *         phone_number:
 *           type: number
 *           pattern: '^(639)\d{9}$'
 *           description: number 
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
        }
    },
    {
        timestamps: { 
            currentTime: () => {
                // return moment(momentRandom("2022-12-31", "2021-01-01")).utc("Asia/Singapore").format();
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
        this.pin = `${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}${unique_identifier_string[randomSelect()]}`
        next();
    }
); 

const MedicalRecords = model("medical-records", medicalRecordSchema);

module.exports = MedicalRecords;