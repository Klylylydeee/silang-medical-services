// Generates a 6 digit number for the user pin confirmation
const generatePin = () => {
    return Math.floor(
        Math.random() * (
            9 * (Math.pow(10, 5))
        )
    ) + (Math.pow(10, 5));
}
const generatePhoneNum = () => {
    return Math.floor(
        Math.random() * (
            9 * (Math.pow(10, 8))
        )
    ) + (Math.pow(10, 8));
}

module.exports = { generatePin, generatePhoneNum };