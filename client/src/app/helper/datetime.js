import moment from "moment";

export const monthFormat = ( monthInNumber ) => {
    return moment(monthInNumber).format("MMM")
}

export const monthDateYearFormat = ( dateTimeVariable ) => {
    return moment(dateTimeVariable).format("MMMM DD, YYYY");
}