"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dbPath = 'app/db/database.sqlite3';
// リクエストのbodyをパースする設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// publicフォルダに静的ファイルを置くという設定
app.use(express.static(path.join(__dirname, 'public')));
// hello
app.get('/api/v1/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});
// Get all users
app.get('/api/v1/users', (req, res) => {
    const db = new sqlite3_1.default.Database(dbPath);
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
    const db = new sqlite3_1.default.Database(dbPath);
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
// Search users matching keyword.
app.get('/api/v1/search', (req, res) => {
    const db = new sqlite3_1.default.Database(dbPath);
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
const run = (sql, db, res, message) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            if (err) {
                res.status(500).send(err);
                return reject();
            }
            else {
                res.json({ message: message });
                return resolve();
            }
        });
    });
});
// Create a new user
app.post('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new sqlite3_1.default.Database(dbPath);
    const name = req.body.name;
    console.log('req.body: ', req.body);
    const profile = req.body.profile ? req.body.profile : '';
    const dateOfBirth = req.body.date_of_birth ? req.body.date_of_birth : '';
    yield run(`INSERT INTO users (name, profile, date_of_birth) VALUES ('${name}', '${profile}', '${dateOfBirth}' )`, db, res, '新規ユーザを作成しました。');
    db.close();
}));
// Update a new user
app.put('/api/v1/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new sqlite3_1.default.Database(dbPath);
    const id = req.params.id;
    // 現在のユーザ情報を取得する
    db.get(`
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users
    WHERE id = ${id};
    `, (err, row) => __awaiter(void 0, void 0, void 0, function* () {
        const name = req.body.name ? req.body.name : row.name;
        const profile = req.body.profile ? req.body.profile : row.profile;
        const dateOfBirth = req.body.date_of_birth
            ? req.body.date_of_birth
            : row.date_of_birth;
        yield run(`UPDATE users SET name='${name}', profile='${profile}', 'date_of_birth='${dateOfBirth}'
        WHERE id=${id}`, db, res, `ユーザid:${id}のユーザ情報を更新しました。`);
    }));
    db.close();
}));
// Delete a new user
app.delete('/api/v1/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new sqlite3_1.default.Database(dbPath);
    const id = req.params.id;
    yield run(`DELETE FROM users WHERE id='${id}'`, db, res, `ユーザid:${id}のユーザ情報を削除しました。`);
    db.close();
}));
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listen on port: ' + port);
