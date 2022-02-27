const EventListing = require("../model/eventListing");

const { validateRequest } = require("../util/jsonValidate");

const moment = require("moment")


exports.barangayEvents = async (req, res, next) => {

    try {

        validateRequest(req);

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
                    dateObjects[`${restData.start_datetime}`].push({ 
                        type: 
                            restData.status === false ?
                                "default"
                            :
                                moment() > moment(restData.start_datetime) ?
                                "success"
                                :
                                "warning",
                        content: event
                    })
                } else {
                    dateObjects[`${restData.start_datetime}`].push({ 
                        type: 
                        restData.status === false ?
                            "default"
                        :
                            moment() > moment(restData.start_datetime) ?
                            "success"
                            :
                            "warning",
                        content: event
                    })
                }
            })
            return dateObjects
        })

        res.status(200).send({
            message: "Events for Barangay Lumil.",
            payload: eventsData
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};