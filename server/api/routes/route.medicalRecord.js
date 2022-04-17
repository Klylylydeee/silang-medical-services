const express = require("express");
const { check, query} = require("express-validator");

const medicalRecordController = require("../controller/cont.recordCRUD");
const { validateAuthorization } = require("../middleware/authHandler");
const { activityLogger } = require("../middleware/activityMonitorConfig");

const router = express.Router();

router.get(
    "/private/officer",
    validateAuthorization,
    activityLogger,
    medicalRecordController.allBarangayMedicalRecord
);

router.get(
    "/private/medical",
    validateAuthorization,
    activityLogger,
    medicalRecordController.allMedicalRecord
);

router.get(
    "/private/medical-record",
    [
        check("id").not().isEmpty()
    ],
    validateAuthorization,
    activityLogger,
    medicalRecordController.selectedMedicalRecord
);

router.post(
    "/private/create",
    [
        check("first_name").not().isEmpty(),
        check("last_name").not().isEmpty(),
        check("email").not().isEmpty(),
        check("phone_number").not().isEmpty(),
        check("diagnosis").not().isEmpty(),
        check("detailed_report").not().isEmpty(),
        check("outlier").not().isEmpty(),
        check("createdBy").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("gender").not().isEmpty(),
        check("date_of_birth").not().isEmpty(),
        check("address").not().isEmpty()
    ],
    activityLogger,
    medicalRecordController.createMedicalRecord
);

router.post(
    "/private/select-record",
    [
        check("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    activityLogger,
    medicalRecordController.selectMedicalRecord
);

router.patch(
    "/private/update-record",
    [
        check("id").not().isEmpty()
    ],
    activityLogger,
    medicalRecordController.updateMedicalRecord
);

router.post(
    "/public/generate-record-list",
    [
        check("email").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("phone_number").not().isEmpty(),
    ],
    activityLogger,
    medicalRecordController.selectGenerateMedicalRecord
);

router.post(
    "/public/verify-record-list",
    [
        check("email").not().isEmpty(),
        check("barangay").not().isEmpty(),
        check("phone_number").not().isEmpty(),
        check("pin").not().isEmpty()
    ],
    activityLogger,
    medicalRecordController.publicOTP
);

router.get(
    "/auto-complete",
    [
        query("barangay").not().isEmpty()
    ],
    activityLogger,
    medicalRecordController.autoCompleteDistict
);

module.exports = router;
