const EventListing = require("../model/eventListing");

const { validateRequest } = require("../util/jsonValidate");

const moment = require("moment")


exports.barangayEvents = async (req, res, next) => {

    try {

        validateRequest(req);

        let finished = 0;
        let upcoming = 0;
        let awaiting = 0;

        const eventsData = await EventListing.find({ barangay: req.query.barangay }).select({
            start_datetime: 1,
            event: 1,
            status: 1           
        }).then((data) => {
            let dateObjects = {};
            data.map((data) => { 
                return {
                    ...data._doc,
                    start_datetime: moment(data.start_datetime).format("YYYY/MM/DD")
                }
            }).map(({ event, ...restData }) => {
                if(dateObjects[`${restData.start_datetime}`] === undefined){
                    dateObjects[`${restData.start_datetime}`] = []
                    restData.status === false ?
                        awaiting += 1
                    :
                        moment(new Date()) > moment(restData.start_datetime) ?
                        finished += 1
                        :
                        upcoming ++
                    dateObjects[`${restData.start_datetime}`].push({ 
                        type: 
                            restData.status === false ?
                                "default"
                            :
                                moment(new Date()) > moment(restData.start_datetime) ?
                                "success"
                                :
                                "warning",
                        content: event,
                        id: restData._id
                    })
                } else {
                    restData.status === false ?
                        awaiting += 1
                    :
                        moment(new Date()) > moment(restData.start_datetime) ?
                        finished += 1
                        :
                        upcoming ++
                    dateObjects[`${restData.start_datetime}`].push({ 
                        type: 
                        restData.status === false ?
                            "default"
                        :
                            moment(new Date()) > moment(restData.start_datetime) ?
                            "success"
                            :
                            "warning",
                        content: event,
                        id: restData._id
                    })
                }
            })
            return dateObjects
        })

        res.status(200).send({
            message: `Events for Barangay ${req.query.barangay}.`,
            payload: eventsData,
            analytics: {

                finished: finished,
                upcoming: upcoming,
                awaiting: awaiting
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.addBarangayEvents  = async (req, res, next) => {

    try {

        validateRequest(req);

        let eventsData = await EventListing.create({
            ...req.body,
            status: true
        })

        res.status(200).send({
            message: "Event created!",
            payload: eventsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.getBarangayEvent  = async (req, res, next) => {

    try {

        validateRequest(req);

        let eventsData = await EventListing.findOne({
            _id: req.query.id,
            barangay: req.query.barangay
        })
    
        if(eventsData === null){
            let error = new Error("Event does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: "Event Data",
            payload: eventsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.updateBarangayEvent  = async (req, res, next) => {

    try {

        validateRequest(req);

        let eventsData = await EventListing.findOneAndUpdate(
            { 
                _id: req.query.id,
                barangay: req.query.barangay
            },
            {
                $set: {
                    ...req.body
                }
            },
            { 
                new: true,
                timestamps: true
            }
        )
    
        if(eventsData === null){
            let error = new Error("Event does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: "Event data updated!",
            payload: eventsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};