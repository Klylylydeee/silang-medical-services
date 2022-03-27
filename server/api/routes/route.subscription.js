const express = require("express");
const { check, query } = require("express-validator");

const subscriptionController = require("../controller/cont.subscribe");
const { validateAuthorization } = require("../middleware/authHandler");
const { activityLogger } = require("../middleware/activityMonitorConfig");

const router = express.Router();

router.post(
    "/",
    [
        check("first_name").not().isEmpty(),
        check("last_name").not().isEmpty(),
        check("email").not().isEmpty(),
        check("phone_number").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("address").not().isEmpty()
    ],
    activityLogger,
    subscriptionController.createSubscription
);

router.get(
    "/listing",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    subscriptionController.getSubscription
);

router.post(
    "/approve-listing",
    [
        check("id").not().isEmpty(),
    ],
    validateAuthorization,
    activityLogger,
    subscriptionController.approveSubscription
);

module.exports = router;