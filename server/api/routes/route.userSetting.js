const express = require("express");
const { check, query} = require("express-validator");

const userSettingController = require("../controller/cont.userSetting");
const userCreateController = require("../controller/cont.authentication");
const { validateAuthorization } = require("../middleware/authHandler");
const { activityLogger } = require("../middleware/activityMonitorConfig");

const router = express.Router();

router.get(
    "/user-list",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
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
    activityLogger,
    userCreateController.userSignUp
);

router.post(
    "/user-data",
    validateAuthorization,
    activityLogger,
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
    activityLogger,
    userSettingController.userStatus
);

router.post(
    "/user-pass-request",
    [
        check("_id").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    userSettingController.requestPasswordChange
);

router.post(
    "/user-setting",
    validateAuthorization,
    activityLogger,
    userSettingController.userChangeSetting
);

module.exports = router;
