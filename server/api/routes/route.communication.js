const express = require("express");
const { check, query} = require("express-validator");

const communicationController = require("../controller/cont.communication");
const { validateAuthorization } = require("../middleware/authHandler");
const { activityLogger } = require("../middleware/activityMonitorConfig");

const router = express.Router();

router.get(
    "/listing/:id",
    validateAuthorization,
    activityLogger,
    communicationController.retrieveAllAnnouncement
);

router.post(
    "/create",
    [
        check("announcement").not().isEmpty(),
        check("message").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("announcement_datetime").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    communicationController.createAnnouncement
);

router.post(
    "/update/:id",
    validateAuthorization,
    activityLogger,
    communicationController.updateAnnouncement
);

module.exports = router;