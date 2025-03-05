const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to SQLite database.');
});

// Create users table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        receiver TEXT NOT NULL,
        message TEXT NOT NULL,
        amount INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS payouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        receiver TEXT NOT NULL,
        amount INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        status INTEGER NOT NULL DEFAULT 0
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS balance ( 
        user_id INTEGER NOT NULL UNIQUE,
        balance INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );`);

    db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        status TEXT CHECK(status IN ('unread', 'read')) NOT NULL DEFAULT 'unread',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
    `)
});

// Register endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password],
        function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint')) {
                    return res.status(400).send('Username or email already exists');
                }
                return res.status(500).send('Database error');
            }

            // Create balance entry
            const userId = this.lastID;
            db.run(`INSERT INTO balance (user_id, balance) VALUES (?, 0)`, [userId], (err) => {
                if (err) {
                    console.error('Balance insert error:', err);
                }
            });

            res.status(201).send('User registered successfully');
            console.log('User registered successfully');
        }
    );
});


// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate token
        const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });

        // Respond with the token and username
        res.json({ message: 'Login successful', token: token, username: user.username });
    });
});

// Dashboard endpoint
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Extract token

    if (!token) {
        return res.status(401).json({ error: 'Token required' });
    }

    // Verify the token
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        const userId = decoded.id;
        // Get user data
        db.get('SELECT * FROM users WHERE id = ?;', [userId], (err, user) => {
            if (err) {
                console.error('SQL Error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const username = user.username;

            db.get('SELECT balance FROM balance WHERE user_id = ?', [username], (err, balanceRow) => {
                if (err) {
                    console.error('SQL Error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const balance = balanceRow ? balanceRow.balance : 0;
                res.status(200).json({ user, balance, username });
            });
        });
    });
});

// Get donations by sender or receiver
app.get('/donations', (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const sql = 'SELECT * FROM donations WHERE sender = ? OR receiver = ?';
    db.all(sql, [username, username], (err, rows) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json(rows); // Send donations data to frontend
    });
});

// Post donation (Submit donation)
app.post('/donations', (req, res) => {
    const { sender, receiver, amount, message } = req.body;

    if (!sender || !receiver || !amount || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `INSERT INTO donations (sender, receiver, amount, message) VALUES (?, ?, ?, ?);`;

    db.run(sql, [sender, receiver, amount, message], function (err) {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        const donationId = this.lastID;
        const balance = amount;

        const update = `UPDATE balance SET balance = balance + ? 
                        WHERE user_id = ?`;

        db.run(update, [balance, receiver], function (err) {
            if (err) {
                console.error('SQL Error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            return res.status(201).json({
                message: 'Donation saved and balance updated successfully',
                donationId: donationId
            });
        });
    });
});

// Get donations for dashboard donation page
app.get('/dashboardDonations', (req, res) => {
    const username = req.query.username; 
    console.log("Received request for username:", username); // Debugging

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const sql = 'SELECT sender, message, timestamp, amount FROM main.donations WHERE receiver = ?;';
    db.all(sql, [username], (err, rows) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!rows.length) {
            return res.status(404).json({ error: 'No donations found' });
        }

        console.log("Sending response:", rows); // Debugging
        res.status(200).json(rows);
    });
});

// save payouts into the database from the frontend
app.post('/payouts', (req, res) => {
    console.log("Received request body:", req.body); // Debugging

    const { sender, amount, receiver } = req.body;

    if (!sender || !amount || !receiver) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO main.payouts (sender, amount, receiver, status, timestamp) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);';
    const params = [sender, amount, receiver, 0];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log("Payout saved with ID:", this.lastID); // Debugging
        res.status(201).json({
            message: 'Payout saved successfully',
            id: this.lastID
        });

        const update = 'UPDATE balance SET balance = balance - ? WHERE user_id = ?';
        
        db.run(update, [amount, sender], function(err) { 
            if (err) {
                console.error('SQL Error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            console.log("Balance updated for sender:", sender); // dbug
        }); 
    });
});


// get payouts for dashboard payout page
app.get('/dashboardPayouts', (req, res) => {
    const username = req.query.username;
    
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const sql = 'SELECT id, sender, receiver, amount, timestamp, status FROM main.payouts WHERE sender = ?';
    
    db.all(sql, [username], (err, rows) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!rows.length) {
            return res.status(404).json({ error: 'No payouts found' });
        }

        console.log("Sending payouts:", rows);
        res.status(200).json(rows);
    });
});

app.get('/donationsChart', (req, res) => {
    const username = req.query.username;

    if (!username) { 
        return res.status(400).json({ error: 'Username is required' });
    }

    const sql = 'SELECT timestamp, amount FROM main.donations WHERE receiver = ?';
    db.all(sql, [username], (err, rows) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: 'Failed to load donations data into the chart' });
        }

        if (!rows.length) {
            return res.status(404).json({ error: 'No donations found' });
        }

        res.status(200).json(rows);
    });
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

