// Generates a 6 digit number for the user pin confirmation
const generatePin = () => {
    return Math.floor(
        Math.random() * (
            9 * (Math.pow(10, 5))
        )
    ) + (Math.pow(10, 5));
}

module.exports = { generatePin };