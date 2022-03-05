const EventListing = require("../model/eventListing");
const MedicalRecords = require("../model/medicalRecord");

const { generatePhoneNum, generateOutlier } = require("../util/numberHelper");

let randomString = (Math.random() + 1).toString(36).substring(7);
let randomSecondString = (Math.random() + 1).toString(36).substring(7);
let randomThirdString = (Math.random() + 1).toString(36).substring(7);
let randomFourthString = (Math.random() + 1).toString(36).substring(7);
let randomFifthString = (Math.random() + 1).toString(36).substring(7);
let randomSixthString = (Math.random() + 1).toString(36).substring(7);
let randomSeventhString = (Math.random() + 1).toString(36).substring(7);
let randomEightString = (Math.random() + 1).toString(36).substring(7);
let randomNineString = (Math.random() + 1).toString(36).substring(7);
let randomTentString = (Math.random() + 1).toString(36).substring(50);

const generateRandomInt = (n, min) => {
    return (Math.floor(Math.random() * n)) + (min || 0);
}

const createEventListing = () => {
    try {
        // EventListing.create(
        //     {
        //         event: randomString,
        //         description: randomString,
        //         barangay: generateRandomInt(5, 1) / 2 ? "Lumil" : "Puting Kahoy",
        //         requestor: {
        //             first_name: randomString,
        //             last_name: randomString,
        //             email: `${randomString}@gmail.com`,
        //             phone_number: `639${generatePhoneNum()}`,
        //         },
        //         attendee: [
        //             {
        //                 first_name: randomString,
        //                 last_name: randomString,
        //                 email: `${randomString}@gmail.com`,
        //                 phone_number: `639${generatePhoneNum()}`,
        //             }
        //         ],
        //         officials: [
        //             {
        //                 first_name: randomString,
        //                 last_name: randomString,
        //                 email: `${randomString}@gmail.com`,
        //                 phone_number: `639${generatePhoneNum()}`,
        //             }
        //         ],
        //         start_datetime: new Date(),
        //         end_datetime: new Date(),
        //         status: true
        //     }
        // )
    } catch(err) {
        console.log(err);
    };
};

const createMedicalRecord = () => {
    try {
        MedicalRecords.create(
            {
                first_name: randomString,
                last_name: randomSecondString,
                email: `${randomThirdString}@gmai.com`,
                phone_number: `639${generatePhoneNum()}`,
                diagnosis: randomFourthString,
                detailed_report: "Tester",
                outlier: generateOutlier(),
                createdBy: randomFifthString,
                approvedBy: randomSixthString,
                barangay: "Lumil",
                status: true
            }
        )
    } catch(err) {
        console.log(err);
    };
};

module.exports = {
    createEventListing,
    createMedicalRecord
};