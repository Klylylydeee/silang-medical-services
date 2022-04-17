const EventListing = require("../model/eventListing");
const MedicalRecords = require("../model/medicalRecord");
const moment = require("moment");
const momentRandom = require('moment-random');

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

const generateRandomGender = (n) => {
    let ranNum = generateRandomInt(2, 0);
    return ranNum === 0 ? "Male" : ranNum === 1 ? "Female" : "Others"
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

const createMedicalRecord = async () => {
    try {
        const commonIllness = [
            "Allergies",
            "Cold",
            "Flu",
            "Diarrhea",
            "Headaches",
            "Stomach Aches",
            "Chickenpox",
            "Sore Throat"
        ]
        const names = ["Annie", "Aña", "Asta", "Christian", "David", "Juan", "Julius", "Karlito", "Kenneth", "Lily", "Maria", "Noelle", "Ryan", "Yami", "Vanessa", "William", "Marie", "Klaus", "Finral", "Leopold", "Gordon", "Rob", "Kurtis", "Simon", "Kyle", "Theresa", "Charlotte", "Selena", "Dorothy", "Francis", "Eric", "Jack", "Willie", "Nacht", "Zora", "Grey", "Nash", "Ellen", "Rebecca", "Marco"];
        const lnames = ["Batongbakal", "Hermosada", "Kinikilingan", "Tarambulo", "Ilungga", "De Empanada", "De La Cruz", "Daanghari", "Ramos", "Kartita", "Delos Reyes", "Bautista", "Montoya", "Mendillo", "Dangcolis", "Dela Cruz", "De Leon", "Guevarra", "Hallare", "Espinoza", "Garcia", "Mendoza", "Santos", "Villanueva", "Flores", "Fernandez", "Gonzales", "de Guzman", "Castillo", "Fransisco", "Rivera", "Perez", "Lopez", "Rodriguez", "Santiago", "Tolentino", "Valdez", "Morales", "Ramirez", "Diaz", "Manalo", "Corpuz", "Gomez", "Alvarez", "Jimenes", "Rosales", "Evangelista", "Agustin", "Ocampo", "Alcantara", "Romero", "Padilla", "Ignacio", "Legaspi", "Gonzaga", "Fajardo", "Peralta", "Chavez", "Medina", "Estrada"]
        // MedicalRecords.create(
        //     {
        //         first_name: randomString,
        //         last_name: randomSecondString,
        //         email: `${randomThirdString}@gmai.com`,
        //         phone_number: `639${generatePhoneNum()}`,
        //         diagnosis: randomFourthString,
        //         detailed_report: "Tester",
        //         outlier: generateOutlier(),
        //         createdBy: randomFifthString,
        //         approvedBy: randomSixthString,
        //         barangay: "Lumil",
        //         status: true
        //     }
        // )
        const firstFName = generateRandomInt(39, 1)
        const firstLName = generateRandomInt(59, 1)
        const firstDOB = moment(momentRandom("2015-04-15", "1980-01-01")).utc("Asia/Singapore").format();
        const firstDiagnosis = commonIllness[generateRandomInt(7, 0)];
        const secondFName = generateRandomInt(39, 1)
        const secondLName = generateRandomInt(59, 1)
        const secodDOB = moment(momentRandom("2015-04-15", "1980-01-01")).utc("Asia/Singapore").format();
        const secodDiagnosis = commonIllness[generateRandomInt(7, 0)];
        const thirdFName = generateRandomInt(39, 1)
        const thirdLName = generateRandomInt(59, 1)
        const thirdDOB = moment(momentRandom("2015-04-15", "1980-01-01")).utc("Asia/Singapore").format();
        const thirdDiagnosis = commonIllness[generateRandomInt(7, 0)];
        const diagnosisData = (user, n) => {
            let data = `Based on the characteristic appearance of ${user}, a diagnosis of ${n} can be observed. Symptos like sneezing, watery eyes, nasal stuffiness, and chills also signifies and verifies this diagnosis. Urget intake of prescribe medications is needed. 
            
            It is recommended for this citizen to return after a few days of taking their medicine to further identify the next steps needed for her/him to be cured.`
            return data
        }
        const medicineList = [
            "Synthroid",
            "Crestor",
            "Nexium",
            "Humira",
            "Abilify",
            "Crestor",
        ]
        const amount = [
            "15mg",
            "5mg",
            "10mg"
        ]
        const randomMedicine = () => {
            const ranNum = generateRandomInt(3, 1);
            const random = () => {
                return Math.floor(Math.random() * 5);
            }
            const random2 = () => {
                return Math.floor(Math.random() * 3);
            }
            let prescription = [];
            for (let i = 1; i <= ranNum; i++) {
                let num = prescription.map((data) => {
                    return data.prescription
                }).indexOf(medicineList[random()]);
                if(num === -1){
                    prescription.push({
                        prescription: medicineList[random()],
                        dosage: amount[random2()],
                    })
                }
            }
            return prescription
        }; 
        // let getData = await MedicalRecords.find().select({ _id: 1 });
        // let ids = getData.map((data) => data._id.toString() );
        // for(const data of ids){
        //     const randomSelect = () => Math.floor(Math.random() * data.length);
        //     await MedicalRecords.findOneAndUpdate({ _id: data }, { $set: { pin: `${data[randomSelect()]}${data[randomSelect()]}${data[randomSelect()]}${data[randomSelect()]}${data[randomSelect()]}${data[randomSelect()]}` }})
        // }
        // MedicalRecords.insertMany([
        //     {
        //         first_name: names[firstFName],
        //         last_name: lnames[firstLName],
        //         email: `${names[firstFName]}${lnames[firstLName].split(" ").join("")}${firstFName}@${firstLName % 2 ? "gmail.com" : "yahoo.com"}`,
        //         phone_number: `639${generatePhoneNum()}`,
        //         diagnosis: firstDiagnosis,
        //         detailed_report: diagnosisData(`${names[firstFName]} ${lnames[firstLName]}`, firstDiagnosis),
        //         outlier: generateOutlier(),
        //         createdBy: firstLName % 2 ? "Noelle Delos Reyes (Nurse)" : "Aña Hermosada (Doctor)",
        //         ...(firstLName % 2 ? { }  : {approvedBy: "Aña Hermosada (Doctor)"}),
        //         ...(firstLName % 2 ? { }  : {prescription: randomMedicine()}),
        //         barangay: "Lumil",
        //         gender: generateRandomGender(),
        //         address: `Purok ${generateRandomInt(5, 1)}, ${generateRandomInt(300, 1)} Lumil, Silang, Cavite 4118`,
        //         date_of_birth: firstDOB,
        //         age: moment().diff(moment(firstDOB).format("YYYY-MM-DD"), 'years', false),
        //         status: firstLName % 2 ? false : true,
        //         request_change: generateRandomInt(100, 1) < 35 ? true : false
        //     },
        //     {
        //         first_name: names[secondFName],
        //         last_name: lnames[secondLName],
        //         email: `${names[secondFName]}${lnames[secondLName].split(" ").join("")}${secondFName}@${secondLName % 2 ? "gmail.com" : "yahoo.com"}`,
        //         phone_number: `639${generatePhoneNum()}`,
        //         diagnosis: secodDiagnosis,
        //         detailed_report: diagnosisData(`${names[secondFName]} ${lnames[secondLName]}`, secodDiagnosis),
        //         outlier: generateOutlier(),
        //         createdBy: secondLName % 2 ? "Noelle Delos Reyes (Nurse)" : "Aña Hermosada (Doctor)",
        //         ...(secondLName % 2 ? { } : {approvedBy: "Aña Hermosada (Doctor)"}),
        //         ...(secondLName % 2 ? { }  : {prescription: randomMedicine()}),
        //         barangay: "Lumil",
        //         gender: generateRandomGender(),
        //         address: `Purok ${generateRandomInt(5, 1)}, ${generateRandomInt(300, 1)} Lumil, Silang, Cavite 4118`,
        //         date_of_birth: secodDOB,
        //         age: moment().diff(moment(secodDOB).format("YYYY-MM-DD"), 'years', false),
        //         status: secondLName % 2 ? false : true,
        //         request_change: generateRandomInt(100, 1) < 35 ? true : false
        //     },
        //     {
        //         first_name: names[thirdFName],
        //         last_name: lnames[thirdLName],
        //         email: `${names[thirdFName]}${lnames[thirdLName].split(" ").join("")}${thirdFName}@${thirdLName % 2 ? "gmail.com" : "yahoo.com"}`,
        //         phone_number: `639${generatePhoneNum()}`,
        //         diagnosis: thirdDiagnosis,
        //         detailed_report: diagnosisData(`${names[thirdFName]} ${lnames[thirdLName]}`, thirdDiagnosis),
        //         outlier: generateOutlier(),
        //         createdBy: thirdLName % 2 ? "Noelle Delos Reyes (Nurse)" : "Aña Hermosada (Doctor)",
        //         ...(thirdLName % 2 ? { } : {approvedBy: "Aña Hermosada (Doctor)"}),
        //         ...(thirdLName % 2 ? { }  : {prescription: randomMedicine()}),
        //         barangay: "Lumil",
        //         gender: generateRandomGender(),
        //         address: `Purok ${generateRandomInt(5, 1)}, ${generateRandomInt(300, 1)} Lumil, Silang, Cavite 4118`,
        //         date_of_birth: thirdDOB,
        //         age: moment().diff(moment(thirdDOB).format("YYYY-MM-DD"), 'years', false),
        //         status: thirdLName % 2 ? false : true,
        //         request_change: generateRandomInt(100, 1) < 35 ? true : false
        //     }
        // ])
    } catch(err) {
        console.log(err);
    };
};

module.exports = {
    createEventListing,
    createMedicalRecord
};