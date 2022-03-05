const moment = require("moment");

const dateDayToSuffixString = (day) => {
    let suffix = ["th", "st", "nd", "rd"];
    let estimateDay = day % 100;
    return day + (suffix[(estimateDay - 20) % 10] || suffix[estimateDay] || suffix[0]);
};

const monthToNumber = (month) => {
    switch(month){
        case "January":
            return `01`
        case "February":
            return `02`
        case "March":
            return `03`
        case "April":
            return `04`
        case "May":
            return `05`
        case "June":
            return `06`
        case "July":
            return `07`
        case "August":
            return `08`
        case "September":
            return `09`
        case "October":
            return 10
        case "November":
            return 11
        case "December":
            return 12
        default:
            return 0
    }
}

const getDayOfDate = (month, day, year) => {
    let getDay = moment(`${month} ${day},${year}`, "MMM DD, YYYY").day();
    switch(getDay){
        case 1:
            return "Lunes"
        case 2:
            return "Martes"
        case 3:
            return "Miyerkules"
        case 4:
            return "Huwebes"
        case 5:
            return "Biyernes"
        case 6:
            return "Sabado"
        case 7:
            return "Linggo"
    }
}

module.exports = { dateDayToSuffixString, monthToNumber, getDayOfDate };