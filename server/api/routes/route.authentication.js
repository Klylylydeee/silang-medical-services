const express = require("express");
const { check, query} = require("express-validator");

const userAuthController = require("../controller/cont.authentication");
const { activityLogger } = require("../middleware/activityMonitorConfig");

const router = express.Router();

router.post(
    "/sign-up",
    [
        check("first_name").not().isEmpty(),
        check("last_name").not().isEmpty(),
        check("email").not().isEmpty(),
        check("phone_number").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("designation").not().isEmpty()
    ],
    activityLogger,
    userAuthController.userSignUp
);

router.post(
    "/sign-up-verification",
    [
        check("_id").not().isEmpty(),
        check("password").not().isEmpty()
    ],
    activityLogger,
    userAuthController.userSignUpVerification
);

router.post(
    "/sign-in",
    [
        check("email").not().isEmpty(),
        check("password").not().isEmpty()
    ],
    activityLogger,
    userAuthController.userSignIn
);

router.post(
    "/pin-verification",
    [
        check("email").not().isEmpty(),
        check("pin").not().isEmpty()
    ],
    activityLogger,
    userAuthController.userPINVerification
);

router.post(
    "/account-reset",
    [
        check("email").not().isEmpty()
    ],
    activityLogger,
    userAuthController.userAccountReset
);

router.get(
    "/verify-reset",
    [
        query("payload").not().isEmpty()
    ],
    activityLogger,
    userAuthController.userVerifyReset
);

router.post(
    "/lost-password",
    [
        check("email").not().isEmpty(),
        check("password").not().isEmpty()
    ],
    activityLogger,
    userAuthController.userLostPassword
);

router.post(
    "/accept-password",
    [
        check("email").not().isEmpty(),
        check("password").not().isEmpty()
    ],
    activityLogger,
    userAuthController.acceptChangePassword
);


module.exports = router;