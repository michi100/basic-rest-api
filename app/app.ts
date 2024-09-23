import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
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
app.get('/api/v1/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

// Get all users
app.get('/api/v1/users', (req: Request, res: Response) => {
  const db = new sqlite3.Database(dbPath);
  db.all(
    `
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users;
    `,
    (err: Error | null, rows: any) => {
      res.json(rows);
    }
  );
  db.close();
});

// Get a user
app.get('/api/v1/users/:id', (req: Request, res: Response) => {
  const db = new sqlite3.Database(dbPath);
  const id = req.params.id;
  db.get(
    `
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users
    WHERE id = ${id};
    `,
    (err: Error | null, row: any) => {
      if (!row) {
        res.status(404).send({ error: 'Not Found...' });
      } else {
        res.json(row);
      }
    }
  );
  db.close();
});

// Get following users
app.get('/api/v1/users/:id/following', (req: Request, res: Response) => {
  const db = new sqlite3.Database(dbPath);
  const id = req.params.id;
  db.all(
    `
    SELECT *
    FROM following
    LEFT JOIN users ON following.followed_id = users.id WHERE following_id = ${id};
    `,
    (err: Error | null, rows: any) => {
      if (!rows) {
        res.status(404).send('Not Found...');
      } else {
        res.status(200).json(rows);
      }
    }
  );
  db.close();
});

// Search users matching keyword.
app.get('/api/v1/search', (req: Request, res: Response) => {
  const db = new sqlite3.Database(dbPath);
  const keyword = req.query.q;
  db.all(
    `
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users
    WHERE name LIKE "%${keyword}%";
    `,
    (err: Error | null, rows: any[]) => {
      res.json(rows);
    }
  );
  db.close();
});

const run = async (sql: string, db: sqlite3.Database): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err: Error) => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
};

// Create a new user
app.post('/api/v1/users', async (req: Request, res: Response) => {
  if (!req.body.name || req.body.name === '') {
    res.status(400).send({ error: 'ユーザ名を指定してください。' });
  } else {
    const db = new sqlite3.Database(dbPath);
    const name = req.body.name;
    console.log('req.body: ', req.body);
    const profile = req.body.profile ? req.body.profile : '';
    const dateOfBirth = req.body.date_of_birth ? req.body.date_of_birth : '';

    try {
      await run(
        `INSERT INTO users (name, profile, date_of_birth) VALUES ('${name}', '${profile}', '${dateOfBirth}' )`,
        db
      );
      res.status(201).send({ message: '新規ユーザ作成しました。' });
    } catch (e) {
      res.status(500).send({ error: e });
    }
    db.close();
  }
});

// Update a new user
app.put('/api/v1/users/:id', async (req: Request, res: Response) => {
  if (!req.body.name || req.body.name === '') {
    res.status(400).send({ error: 'ユーザ名を指定してください。' });
  } else {
    const db = new sqlite3.Database(dbPath);
    const id = req.params.id;

    // 現在のユーザ情報を取得する
    db.get(
      `
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users
    WHERE id = ${id};
    `,
      async (err: Error | null, row: any) => {
        if (!row) {
          res.status(404).send({ error: err });
        } else {
          const name = req.body.name ? req.body.name : row.name;
          const profile = req.body.profile ? req.body.profile : row.profile;
          const dateOfBirth = req.body.date_of_birth
            ? req.body.date_of_birth
            : row.date_of_birth;
          try {
            await run(
              `UPDATE users SET name='${name}', profile='${profile}', 'date_of_birth='${dateOfBirth}'
              WHERE id=${id}`,
              db
            );
            res.status(200).send({ message: 'ユーザ情報を更新しました。' });
          } catch (e) {
            res.status(500).send({ error: e });
          }
        }
      }
    );

    db.close();
  }
});

// Delete a new user
app.delete('/api/v1/users/:id', async (req: Request, res: Response) => {
  const db = new sqlite3.Database(dbPath);
  const id = req.params.id;
  // 現在のユーザ情報を取得する
  db.get(
    `
    SELECT
      id,name,profile,created_at,updated_at,date_of_birth
    FROM users
    WHERE id = ${id};
    `,
    async (err: Error | null, row: any) => {
      if (!row) {
        res.status(404).send({ error: err });
      } else {
        try {
          await run(`DELETE FROM users WHERE id='${id}'`, db);
          res.status(200).send({ message: 'ユーザを削除しました。' });
        } catch (e) {
          res.status(500).send({ error: e });
        }
      }
    }
  );
  db.close();
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Listen on port: ' + port);
