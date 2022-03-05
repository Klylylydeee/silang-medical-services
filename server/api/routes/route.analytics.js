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
);

router.get(
    "/specific",
    analyticsController.analyticsSpecificDate
);

router.get(
    "/specific-comments",
    analyticsController.commentSpecificDate
);

router.post(
    "/add-comments",
    analyticsController.addCommentSpecificDate
);

router.patch(
    "/remove-comments",
    analyticsController.deleteCommentSpecificDate
);

module.exports = router;