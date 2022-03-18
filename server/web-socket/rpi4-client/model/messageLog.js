const { Schema, model } = require("mongoose");

const moment = require("moment");

/**
 * @swagger
 * components:
 *   schemas:
 *     Message Logs:
 *       type: object
 *       required:
 *         - request_user_id
 *         - receiver_user_id
 *         - message
 *         - subject
 *         - user_id
 *         - type
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         request_user_id:
 *           type: string
 *           description: request_user_id
 *         receiver_user_id:
 *           type: string
 *           description: receiver_user_id
 *         subject:
 *           type: string
 *           description: subject
 *         message:
 *           type: string
 *           description: message
 *         type:
 *           type: string
 *           description: type
 *         status:
 *           type: string
 *           description: boolean
 */

const messageLogSchema = new Schema(
    {
        request_user_id: {
            type: String
        },
        receiver_user_id: {
            type: String
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: [
                "Email",
                "Text"
            ],
            required: true
        },
        status: {
            type: Boolean,
            default: false
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

const MessageLogs = model("message-logs", messageLogSchema);

module.exports = MessageLogs;