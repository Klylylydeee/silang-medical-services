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
                }
            }]
        },
        officials: {
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
                }
            }],
            default: undefined
        },
        start_datetime: {
            type: String,
            required: true
        },
        end_datetime: {
            type: String,
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

const EventListing = model("event-listing", eventListingSchema);

module.exports = EventListing;