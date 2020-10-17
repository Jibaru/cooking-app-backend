/// Error Messages
const isNotTypeErrorMessage = (field, type) => `El parámetro ${field} debe ser un ${type}`
const isEmptyErrorMessage = field => `El parámetro ${field} no puede estar vacío`;
const isRequiredErrorMessage = field => `El parámetro ${field} es requerido`;

const maxLengthErrorMessage = (field, maxLength) => `El parámetro ${field} debe tener máximo ${maxLength} carácteres`
const minLengthErrorMessage = (field, minLength) => `El parámetro ${field} debe tener mínimo ${minLength} carácteres`

module.exports = {
    isNotTypeErrorMessage,
    isEmptyErrorMessage,
    isRequiredErrorMessage,
    maxLengthErrorMessage,
};