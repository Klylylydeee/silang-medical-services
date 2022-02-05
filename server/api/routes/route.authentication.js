const express = require("express");
const { check, query} = require("express-validator");

const userAuthController = require("../controller/cont.authentication");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.post(
    "/sign-up",
    [
        check("first_name").not().isEmpty(),
        check("last_name").not().isEmpty(),
        check("email").not().isEmpty(),
        check("password").not().isEmpty(),
        check("phone_number").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("designation").not().isEmpty()
    ],
    userAuthController.userSignUp
);

router.get(
    "/sign-up-verification",
    [
        query("payload").not().isEmpty()
    ],
    userAuthController.userSignUpVerification
);

router.post(
    "/sign-in",
    [
        check("email").not().isEmpty(),
        check("password").not().isEmpty()
    ],
    userAuthController.userSignIn
);

router.post(
    "/pin-verification",
    [
        check("email").not().isEmpty(),
        check("pin").not().isEmpty()
    ],
    userAuthController.userPINVerification
);

router.post(
    "/account-reset",
    [
        check("email").not().isEmpty()
    ],
    userAuthController.userAccountReset
);

router.get(
    "/verify-reset",
    [
        query("payload").not().isEmpty()
    ],
    userAuthController.userVerifyReset
);


module.exports = router;