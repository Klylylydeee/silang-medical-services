// NPM Dependencies
import moment from "moment";

// Returns the string value of a datetime value
export const monthFormat = ( monthInNumber ) => {
    return moment(monthInNumber).format("MMM")
}

// Returns the string value of a datetime in Month Day, Year format
export const monthDateYearFormat = ( dateTimeVariable ) => {
    return moment(dateTimeVariable).format("MMMM DD, YYYY");
}

// Returns a number value based on the js date from a string month
export const textToNumberMonth = ( textMonth ) => {
    switch(textMonth) {
        case "January":
            return 0
        case "February":
            return 1
        case "March":
            return 2
        case "April":
            return 3
        case "May":
            return 4
        case "June":
            return 5
        case "July":
            return 6
        case "August":
            return 7
        case "September":
            return 8
        case "October":
            return 9
        case "November":
            return 10
        case "December":
            return 11
        default: 
            return 0
    }
}