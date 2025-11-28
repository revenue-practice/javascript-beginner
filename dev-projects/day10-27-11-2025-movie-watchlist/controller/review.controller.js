const pool = require("../models/connection");
const { dbTables } = require("../utils/constants");
const { isValidString, isValidInteger } = require("../utils/helper");
const { statusCodes } = require("../utils/constants");

const addReview = async (req, res) => {
    const id = req.params.id;
    const { rating, comment } = req.body;

    try {
        const query = `SELECT title, year FROM ${dbTables.movies} WHERE id = $1`;
        const result = await pool.query(query, [id]);

        if(!result.rowCount) return res.status(404).json({
            message: `Movie not found`
        });

        let editQuery = `UPDATE ${dbTables} SET `;
        const queryParams = [];
        if(isValidString(comment)) {
            editQuery += ` comment = array_append(comment, $1), `;
            queryParams.push(comment);
        }
        if(isValidInteger(rating)) {
            if(queryParams.length) editQuery += `rating = array_append(rating, $2), updated_at = $3`;
            else editQuery += ` rating = array_append(rating, $1), updated_at = $2`;
            queryParams.push(rating);
        }
        else {
            if(queryParams.length) editQuery += `updated_at = $2`;
            else return res.status(204).json({
                message: `Comment and rating are invalid`
            });
        }
        queryParams.push(new Date().toISOString());
        
        const data = await pool.query(editQuery, queryParams);
        if(data.rowCount) res.status(201).send(`Review added`);
        else res.status(500).send(statusCodes[500]);
    }
    catch (error) {
        errorResponse(res, error?.message);
    }
};

const fetchReview = async (req, res) => {
    const id = req.params.id;
    const query = `SELECT rating, comment FROM ${dbTables.movies} WHERE id = $1 LIMIT 100`;
    try {
        const result = await pool.query(query, [id]);
        if(result.rowCount) res.status(200).json(query);
        else res.status(200).json({
            message: `No review exists, wrong ID`
        });
    }
    catch (error) {
        errorResponse(res, error?.message);
    }
};

const deleteReview = async (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM ${dbTables.movies} WHERE id = $1 LIMIT 100`;
    try {
        const result = await pool.query(query, [id]);
        if(result.rowCount) res.status(200).json({
            message: `Review delete`
        });
        else res.status(200).json({
            message: `Operation failed, wrong ID`
        });
    }
    catch (error) {
        errorResponse(res, error?.message);
    }
};

module.exports = {
    addReview,
    fetchReview,
    deleteReview
};