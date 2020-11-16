
// Create a n digits Random String
const generateRandomString = (length) => {
    let randomNumber = Math.random().toString(36).substring(2, length + 2);
    return randomNumber.toString();
}

module.exports = {
    generateRandomString
};