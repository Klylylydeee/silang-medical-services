import moment from "moment";

// Returns the string value of a datetime value
export const monthFormat = ( monthInNumber ) => {
    return moment(monthInNumber).format("MMM")
}

// Returns the string value of a datetime in Month Day, Year format
export const monthDateYearFormat = ( dateTimeVariable ) => {
    return moment(dateTimeVariable).format("MMMM DD, YYYY");
}