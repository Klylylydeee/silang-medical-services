const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const moment = require("moment");

const validator = require("validator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Announcements:
 *       type: object
 *       required:
 *         - announcement
 *         - description
 *         - barangay
 *         - requestor
 *         - subscribed
 *         - approved_by
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         announcement:
 *           type: string
 *           description: announcement
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
 *         subscribed:
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
 *             status:
 *               type: boolean
 *               description: status
 *           description: subscribed 
 *         createdAt:
 *           type: string
 *           description: createdAt  
 *         updateAt:
 *           type: string
 *           description: updateAt 
 */

const announcementSchema = new Schema(
    {
        announcement: {
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
        subscribed: {
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
                        "Sent"
                    ],
                    default: "Queued"
                }
            }],
            required: true
        },
        approved_by: {
            type: String,
            default: undefined
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

const Announcement = model("announcement", announcementSchema);

module.exports = Announcement;