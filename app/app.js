"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const dbPath = 'app/db/database.sqlite3';
// hello
app.get('/api/v1/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});
// Get all users
app.get('/api/v1/users', (req, res) => {
    const db = new sqlite3.Database(dbPath);
    db.all(`
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users;
    `, (err, rows) => {
        res.json(rows);
    });
    db.close();
});
// Get a user
app.get('/api/v1/users/:id', (req, res) => {
    const db = new sqlite3.Database(dbPath);
    const id = req.params.id;
    db.get(`
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users
    WHERE id = ${id};
    `, (err, row) => {
        res.json(row);
    });
    db.close();
});
// Search users matching keyword
app.get('/api/v1/search', (req, res) => {
    const db = new sqlite3.Database(dbPath);
    const keyword = req.query.q;
    db.all(`
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users
    WHERE name LIKE "%${keyword}%";
    `, (err, rows) => {
        res.json(rows);
    });
    db.close();
});
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listen on port: ' + port);
