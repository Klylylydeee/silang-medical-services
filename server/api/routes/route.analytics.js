const express = require("express");
const { check, query } = require("express-validator");

const analyticsController = require("../controller/cont.analyticsCRUD");
const { validateAuthorization } = require("../middleware/authHandler");
const { activityLogger } = require("../middleware/activityMonitorConfig");

const router = express.Router();

router.get(
    "/",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    analyticsController.analyticsByYear
);

router.get(
    "/specific",
    [
        check("barangay").not().isEmpty(),
        query("year").not().isEmpty(),
        query("month").not().isEmpty(),
    ],
    validateAuthorization,
    activityLogger,
    analyticsController.analyticsSpecificDate
);

router.get(
    "/specific-comments",
    [
        query("barangay").not().isEmpty(),
        query("year").not().isEmpty(),
        query("month").not().isEmpty(),
    ],
    validateAuthorization,
    activityLogger,
    analyticsController.commentSpecificDate
);

router.post(
    "/add-comments",
    [
        query("author").not().isEmpty(),
        query("comment").not().isEmpty(),
        query("barangay").not().isEmpty(),
        query("year").not().isEmpty(),
        query("month").not().isEmpty(),
    ],
    validateAuthorization,
    activityLogger,
    analyticsController.addCommentSpecificDate
);

router.patch(
    "/remove-comments",
    [
        query("_id").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    analyticsController.deleteCommentSpecificDate
);

module.exports = router;