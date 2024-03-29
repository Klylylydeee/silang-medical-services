const express = require("express");
const { check, query} = require("express-validator");

const eventController = require("../controller/cont.eventListing");
const { validateAuthorization } = require("../middleware/authHandler");
const { activityLogger } = require("../middleware/activityMonitorConfig");

const router = express.Router();

router.get(
    "/private-list",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
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
    activityLogger,
    eventController.addBarangayEvents
);

router.get(
    "/event",
    [
        query("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    eventController.getBarangayEvent
)

router.post(
    "/update-listing",
    [
        query("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    eventController.updateBarangayEvent
);

router.post(
    "/update-listing-attendee",
    [
        query("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    activityLogger,
    eventController.updateBarangayEventAttendee
);

router.post(
    "/approve-listing-attendee",
    [
        query("id").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    eventController.approveAttendee
);

router.post(
    "/remove-listing-attendee",
    [
        query("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    activityLogger,
    eventController.removeBarangayEventAttendee
);

router.get(
    "/public/event-and-announcement",
    [
        query("barangay").not().isEmpty()
    ],
    activityLogger,
    eventController.publicEventsAndAnnouncement
);

module.exports = router;