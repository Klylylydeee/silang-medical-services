const express = require("express");
const { check, query} = require("express-validator");

const eventController = require("../controller/cont.eventListing");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/private-list",
    eventController.barangayEvents
);

router.post(
    "/create-listing",
    eventController.addBarangayEvents
);

router.get(
    "/event",
    eventController.getBarangayEvent
)

router.post(
    "/update-listing",
    eventController.updateBarangayEvent
);


module.exports = router;