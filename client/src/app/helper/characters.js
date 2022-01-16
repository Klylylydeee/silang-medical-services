// Receives a string parameter then returns it with an Uppercased first character
export const firstCharacterUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
