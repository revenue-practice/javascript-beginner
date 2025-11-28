const isValidValue = (value) => {
    return value !== null && value !== null;
};

const isValidInteger = (value) => {
    return isValidValue(value) && typeof value === 'number' && value !== NaN;
};

module.exports = {
    isValidValue, 
    isValidInteger
}