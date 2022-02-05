const axios = require("axios");

const MedicalRecord = require("../model/medicalRecord");

const { generateBarangayForm } = require("../middleware/puppeteerConfig");
const mailerConfig = require("../middleware/mailerConfig");

const { validateRequest } = require("../util/jsonValidate");

exports.analyticsByYear = async (req, res, next) => {

    try {

        
        let transactionList = await MedicalRecord.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`2022-01-01T00:00:00.0Z`),
                        $lt: new Date(`2022-02-31T15:58:26.000Z`)
                    }
                }
            },
            {
                $project: {
                    outlier: 1,
                    createdAt: 1,
                    month: { 
                        $month: "$createdAt" 
                    },
                    year: {
                        $year: "$createdAt"
                    }
                }
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    collection: { 
                        $push: { 
                            score: "$outlier",
                        }
                    }
                }
            },
            {
                $addFields: {
                    data: {
                        $size: "$collection"
                    }
                }
            },
            {
                $addFields: {
                    year: "$_id.year"
                }
            },
            {
                $addFields: {
                    id: {
                        $let: {
                            vars: {
                                monthsInString: [
                                    0,
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8,
                                    9,
                                    10,
                                    11,
                                    12
                                ]
                            },
                            in: {
                                $arrayElemAt: [
                                    '$$monthsInString',
                                    '$_id.month'
                                ]
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    month: {
                        $let: {
                            vars: {
                                monthsInString: [
                                    '',
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May ',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December'
                                ]
                            },
                            in: {
                                $arrayElemAt: [
                                    '$$monthsInString',
                                    '$id'
                                ]
                            }
                        }
                    }
                }
            },
            {
                $unset: "id"
            },
            {
                $unset: "_id"
            },
            {
                $unset: "collection"
            },
            {
                $group: {
                    _id: "$year",
                    payload: { 
                        $push: { 
                            payload: {
                                month: "$month",
                                count: "$data"
                            },
                        }
                    }
                }
            },
            // {
            //     $project: {
            //         year: "$_id"
            //     }
            // },
            // {
            //     $unset: "_id"
            // }
        ])

        res.send({
            transactionList
        })

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }

}