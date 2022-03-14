const express = require("express");
const { check, query} = require("express-validator");

const userSettingController = require("../controller/cont.userSetting");
const userCreateController = require("../controller/cont.authentication");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/user-list",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    userSettingController.userList
);

router.post(
    "/user-invitation",
    [
        check("first_name").not().isEmpty(),
        check("last_name").not().isEmpty(),
        check("email").not().isEmpty(),
        check("phone_number").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("designation").not().isEmpty()
    ],
    validateAuthorization,
    userCreateController.userSignUp
);

router.post(
    "/user-data",
    validateAuthorization,
    userSettingController.userData
);

router.post(
    "/user-status",
    [
        check("_id").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("status").not().isEmpty()
    ],
    validateAuthorization,
    userSettingController.userStatus
);

router.post(
    "/user-pass-request",
    [
        check("_id").not().isEmpty()
    ],
    validateAuthorization,
    userSettingController.requestPasswordChange
);

router.post(
    "/user-setting",
    validateAuthorization,
    userSettingController.userChangeSetting
);

module.exports = router;
