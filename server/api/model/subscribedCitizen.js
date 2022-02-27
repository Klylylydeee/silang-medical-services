const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const moment = require("moment");

const validator = require("validator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscribed Citizen:
 *       type: object
 *       required:
 *         - comment
 *         - year
 *         - month
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
 *         barangay:
 *           type: string
 *           description: barangay
 *         email:
 *           type: string
 *           description: email
 *         phone_number:
 *           type: number
 *           pattern: '^(639)\d{9}$'
 *           description: number 
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

const subscribedSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
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
        phone_number: {
            type: String,
            match: /^(639)\d{9}$/,
            required: true
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

const SubcribedCitizen = model("subscribed-citizen", subscribedSchema);

module.exports = SubcribedCitizen;