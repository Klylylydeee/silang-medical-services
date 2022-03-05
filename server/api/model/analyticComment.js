const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const moment = require("moment");

const validator = require("validator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Analytic Comments:
 *       type: object
 *       required:
 *         - comment
 *         - year
 *         - month
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         comment:
 *           type: string
 *           description: comment
 *         year:
 *           type: string
 *           description: year
 *         month:
 *           type: string
 *           description: month
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

const commentSchema = new Schema(
    {
        author: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        barangay: {
            type: String,
            required: true
        },
        month: {
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

const AnalyticComments = model("analytic-comments", commentSchema);

module.exports = AnalyticComments;