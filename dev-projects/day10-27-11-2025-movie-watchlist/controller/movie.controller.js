const { suffixMessages, dbTables, statusCodes } = require('../utils/constants');
const { isValidString, isNumericString, errorResponse, isEitherUndefinedOrNull } = require('../utils/helper');
const pool = require('../models/connection');

const addMovie = async (req, res) => {
    try {
        const { title, year } = req.body;
        if (!isValidString(title)) {
            return res.status(200).json({
                message: `title${suffixMessages['required']}`,
            });
        }
        const sanitiseYear = !isNumericString(year) ? "" : year.toString();

        const query = `INSERT INTO ${dbTables.movies} (title, year, created_at, updated_at) VALUES ($1, $2, $3, $4)`;
        const queryParams = [title, sanitiseYear, new Date().toISOString(), new Date().toISOString()];

        const result = await pool.query(query, queryParams);
        if (result.rowCount) {
            return res.status(201).json({
                title: title,
                year: sanitiseYear,
                message: `${statusCodes['201']}${suffixMessages.record}`,
            });
        }

        res.status(500).send(`${statusCodes['500']}`);
    }
    catch (error) {
        errorResponse(res, error?.message);
    }
};

const fetchMovies = async (req, res) => {
    try {
        const query = `SELECT title, year FROM ${dbTables.movies} ORDER BY TITLE LIMIT 10`;
        const result = await pool.query(query);

        return res.status(200).json(result.rows);
    }
    catch (error) {
        errorResponse(res, error?.message);
    }
};

const fetchMovieById = async (req, res) => {
    const id = req.params.id;
    if (isEitherUndefinedOrNull(id)) return res.status(404).json({ message: statusCodes[404] });

    try {
        const query = `SELECT title, year FROM ${dbTables.movies} WHERE id = $1`;
        const result = await pool.query(query, [id]);

        res.status(200).json(result.rows.length > 0 ? result.rows : {
            message: statusCodes[404]
        });
    }
    catch (error) {
        errorResponse(res, error?.message);
    }
};

const updateMovieById = async (req, res) => {
    const id = req.params.id;
    const { title, year } = req.body;
    if (isEitherUndefinedOrNull(id)) return res.status(404).json({ message: statusCodes[404] });

    let paramsCount = 2, baseQuery = `UPDATE ${dbTables.movies} SET updated_at = $1`;
    if(isValidString(title)) {
        baseQuery += `, title = $${paramsCount}`;
        paramsCount += 1;
    }
    if(isNumericString(year)) {
        baseQuery += `, year = $${paramsCount}`;
        paramsCount += 1;
    }
    baseQuery += ` WHERE id = $${paramsCount}`;

    try {
        const result = await pool.query(baseQuery, [new Date().toISOString(), title, year, id]);
        if(result.rowCount) {
            return res.send(200).json({
                message: `Content modified`
            });
        }
        return res.status(200).json({
            message: `Content not modified`
        });
    }
    catch (error) {
        errorResponse(res, error?.message);
    }
};

const deleteMovieById = async (req, res) => {
    const id = req.params.id;
    if (isEitherUndefinedOrNull(id)) return res.status(404).json({ message: statusCodes[404] });

    const baseQuery = `DELETE FROM ${dbTables.movies} WHERE id = $1`;
    try {
        const result = await pool.query(baseQuery, [id]);
        if(result.rowCount) {
            return res.send(200).json({
                message: `Content deleted`
            });
        }
        return res.status(200).json({
            message: `Content not deleted`
        });
    }
    catch (error) {
        errorResponse(res, error?.message);
    }
};

module.exports = {
    addMovie,
    fetchMovies,
    fetchMovieById,
    updateMovieById,
    deleteMovieById,
}