# 技術スタック

- Express
  - Node.js の Web アプリフレームワーク
- sqlite3
  - RDB
- body-parser
  - HTML フォームから送信された値をパース
- node-dev
  - ファイル編集を検知してサーバ再起動（ホットリロード）

# コマンドメモ

- curl http://localhost:3000/api/v1/hello -v
- npx gitignore node

```CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  profile TEXT,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  date_of_birth TEXT
  );
```

```
INSERT INTO users (name,profile) VALUES ("tarou", "I am Tarou.")
```

# 参考

- Re: ゼロから始める Web API 入門【実践編】
- Web を支える技術 -HTTP、URI、HTML、そして REST

```

```
