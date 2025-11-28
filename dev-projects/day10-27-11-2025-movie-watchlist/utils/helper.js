const { statusCodes } = require('./constants');

const isEitherUndefinedOrNull = (val) => val === undefined || val === null;
const isNeitherUndefinedNorNull = (val) => val !== undefined && val !== null;
const isEmptyString = (val) => typeof val === 'string' && val === "";
const isValidString = (val) => typeof val === 'string' && val !== "" && isNeitherUndefinedNorNull(val);
const isNumericString = (val) => (typeof val === 'string' || typeof val === 'number') && Number(val) !== NaN;
const isValidInteger = (val) => typeof val === 'number' && val !== NaN && isNeitherUndefinedNorNull(val);
const errorResponse = (res, message) => res.status(500).json({
    message: isNeitherUndefinedNorNull(message) ? message : statusCodes['500']
});

module.exports = {
    isEitherUndefinedOrNull,
    isNeitherUndefinedNorNull,
    isEmptyString,
    isValidString,
    isNumericString,
    isValidInteger,
    errorResponse
};