const express = require("express");
const { check, query} = require("express-validator");

const analyticsController = require("../controller/cont.dashboard");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/default",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    analyticsController.mainDashboard
)

router.get(
    "/chairman",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    analyticsController.chairmanDashboard
);

router.get(
    "/staff",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    analyticsController.staffDashboard
);

router.get(
    "/nurse",
    [
        query("barangay").not().isEmpty()
    ],
    validateAuthorization,
    analyticsController.nurseDashboard
);

module.exports = router;