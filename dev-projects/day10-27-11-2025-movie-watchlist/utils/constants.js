const statusCodes = {
    '200': 'Ok',
    '201': 'Created',
    '202': 'Accepted',
    '304': 'Not modified',
    '403': 'Forbidden access',
    '404': 'Not Found',
    '500': 'Internal Server Error'
};

const suffixMessages = {
    'required': ' is required!',
    'record': ' record successfully',
};

const dbTables = {
    movies: 'MOVIES',
};

module.exports = {
    statusCodes,
    suffixMessages,
    dbTables,
};