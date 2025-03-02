const express = require('express');
const db = require('./db');
const app = express();

app.get('/data', (req, res) => {
    db.all('SELECT * FROM table_name', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.listen(3000, () => console.log('API running on http://localhost:8080'));
