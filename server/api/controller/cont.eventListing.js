const EventListing = require("../model/eventListing");
const Announcement = require("../model/announcement");

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
            ...(req.body.status === true) && { approvedBy: req.body.createdBy }
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
                },
                $unset: {
                    ...(req.body.status === false) && { approvedBy: 1 }
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

exports.updateBarangayEventAttendee  = async (req, res, next) => {

    try {

        validateRequest(req);

        let emailExist = await EventListing.findOne(
            {
                _id: req.query.id,
                barangay: req.query.barangay,
                "attendee.email": req.body.email
            }
        );

        if(emailExist !== null){
            let error = new Error("Email has already been registered.");
            error.statusCode = 501;
            throw error;
        };

        let phoneExist = await EventListing.findOne(
            {
                _id: req.query.id,
                barangay: req.query.barangay,
                "attendee.phone_number": req.body.phone_number
            }
        );

        if(phoneExist !== null){
            let error = new Error("Phone Number has already been registered.");
            error.statusCode = 501;
            throw error;
        };

        let eventsData = await EventListing.findOneAndUpdate(
            { 
                _id: req.query.id,
                barangay: req.query.barangay
            },
            {
                $push: {
                    attendee: {
                        ...req.body
                    }
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
            message: "Attendee added!",
            payload: eventsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.removeBarangayEventAttendee  = async (req, res, next) => {

    try {

        validateRequest(req);

        if(req.body.email) {
            let checkIfExist = await EventListing.findOne(
                { 
                    _id: req.query.id,
                    barangay: req.query.barangay,
                    "attendee.email": req.body.email,
                    "attendee.phone_number": req.body.phone_number,
                }
            );

            if(checkIfExist === null){
                let error = new Error("Attendee does not exists.");
                error.statusCode = 501;
                throw error;
            };
            
            let eventsData = await EventListing.findOneAndUpdate(
                { 
                    _id: req.query.id,
                    barangay: req.query.barangay
                },
                {
                    $pull: {
                        attendee: {
                            email: req.body.email
                        }
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
                message: "Attendee removed!",
                payload: eventsData
            });

        } else {
            let eventsData = await EventListing.findOneAndUpdate(
                { 
                    _id: req.query.id,
                    barangay: req.query.barangay
                },
                {
                    $pull: {
                        attendee: {
                            _id: req.body.id
                        }
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
                message: "Attendee removed!",
                payload: eventsData
            });
        }

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};


exports.publicEventsAndAnnouncement  = async (req, res, next) => {

    try {

        validateRequest(req);

        let eventsData = await EventListing.find(
            { 
                barangay: req.query.barangay,
                status: true,
                createdAt: {
                    $gte: new Date(`${moment().format("YYYY")}-01-01T00:00:00.0Z`),
                    $lt: new Date(`${moment().format("YYYY")}-12-31T15:58:26.000Z`)
                },
                type: "Public"
            }
        ).sort({ start_datetime: -1})

        let announcementData = await Announcement.find(
            { 
                barangay: req.query.barangay,
                createdAt: {
                    $gte: new Date(`${moment().format("YYYY")}-01-01T00:00:00.0Z`),
                    $lt: new Date(`${moment().format("YYYY")}-12-31T15:58:26.000Z`)
                }
            }
        ).sort({ announcement_datetime: -1})

        if(eventsData === null){
            let error = new Error("Event does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: "Events and Announcement for current year of the barangay!",
            payload: {
                events: eventsData,
                announcements: announcementData
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};