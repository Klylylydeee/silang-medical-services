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