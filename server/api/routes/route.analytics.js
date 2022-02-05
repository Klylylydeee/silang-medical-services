const express = require("express");
const { check, query} = require("express-validator");

const analyticsController = require("../controller/cont.analyticsCRUD");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/",
    [
        // query("payload").not().isEmpty()
    ],
    analyticsController.analyticsByYear
)

module.exports = router;