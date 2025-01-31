const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to SQLite database.');
});

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Register endpoint
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password],
        (err) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint')) {
                    return res.status(400).send('Username or email already exists');
                }
                return res.status(500).send('Database error');
            }
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

        // Query the user data based on the decoded user ID
        db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
            if (err) {
                console.error('SQL Error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            
            if (!row) {
                return res.status(404).json({ error: 'User not found' });
            }
      
            res.status(200).json(row); // Send user data to frontend
        });
    });
});

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
