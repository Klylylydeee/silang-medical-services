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
    validateAuthorization,
    communicationController.createAnnouncement
);

router.post(
    "/update/:id",
    validateAuthorization,
    communicationController.updateAnnouncement
);

module.exports = router;