const axios = require("axios");

const MedicalRecord = require("../model/medicalRecord");

const { generateBarangayForm } = require("../middleware/puppeteerConfig");
const mailerConfig = require("../middleware/mailerConfig");

const { validateRequest } = require("../util/jsonValidate");

exports.analyticsByYear = async (req, res, next) => {

    try {

        
        // let transactionList = await MedicalRecord.aggregate([
        //     {
        //         $match: {
        //             createdAt: {
        //                 $gte: new Date(`2022-01-01T00:00:00.0Z`),
        //                 $lt: new Date(`2022-02-31T15:58:26.000Z`)
        //             }
        //         }
        //     },
        //     {
        //         $project: {
        //             outlier: 1,
        //             createdAt: 1,
        //             month: { 
        //                 $month: "$createdAt" 
        //             },
        //             year: {
        //                 $year: "$createdAt"
        //             }
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: { month: "$month", year: "$year" },
        //             collection: { 
        //                 $push: { 
        //                     score: "$outlier",
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $addFields: {
        //             data: {
        //                 $size: "$collection"
        //             }
        //         }
        //     },
        //     {
        //         $addFields: {
        //             year: "$_id.year"
        //         }
        //     },
        //     {
        //         $addFields: {
        //             id: {
        //                 $let: {
        //                     vars: {
        //                         monthsInString: [
        //                             0,
        //                             1,
        //                             2,
        //                             3,
        //                             4,
        //                             5,
        //                             6,
        //                             7,
        //                             8,
        //                             9,
        //                             10,
        //                             11,
        //                             12
        //                         ]
        //                     },
        //                     in: {
        //                         $arrayElemAt: [
        //                             '$$monthsInString',
        //                             '$_id.month'
        //                         ]
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $addFields: {
        //             month: {
        //                 $let: {
        //                     vars: {
        //                         monthsInString: [
        //                             '',
        //                             'January',
        //                             'February',
        //                             'March',
        //                             'April',
        //                             'May ',
        //                             'June',
        //                             'July',
        //                             'August',
        //                             'September',
        //                             'October',
        //                             'November',
        //                             'December'
        //                         ]
        //                     },
        //                     in: {
        //                         $arrayElemAt: [
        //                             '$$monthsInString',
        //                             '$id'
        //                         ]
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $unset: "id"
        //     },
        //     {
        //         $unset: "_id"
        //     },
        //     {
        //         $unset: "collection"
        //     },
        //     {
        //         $group: {
        //             _id: "$year",
        //             payload: { 
        //                 $push: { 
        //                     payload: {
        //                         month: "$month",
        //                         count: "$data"
        //                     },
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $project: {
        //             year: "$_id"
        //         }
        //     },
        //     {
        //         $unset: "_id"
        //     }
        // ])

        let medicalRecordList = await MedicalRecord.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`2021-01-01T00:00:00.0Z`),
                        $lt: new Date(`2022-12-31T15:58:26.000Z`)
                    },
                    barangay: req.body.barangay
                }
            },
            {
                $addFields: {
                    month: {
                        $month: "$createdAt"
                    },
                    year: {
                        $year: "$createdAt"
                    }
                }
            },
            {
                $project: {
                    outlier: 1,
                    month: 1,
                    year: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    month: 1
                }
            },
            {
                $addFields: {
                    months: {
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
                                    '$month'
                                ]
                            }
                        }
                    }
                }
            },
            {
                $unset: "month"
            },
            {
                $group: {
                    _id: {
                        year: "$year"
                    },
                    outlier_score: {
                        $push: {
                            month: "$months",
                            score: "$outlier"
                        }
                    }
                }
            }
        ]);

        let analyticsData = {};

        medicalRecordList.map((currentData) => {
            !analyticsData[`${currentData._id.year}`]?
                analyticsData[`${currentData._id.year}`] = {}
            : null
            currentData.outlier_score.map((currentScore) => {
                !analyticsData[`${currentData._id.year}`][`${currentScore.month}`] ?
                    analyticsData[`${currentData._id.year}`][`${currentScore.month}`] = {
                        low: 0,
                        medium: 0,
                        high: 0
                    }
                : null
                currentScore.score >= 8 ?
                    analyticsData[`${currentData._id.year}`][`${currentScore.month}`].high++
                : currentScore.score >= 5 ?
                    analyticsData[`${currentData._id.year}`][`${currentScore.month}`].medium++
                :
                    analyticsData[`${currentData._id.year}`][`${currentScore.month}`].low++
            })
        });

        res.send({
            message: "Analytics data based on query year and month",
            payload: analyticsData
        });

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }

}

exports.analyticsBySpecificDate = async (req, res, next) => {

    try {

        let analyticsData = await MedicalRecord.find(
            {
                barangay: req.body.barangay,
                createdAt: {
                    $gte: new Date(`${req.query.year}-${req.query.month}-01T00:00:00.0Z`),
                    $lt: new Date(`${req.query.year}-${req.query.month}-31T15:58:26.000Z`)
                }
            }
        );

        let analyticsEvaluated = {
            high: 0,
            medium: 0,
            low: 0
        };

        analyticsData.map((currentData) => {
            currentData.score >= 8 ?
                analyticsEvaluated.high++
            : currentData.score >= 5 ?
                analyticsEvaluated.medium++
            :
                analyticsEvaluated.low++
        });

        const uniqueValue = (arr, prop) => {
            return arr.reduce((a, d) => {
                if (!a.includes(d[prop])) { a.push(d[prop]); }
                return a;
            }, []);
        }

        const uniqueDiagonisis = uniqueValue(analyticsData, "diagnosis");

        res.send({
            message: "Specific analytics data",
            payload: {
                severity: analyticsEvaluated,
                diagnosis: uniqueDiagonisis
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
}
