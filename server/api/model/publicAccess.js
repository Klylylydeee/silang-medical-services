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
 *     Record Access:
 *       type: object
 *       required:
 *         - email
 *         - phone_number
 *         - barangay
 *         - pin
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
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
 *         pin:
 *           type: string
 *           description: pin 
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

const accessSchema = new Schema(
    {
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
        pin: {
            type: Number,
            maxlength: 6
        },
        otp: {
            type: Number,
            maxlength: 6
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

const AccessRecord = model("medical-records-access", accessSchema);

module.exports = AccessRecord;