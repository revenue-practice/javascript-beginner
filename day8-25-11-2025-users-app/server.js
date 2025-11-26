const express = require('express');
const { Pool } = require('pg');
const { isValidValue, isValidInteger } = require('./helper');
const app = express();

const pool = new Pool({
    user: 'postgres',
    database: 'day8_25_11_2025_todo_app',
    host: 'localhost',
    password: 'sql',
    port: 5432,
    ssl: false,
});

app.use(express.json());

const PORT = 3003;
const usersDB = 'users';

app.post('/user', async (req, res) => {
    const { name: fName, email, age } = req.body;
    const queryString = `INSERT INTO ${usersDB} (name, email, age) VALUES ($1, $2, $3)`;
    const queryParams = [fName, email, age];

    try {
        await pool.query(queryString, queryParams);

        res.status(201).json({
            fName: fName,
            email: email,
            age: age,
            message: 'Data inserted successfully'
        });
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.get('/users', async (req, res) => {
    try {
        const queryString = `SELECT name, email, age FROM ${usersDB} LIMIT 10`;
        const result = await pool.query(queryString);

        const sanitisedResult = result.rows.map((val) => {
            return {
                fName: val.name,
                email: val.email,
                age: val.age
            }
        });

        res.status(200).json(sanitisedResult);
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.get('/users/:email', async (req, res) => {
    try {
        const queryString = `SELECT name, age FROM ${usersDB} where email = $1 LIMIT 1`;
        const result = await pool.query(queryString, [req.params.email]);
        
        if(result.rows.length) {
            return res.status(200).json(result.rows[0]);
        }
        res.status(404).send('No user found');
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.put('/users/:email', async (req, res) => {
    try {
        const { name: fName, age: uAge } = req.body;

        let baseQueryString = `UPDATE ${usersDB} SET `;
        let counterParam = 1, queryParams = [];

        if(isValidValue(fName)) {
            baseQueryString += `name = $${counterParam}, `;
            counterParam += 1; queryParams.push(fName);
        }
        if(isValidInteger(uAge)) {
            baseQueryString += `age = $${counterParam} `;
            counterParam += 1; queryParams.push(uAge);
        }

        baseQueryString += `WHERE email = $${counterParam}`;

        if(isValidValue(req.params.email)) queryParams.push(req.params.email);
        const result = await pool.query(baseQueryString, queryParams);
        
        if(result.rowCount) {
            return res.status(200).json('Record updated');
        }
        res.status(404).send('No user found');
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.delete('/users/:email', async (req, res) => {
    try {
        const queryString = `DELETE FROM ${usersDB} where email = $1`;
        const result = await pool.query(queryString, [req.params.email]);
        
        if(result.rowCount) {
            return res.status(200).json('Record deleted successfully');
        }
        res.status(404).send('No user found');
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server connected on PORT ${PORT}`);
});