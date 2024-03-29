const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const moment = require("moment");

const validator = require("validator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Event Listing:
 *       type: object
 *       required:
 *         - event
 *         - description
 *         - barangay
 *         - requestor
 *         - attendee
 *         - start_datetime 
 *         - end_datetime
 *         - createdBy
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         event:
 *           type: string
 *           description: event
 *         description:
 *           type: string
 *           description: description
 *         barangay:
 *           type: string
 *           description: barangay
 *         requestor:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *               description: first_name
 *             last_name:
 *               type: string
 *               description: last_name
 *             email:
 *               type: string
 *               description: email
 *             phone_number:
 *               type: number
 *               description: phone_number
 *           description: requestor  
 *         attendee:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *               description: first_name
 *             last_name:
 *               type: string
 *               description: last_name
 *             email:
 *               type: string
 *               description: email
 *             phone_number:
 *               type: number
 *               description: phone_number
 *             age:
 *               type: number
 *               description: age
 *             date_of_birth:
 *               type: date
 *               description: date_of_birth
 *             gender:
 *               type: string
 *               description: gender
 *           description: requestor 
 *         start_datetime:
 *           type: date
 *           description: start_datetime 
 *         end_datetime:
 *           type: date
 *           description: end_datetime 
 *         createdBy:
 *           type: string
 *           description: createdBy 
 *         approvedBy:
 *           type: string
 *           description: approvedBy  
 *         type:
 *           type: string
 *           description: type 
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

const eventListingSchema = new Schema(
    {
        event: {
            type: String,
            required: true
        },
        description: {
            type: String,
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
        requestor: {
            type: {
                first_name: {
                    type: String
                },
                last_name: {
                    type: String
                },
                email: {
                    type: String,
                    lowercase: true,
                    trim: true,
                    validate: {
                        validator: validator.isEmail,
                        message: 'Email is not a valid email.',
                        isAsync: false
                    }
                },
                phone_number: {
                    type: String,
                    match: /^(639)\d{9}$/
                }
            },
            required: true
        },
        attendee: {
            type: [{
                first_name: {
                    type: String
                },
                last_name: {
                    type: String
                },
                email: {
                    type: String,
                    lowercase: true,
                    trim: true,
                    validate: {
                        validator: validator.isEmail,
                        message: 'Email is not a valid email.',
                        isAsync: false
                    }
                },
                phone_number: {
                    type: String,
                    match: /^(639)\d{9}$/
                },
                status: {
                    type: String,
                    enum: [
                        "Queued",
                        "Sending",
                        "Sent",
                        "Failed"
                    ],
                    default: "Queued"
                },
                age: {
                    type: Number
                },
                date_of_birth: {
                    type: Date,
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
                address: {
                    type: String,
                    required: true
                },
                isApproved: {
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
            }]
        },
        start_datetime: {
            type: Date,
            required: true
        },
        end_datetime: {
            type: Date,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        approvedBy: {
            type: String
        },
        type: {
            type: String,
            enum: [
                "Public",
                "Private"
            ],
            default: "Public"
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

eventListingSchema.pre(
    "save", 
    async function(next) {
        this.start_datetime = moment(this.start_datetime);
        this.end_datetime = moment(this.end_datetime);
        next();
    }
); 

const EventListing = model("event-listing", eventListingSchema);

module.exports = EventListing;