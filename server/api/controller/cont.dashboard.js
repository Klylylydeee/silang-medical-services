const Announcement = require("../model/announcement");
const AnalyticComments = require("../model/analyticComment");
const EventListing = require("../model/eventListing");
const MedicalRecords = require("../model/medicalRecord");
const Users = require("../model/userAccount");

const { validateRequest } = require("../util/jsonValidate");

exports.mainDashboard = async (req, res, next) => {

    try {

        validateRequest(req);
        
        const distictCitizenRegisteredForm = await MedicalRecords.find({ barangay: req.query.barangay, status: true }).distinct("email").count();
        const totalBarangayMedicalRecord = await MedicalRecords.find({ barangay: req.query.barangay, status: true }).count();
        const totalBarangayUsers = await Users.find({ barangay: req.query.barangay, status: true }).count();
        const totalEventListing = await EventListing.find({ barangay: req.query.barangay, status: true }).count();
        const totalAnnouncement = await Announcement.find({ barangay: req.query.barangay, status: true }).count();
        const totalAnnouncementComments = await AnalyticComments.find({ barangay: req.query.barangay, status: true }).count();
        const latestEvent = await EventListing.find({ barangay: req.query.barangay, status: true }).sort({ _id: -1 }).limit(5);
        const latestAnnouncement = await Announcement.find({ barangay: req.query.barangay, status: true }).sort({ _id: -1 }).limit(5);
        const latestPatient = await MedicalRecords.find({ barangay: req.query.barangay, status: true}).sort({ _id: -1 }).limit(5);

        res.status(200).send({
            message: "Default dashboard data.",
            payload: {
                table: [
                    {
                        title: "Barangay Users",
                        count: totalBarangayUsers
                    },
                    {
                        title: "Registered Citizens (Email)",
                        count: distictCitizenRegisteredForm
                    },
                    {
                        title: "Medical Records",
                        count: totalBarangayMedicalRecord
                    },
                    {
                        title: "Event Listing",
                        count: totalEventListing
                    },
                    {
                        title: "Announcements",
                        count: totalAnnouncement
                    },
                    {
                        title: "Analytics Comments",
                        count: totalAnnouncementComments
                    },
                ],
                events: latestEvent,
                announcements: latestAnnouncement,
                records: latestPatient
            }
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

}

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