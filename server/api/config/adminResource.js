const Users = require("../model/userAccount");
const Announcement = require("../model/announcement");
const EventListing = require("../model/eventListing");
const MedicalRecords = require("../model/medicalRecord");
const ErrorLogs = require("../model/errorLogs");
const AnalyticComment = require("../model/analyticComment");
const SubscribedCitizen = require("../model/subscribedCitizen");
const MessageLogs = require("../model/messageLog");
const AccessRecord = require("../model/publicAccess");
const Activity = require("../model/activityLog");
const RecordLog = require("../model/exportRecord");

const UserResourceOptions = {
    resource: Users,
    options: {
        listProperties: [
            "first_name",
            "last_name",
            "barangay",
            "designation"
        ]
    }
};

const AnnouncementResourceOptions = {
    resource: Announcement,
    options: {
        listProperties: [
            "announcement",
            "message",
            "barangay",
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

const ErroresourceOptions = {
    resource: ErrorLogs,
    options: {
        listProperties: [
            "timestamp",
            "level",
            "message"
        ]
    }
};

const CommentssourceOptions = {
    resource: AnalyticComment,
    options: {
        listProperties: [
            "barangay",
            "comment",
            "month",
            "year",
        ]
    }
};

const SubscribedsourceOptions = {
    resource: SubscribedCitizen,
    options: {
        listProperties: [
            "first_name",
            "last_name",
            "email",
            "phone_number"
        ]
    }
};

const MessagesourceOptions = {
    resource: MessageLogs,
    options: {
        listProperties: [
            "receiver_user_id",
            "subject",
            "message"
        ]
    }
};

const AccessRecordOptions = {
    resource: AccessRecord,
    options: {
        listProperties: [
            "email",
            "phone_number",
            "barangay"
        ]
    }
};

const ActivityOptions = {
    resource: Activity,
    options: {
        listProperties: [
            "path",
            "type",
            "httpMethod",
            "ipSource"
        ]
    }
};

const ExportRecordResoureOption = {
    resource: RecordLog,
    options: {
        listProperties: [
            "first_name",
            "last_name",
            "designation",
            "createdAt"
        ]
    }
};

module.exports = {
    UserResourceOptions,
    AnnouncementResourceOptions,
    EventResourceOptions,
    RecordsResourceOptions,
    ErroresourceOptions,
    CommentssourceOptions,
    SubscribedsourceOptions,
    MessagesourceOptions,
    AccessRecordOptions,
    ActivityOptions,
    ExportRecordResoureOption
}