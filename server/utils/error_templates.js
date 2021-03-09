/// Error Messages
const isNotTypeErrorMessage = (field, type) =>
  `El parámetro ${field} debe ser un ${type}`;
const isEmptyErrorMessage = (field) =>
  `El parámetro ${field} no puede estar vacío`;
const isRequiredErrorMessage = (field) => `El parámetro ${field} es requerido`;

const maxLengthErrorMessage = (field, maxLength) =>
  `El parámetro ${field} debe tener máximo ${maxLength} carácteres`;
const minLengthErrorMessage = (field, minLength) =>
  `El parámetro ${field} debe tener mínimo ${minLength} carácteres`;

const isNotFormatErrorMessage = (field, format) =>
  `El parámetro ${field} debe tener el formato ${format}`;
const invalidFormatErrorMessage = (field) =>
  `El formato del parámetro ${field} no es valido`;

const notFoundErrorMessage = (field, value) =>
  `El valor ${value} del parámetro ${field} no ha sido encontrado`;
const existsErrorMessage = (field, value) =>
  `El valor ${value} del parámetro ${field} ya existe`;

const invalidPassword = () => `La contraseña es incorrecta`;
const onceParameterRequiredErrorMessage = () =>
  "Es necesario al menos un parámetro";

const isNotInEnumListErrorMessage = (field, enumList) => {
  const enumValues = enumList.reduce((prev, curr, index, arr) => {
    let concatenated = prev + curr;

    if (index != arr.length - 1) {
      concatenated += "|";
    }

    return concatenated;
  }, "");

  return `El parámetro ${field} debe pertenecer a la lista ${enumValues}`;
};

module.exports = {
  isNotTypeErrorMessage,
  isEmptyErrorMessage,
  isRequiredErrorMessage,
  maxLengthErrorMessage,
  minLengthErrorMessage,
  isNotFormatErrorMessage,
  notFoundErrorMessage,
  existsErrorMessage,
  invalidFormatErrorMessage,
  invalidPassword,
  onceParameterRequiredErrorMessage,
  isNotInEnumListErrorMessage,
};
