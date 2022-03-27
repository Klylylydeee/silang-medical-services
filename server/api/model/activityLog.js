const { Schema, model } = require("mongoose");

const moment = require("moment");

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity Logs:
 *       type: object
 *       required:
 *         - meta
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         meta:
 *           type: object
 *           description: meta
 *         createdAt:
 *           type: string
 *           description: createdAt
 *         updateAt:
 *           type: string
 *           description: updateAt
 */

const predeterminedSchema = new Schema(
    {
        author: {
            type: String,
        },
        comment: {
            type: String,
        },
        year: {
            type: String,
        },
        barangay: {
            type: String,
        },
        month: {
            type: String,
        },
        status: {
            type: Boolean,
        },
        announcement: {
            type: String,
        },
        message: {
            type: String,
        },
        requestor: {
            type: {
                first_name: {
                    type: String,
                },
                last_name: {
                    type: String,
                },
                email: {
                    type: String,
                },
                phone_number: {
                    type: String,
                },
            },
        },
        subscribed: {
            type: [
                {
                    first_name: {
                        type: String,
                    },
                    last_name: {
                        type: String,
                    },
                    email: {
                        type: String,
                    },
                    phone_number: {
                        type: String,
                    },
                    status: {
                        type: String,
                    },
                },
            ],
            default: undefined
        },
        announcement_datetime: {
            type: Date,
        },
        event: {
            type: String,
        },
        description: {
            type: String,
        },
        start_datetime: {
            type: Date,
        },
        end_datetime: {
            type: Date,
        },
        createdBy: {
            type: String,
        },
        approvedBy: {
            type: String,
        },
        type: {
            type: String,
        },
        diagnosis: {
            type: String,
        },
        detailed_report: {
            type: String,
        },
        outlier: {
            type: Number,
        },
        prescription: {
            type: [
                {
                    prescription: {
                        type: String,
                    },
                    dosage: {
                        type: String,
                    },
                },
            ],
            default: undefined
        },
        pin: {
            type: Number,
            maxlength: 6,
        },
        otp: {
            type: Number,
            maxlength: 6,
        },
        disable: {
            type: Boolean,
        },
        address: {
            type: String,
        },
        disabledBy: {
            type: String,
        },
        facebook_url: {
            type: String,
        },
        barangay_id_number: {
            type: String,
        },
        vaccine_card: {
            type: String,
        },
        proof_of_billing: {
            type: String,
        },
        any_id: {
            type: String,
        }
    }
)

const activityLogSchema = new Schema(
    {
        path: {
            type: String,
        },
        meta: {
            type: {
                body:{
                    type: predeterminedSchema
                },
                params:{
                    type: predeterminedSchema
                },
                query:{
                    type: predeterminedSchema
                },
            }
        },
        auth: {
            type: {
                first_name: {
                    type: String,
                },
                last_name: {
                    type: String,
                },
                email: {
                    type: String,
                },
                phone_number: {
                    type: String,
                },
                barangay: {
                    type: String,
                },
                designation: {
                    type: String,
                },
            },
        },
        type: {
            type: String,
            enum: ["Private", "Public"],
        },
        httpMethod: {
            type: String,
        },
        ipSource: {
            type: String,
        },
    },
    {
        timestamps: {
            currentTime: () => {
                return moment().format();
            },
        },
    }
);

const Activity = model("activity-logs", activityLogSchema);

module.exports = Activity;
