const Announcement = require("../model/announcement");
const EventListing = require("../model/eventListing");
const MedicalRecords = require("../model/medicalRecord");
const Users = require("../model/userAccount");

const { validateRequest } = require("../util/jsonValidate");

exports.chairmanDashboard = async (req, res, next) => {

    try {

        validateRequest(req);

        const distictCitizenRegisteredForm = await MedicalRecords.find({ barangay: req.query.barangay }).distinct("email");
        const totalBarangayMedicalRecord = await MedicalRecords.find({ barangay: req.query.barangay }).count();
        const totalBarangayUsers = await Users.find({ barangay: req.query.barangay }).count();
        const latestEvent = await EventListing.find({ barangay: req.query.barangay }).sort({ _id: -1 }).limit(5);
        const latestAnnouncement = await Announcement.find({ barangay: req.query.barangay }).sort({ _id: -1 }).limit(5);

        res.status(200).send({
            message: "Chairman dashboard data.",
            payload: {
                unique_citizen_medical_record: distictCitizenRegisteredForm.length,
                barangay_users: totalBarangayUsers,
                barangay_medical_records: totalBarangayMedicalRecord,
                latest_announcement: latestEvent,
                latestAnnouncement: latestAnnouncement
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.staffDashboard = async (req, res, next) => {

    try {

        validateRequest(req);

        const latestEvent = await EventListing.find({ barangay: req.query.barangay }).sort({ _id: -1 }).limit(5);
        const latestAnnouncement = await Announcement.find({ barangay: req.query.barangay }).sort({ _id: -1 }).limit(5);

        res.status(200).send({
            message: "Staff dashboard data.",
            payload: {
                latest_announcement: latestEvent,
                latestAnnouncement: latestAnnouncement
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.doctorDashbaord = async (req, res, next) => {

    try {

        validateRequest(req);

        const distictCitizenRegisteredForm = await MedicalRecords.find({ barangay: req.query.barangay }).distinct("email");
        const totalBarangayMedicalRecord = await MedicalRecords.find({ barangay: req.query.barangay }).count();
        const totalBarangayUsers = await Users.find({ barangay: req.query.barangay }).count();
        const latestEvent = await EventListing.find({ barangay: req.query.barangay }).sort({ _id: -1 }).limit(5);
        const latestAnnouncement = await Announcement.find({ barangay: req.query.barangay }).sort({ _id: -1 }).limit(5);

        res.status(200).send({
            message: "Doctor dashboard data.",
            payload: {
                unique_citizen_medical_record: distictCitizenRegisteredForm.length,
                barangay_users: totalBarangayUsers,
                barangay_medical_records: totalBarangayMedicalRecord,
                latest_announcement: latestEvent,
                latestAnnouncement: latestAnnouncement
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};

exports.nurseDashboard = async (req, res, next) => {

    try {

        validateRequest(req);

        const distictCitizenRegisteredForm = await MedicalRecords.find({ barangay: req.query.barangay }).distinct("email");
        const totalBarangayMedicalRecord = await MedicalRecords.find({ barangay: req.query.barangay }).count();

        res.status(200).send({
            message: "Nurse dashboard data.",
            payload: {
                unique_citizen_medical_record: distictCitizenRegisteredForm.length,
                barangay_medical_records: totalBarangayMedicalRecord
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};