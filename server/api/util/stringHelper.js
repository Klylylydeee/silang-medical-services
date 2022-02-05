const lowerCaseString = (string) => {
    return string.toLowerCase();
};
const firstCharacterUppercase = (string) => {
    lowerCaseString(string)
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const fullNameInUpperCase = (firstName, lastName) => {
    return `${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`;
};

const removeUnderscores = (paramString) => {
    return paramString.replace("_", " ");
};

module.exports = { lowerCaseString, firstCharacterUppercase, fullNameInUpperCase, removeUnderscores };