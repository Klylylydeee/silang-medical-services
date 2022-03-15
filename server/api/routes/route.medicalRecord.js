const express = require("express");
const { check, query} = require("express-validator");

const medicalRecordController = require("../controller/cont.recordCRUD");
const { validateAuthorization } = require("../middleware/authHandler");

const router = express.Router();

router.get(
    "/private/officer",
    validateAuthorization,
    medicalRecordController.allBarangayMedicalRecord
);

router.get(
    "/private/medical",
    validateAuthorization,
    medicalRecordController.allMedicalRecord
);

router.get(
    "/private/medical-record",
    [
        check("id").not().isEmpty()
    ],
    validateAuthorization,
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
        check("id").not().isEmpty()
    ],
    medicalRecordController.updateMedicalRecord
);

router.post(
    "/public/generate-record-list",
    [
        check("email").not().isEmpty(),
        check("barangay").not().isEmpty(),
    ],
    medicalRecordController.selectGenerateMedicalRecord
);

module.exports = router;
