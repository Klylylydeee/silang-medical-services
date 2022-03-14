const axios = require("axios");
const moment = require("moment");

const MedicalRecord = require("../model/medicalRecord");
const AnalyticComments = require("../model/analyticComment");

const { monthToNumber } = require("../util/dateHelper");

const { validateRequest } = require("../util/jsonValidate");

exports.analyticsByYear = async (req, res, next) => {

    try {

        validateRequest(req);

        let medicalRecordList = await MedicalRecord.aggregate([
            {
                $match: {
                    barangay: req.query.barangay
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
                                    'May',
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

        
        let analyticsData = [];

        medicalRecordList.map(({ _id, outlier_score }) => {

            outlier_score.map(({ month, score}) => {
                if(analyticsData.map((values) => { return values.datetime }).indexOf(`${_id.year} - ${month} - ${score >= 8 ? "Severe" : score >= 5 ? "Moderate" : "Mild" }`) === -1){
                    analyticsData.push({
                        datetime: `${_id.year} - ${month} - ${score >= 8 ? "Severe" : score >= 5 ? "Moderate" : "Mild" }`,
                        value: 0
                    })
                }

                let indexVal = analyticsData.map((values) => { return values.datetime }).indexOf(`${_id.year} - ${month} - ${score >= 8 ? "Severe" : score >= 5 ? "Moderate" : "Mild" }`);
                analyticsData[indexVal] = {
                    ...analyticsData[indexVal],
                    value: ++ analyticsData[indexVal].value
                }
            })
        });

        let filteredData = analyticsData.map((record) => {
            let newDateTime = record.datetime.split(" - ");
            return {
                datetime: newDateTime[0] + " - " + newDateTime[1],
                category: newDateTime[2],
                value: record.value
            }
        });

        var collator = new Intl.Collator([], {numeric: true});
        let sortedData = filteredData.sort((a, b) => collator.compare(a, b)).sort((a, b) => {
            return moment(a.datetime,'YYYY - MMMM') - moment(b.datetime,'YYYY - MMMM')
        })

        res.send({
            message: "Analytics data based on query year and month",
            payload: sortedData
        });

    } catch (err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }

}

exports.analyticsBySpecificDate = async (req, res, next) => {

    try {
        
        validateRequest(req);

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

exports.analyticsSpecificDate = async (req, res, next) => {

    try {
        
        validateRequest(req);

        let analyticsData = await MedicalRecord.find(
            {
                barangay: req.query.barangay,
                createdAt: {
                    $gte: new Date(`${req.query.year}-${monthToNumber(req.query.month)}-01T00:00:00.0Z`),
                    $lt: new Date(`${req.query.year}-${monthToNumber(req.query.month)}-31T15:58:26.000Z`)
                }
            }
        );
    
        let filteredData = []

        analyticsData.map((record) => {
            if(filteredData.map((values) => { return values.type }).indexOf(record.diagnosis) === -1){
                filteredData.push({
                    type: record.diagnosis,
                    value: 0
                })
            }
            let indexVal = filteredData.map((values) => { return values.type }).indexOf(record.diagnosis);
            filteredData[indexVal] = {
                ...filteredData[indexVal],
                value: ++ filteredData[indexVal].value
            }
        });

        let commentsData = await AnalyticComments.find(
            {
                barangay: req.query.barangay,
                year: req.query.year,
                month: req.query.month,
                status: true
            }
        );

        let filteredComment = commentsData.map((data) => {
            return {
                author: data.author,
                content: data.comment,
                datetime: moment(data.createdAt).format("MMMM DD, YYYY h:MM A"),
                _id: data._id
            }
        });

        res.send({
            message: "Specific analytics data",
            payload: filteredData,
            comments: filteredComment
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
}

exports.commentSpecificDate = async (req, res, next) => {

    try {
        
        validateRequest(req);

        let commentsData = await AnalyticComments.find(
            {
                barangay: req.query.barangay,
                year: req.query.year,
                month: req.query.month,
                status: true
            }
        );
    
        let filteredComment = commentsData.map((data) => {
            return {
                author: data.author,
                content: data.comment,
                datetime: moment(data.createdAt).format("MMMM DD, YYYY h:MM A"),
                _id: data._id
            }
        });

        res.send({
            message: "Specific comment data",
            comments: filteredComment
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
}

exports.addCommentSpecificDate = async (req, res, next) => {

    try {
        
        validateRequest(req);

        let commentsData = await AnalyticComments.create(
            {
                author: req.query.author,
                comment: req.query.comment,
                barangay: req.query.barangay,
                year: req.query.year,
                month: req.query.month,
                status: true
            }
        );
    
        res.send({
            message: "Comment has been added!",
            comments: commentsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
}


exports.deleteCommentSpecificDate = async (req, res, next) => {

    try {
        
        validateRequest(req);

        let commentsData = await AnalyticComments.findOneAndUpdate(
            { 
                _id: req.query._id,
                status: true
            },
            {
                $set: {
                    status: false
                }
            },
            { 
                new: true,
                timestamps: true
            }
        );
    
        res.send({
            message: "Comment has been deleted!",
            comments: commentsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
}

