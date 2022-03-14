const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Error Logs:
 *       type: object
 *       required:
 *         - timestamp
 *         - level
 *         - message
 *         - meta
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         timestamp:
 *           type: datetime
 *           description: timestamp
 *         level:
 *           type: string
 *           description: level
 *         message:
 *           type: string
 *           description: message
 *         meta:
 *           type: object
 *           properties:
 *             status:
 *               type: String
 *               description: status
 *             stack:
 *               type: String
 *               description: stack
 * 
 */

 const ErrorSchema = new Schema(
    {
        timestamp: {
            type: Date
        },
        level: {
            type: String
        },
        message: {
            type: String
        },
        meta: {
            type: {
                status: {
                    type: Number
                },
                stack: {
                    type: String
                }
            },
            required: true
        }
    }
);

const ErrorLogs = model("error-logs", ErrorSchema);

module.exports = ErrorLogs;