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
    userSettingController.userList
);

router.post(
    "/user-invitation",
    userCreateController.userSignUp
);

router.post(
    "/user-data",
    userSettingController.userData
);

router.post(
    "/user-status",
    userSettingController.userStatus
);

router.post(
    "/user-pass-request",
    userSettingController.requestPasswordChange
);

router.post(
    "/user-setting",
    userSettingController.userChangeSetting
);

module.exports = router;
