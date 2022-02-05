const express = require("express");
const { check, query} = require("express-validator");

const medicalRecordController = require("../controller/cont.recordCRUD");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/private/officer",
    [
        query("barangay").not().isEmpty()
    ],
    medicalRecordController.allBarangayMedicalRecord
);

router.get(
    "/private/medical",
    medicalRecordController.allMedicalRecord
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
        // Determine if auto approve
        check("designation").not().isEmpty(),
    ],
    medicalRecordController.createMedicalRecord
);

router.post(
    "/private/select-record",
    [
        check("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    medicalRecordController.selectMedicalRecord
);

router.patch(
    "/private/update-record",
    [
        check("id").not().isEmpty(),
        query("barangay").not().isEmpty()
    ],
    medicalRecordController.updateMedicalRecord
);

router.post(
    "/private/generate-record-list",
    [
        check("email").not().isEmpty(),
        check("barangay").not().isEmpty(),
    ],
    medicalRecordController.selectGenerateMedicalRecord
);

router.post(
    "/private/generate-record",
    [
        query("id").not().isEmpty(),
    ],
    medicalRecordController.generateMedicalRecord
);

module.exports = router;
