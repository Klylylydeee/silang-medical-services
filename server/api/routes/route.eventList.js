const express = require("express");
const { check, query} = require("express-validator");

const eventController = require("../controller/cont.eventListing");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/private-list",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    eventController.barangayEvents
);

router.post(
    "/create-listing",
    [
        check("event").not().isEmpty(),
        check("description").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("requestor").not().isEmpty(),
        check("start_datetime").not().isEmpty(),
        check("end_datetime").not().isEmpty(),
        check("createdBy").not().isEmpty(),
    ],
    validateAuthorization,
    eventController.addBarangayEvents
);

router.get(
    "/event",
    [
        query("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    eventController.getBarangayEvent
)

router.post(
    "/update-listing",
    [
        query("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    eventController.updateBarangayEvent
);

router.post(
    "/update-listing-attendee",
    [
        query("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    eventController.updateBarangayEventAttendee
);

router.post(
    "/remove-listing-attendee",
    [
        query("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    eventController.removeBarangayEventAttendee
);

router.get(
    "/public/event-and-announcement",
    [
        query("barangay").not().isEmpty()
    ],
    eventController.publicEventsAndAnnouncement
);

module.exports = router;