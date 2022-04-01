const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const moment = require("moment");

const validator = require("validator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Export Records:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
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
 *         designation:
 *           type: string
 *           description: designation
 *         createdAt:
 *           type: string
 *           description: createdAt  
 *         updateAt:
 *           type: string
 *           description: updateAt
 */

const recordSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            enum: {
                values: [
                    "Chairman",
                    "Staff",
                    "Doctor",
                    "Nurse",
                    "Web Administrator"
                ],
                message: "Designation does not exists."
            },
            required: true
        },
    },
    {
        timestamps: { 
            currentTime: () => {
                return moment().format();
            }
        }
    }
);

const RecordLog = model("record-logs", recordSchema);

module.exports = RecordLog;