const EventListing = require("../model/eventListing");
const Announcement = require("../model/announcement");

exports.listOfEventsAndAnnouncementBarangay = async (req, res, next) => {

    try {

        let eventData = await EventListing.find(
            {
                barangay: req.body.barangay,
                status: true
            }
        );

        let announcementData = await Announcement.find(
            {
                barangay: req.body.barangay,
                status: true
            }
        );

        res.status(200).send({
            message: `Event and Announcement for barangay ${req.query.barangay}`,
            payload: {
                events: eventData,
                announcement: announcementData
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
}

exports.eventBarangay = async (req, res, next) => {

    try {

        let eventData = await EventListing.findOne(
            {
                status: true
            }
        );
        
        if(eventData === null){
            let error = new Error("Event record does not exists.");
            error.statusCode = 501;
            throw error;
        };



        res.status(200).send({
            message: `Event and Announcement for barangay ${req.query.barangay}`,
            payload: {
                events: eventData,
                announcement: announcementData
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }
}


exports.announcementBarangay = async (req, res, next) => {

    try {

        let announcementData = await Announcement.findOne(
            {
                _id: req.body.id,
                status: true
            }
        );
        
        if(announcementData === null){
            let error = new Error("Announcement record does not exists.");
            error.statusCode = 501;
            throw error;
        };

        res.status(200).send({
            message: `Announcement for barangay ${req.query.barangay}`,
            payload: announcementData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    }

};