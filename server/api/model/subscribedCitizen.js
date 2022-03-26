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
 *         address:
 *           type: string
 *           description: address 
 *         facebook_url:
 *           type: string
 *           description: facebook_url 
 *         barangay_id_number:
 *           type: string
 *           description: barangay_id_number 
 *         vaccine_card:
 *           type: string
 *           description: vaccine_card 
 *         any_id:
 *           type: string
 *           description: any_id 
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
        address: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            match: /^(639)\d{9}$/,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        },
        facebook_url: {
            type: String
        },
        barangay_id_number: {
            type: String
        },
        vaccine_card: {
            type: String
        },
        proof_of_billing: {
            type: String
        },
        any_id: {
            type: String
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

subscribedSchema.post("findOne", function(error, doc, next) {
    if(error.name === "CastError"){
        raiseErr = new Error(`Incorrect reference ID`);
        raiseErr.statusCode = 405;
        next(raiseErr);
    } else {
        next();
    }
})

const SubcribedCitizen = model("subscribed-citizen", subscribedSchema);

module.exports = SubcribedCitizen;