const express = require("express");
const { check, query} = require("express-validator");

const eventController = require("../controller/cont.eventListing");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/list",
    eventController.barangayEvents
);

module.exports = router;