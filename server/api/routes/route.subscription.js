const express = require("express");
const { check, query } = require("express-validator");

const subscriptionController = require("../controller/cont.subscribe");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.post(
    "/",
    [
        check("first_name").not().isEmpty(),
        check("last_name").not().isEmpty(),
        check("email").not().isEmpty(),
        check("phone_number").not().isEmpty(),
        check("barangay").not().isEmpty(),
    ],
    subscriptionController.createSubscription
);

router.get(
    "/listing",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    subscriptionController.getSubscription
);

module.exports = router;