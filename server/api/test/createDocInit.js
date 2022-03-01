const EventListing = require("../model/eventListing");

const { generatePhoneNum } = require("../util/numberHelper");

let randomString = (Math.random() + 1).toString(36).substring(7);

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

module.exports = createEventListing;