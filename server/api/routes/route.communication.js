const express = require("express");
const { check, query} = require("express-validator");

const communicationController = require("../controller/cont.communication");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/listing/:id",
    validateAuthorization,
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
    communicationController.createAnnouncement
);

router.post(
    "/update/:id",
    validateAuthorization,
    communicationController.updateAnnouncement
);

module.exports = router;