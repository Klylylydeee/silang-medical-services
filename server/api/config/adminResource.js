const Users = require("../model/userAccount");
const Announcement = require("../model/announcement");
const EventListing = require("../model/eventListing");
const MedicalRecords = require("../model/medicalRecord");

const UserResourceOptions = {
    resource: Users,
    options: {
        listProperties: [
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "barangay",
            "designation"
        ]
    }
};

const AnnouncementResourceOptions = {
    resource: Announcement,
    options: {
        listProperties: [
            "barangay",
            "announcement",
            "description",
            "status"
        ]
    }
};

const EventResourceOptions = {
    resource: EventListing,
    options: {
        listProperties: [
            "barangay",
            "event",
            "description",
            "status"
        ]
    }
};

const RecordsResourceOptions = {
    resource: MedicalRecords,
    options: {
        listProperties: [
            "first_name",
            "last_name",
            "diagnosis",
            "outlier"
        ]
    }
};

module.exports = {
    UserResourceOptions,
    AnnouncementResourceOptions,
    EventResourceOptions,
    RecordsResourceOptions
}