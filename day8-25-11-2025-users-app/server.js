const express = require('express');
const { Pool } = require('pg');
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
        const queryString = `SELECT (name, email, age) FROM ${usersDB} LIMIT 10`;
        const result = await pool.query(queryString);

        // const sanitiseResult = result.map((val) => {
        //     return {
        //         fName: val.name,
        //         email: val.email,
        //         age: val.age
        //     }
        // });

        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const queryString = `SELECT * FROM ${usersDB} where email = $1 RETURNING (name, age) LIMIT 1`;
        const result = await pool.query(queryString, [req.params.id]);
        
        if(result.rows.length) {
            return res.status(200).json(result);
        }
        res.status(404).send('No user found');
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

/*
app.put('/users/:id', async (req, res) => {
    try {
        const queryString = `UPDATE  ${usersDB} where id = $1 RETURNING (name, email, age) LIMIT 1`;
        const result = await pool.query(queryString, [req.params.id]);
        
        if(result.rows.length) {
            return res.status(200).json(result);
        }
        res.status(404).send('No user found');
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const queryString = `SELECT * FROM ${usersDB} where id = $1 RETURNING (name, email, age) LIMIT 1`;
        const result = await pool.query(queryString, [req.params.id]);
        
        if(result.rows.length) {
            return res.status(200).json(result);
        }
        res.status(404).send('No user found');
    }
    catch (error) {
        res.status(500).send('Internal server error');
    }
});
*/

app.listen(PORT, () => {
    console.log(`Server connected on PORT ${PORT}`);
});