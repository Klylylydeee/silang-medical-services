const express = require("express");
const { check } = require("express-validator");

const recordController = require("../controller/cont.recordLog");
const { validateAuthorization } = require("../middleware/authHandler");
const { activityLogger } = require("../middleware/activityMonitorConfig");

const router = express.Router();

router.post(
    "/records-csv",
    [
        check("first_name").not().isEmpty(),
        check("last_name").not().isEmpty(),
        check("designation").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    recordController.createExportRecordLog
);

module.exports = router;