const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'opengov_db'
});

db.connect(err => {
    if (err) console.error("❌ MySQL Error: " + err.message);
    else console.log("✅ Connected to XAMPP MySQL Database");
});

// --- UPDATED REGISTRATION ROUTE ---
app.post('/api/register', (req, res) => {
    const { full_name, email, password } = req.body;

    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        if (results.length > 0) return res.status(400).json({ success: false, message: "Email already taken" });

        // Insert new user
        const query = "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, 'user')";
        db.query(query, [full_name, email, password], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: err.sqlMessage });
            res.json({ success: true, message: "User registered successfully" });
        });
    });
});

// --- NEW LOGIN ROUTE ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Query for matching email AND password
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });

        if (results.length > 0) {
            // Success: Return the user data
            res.json({
                success: true,
                user: results[0]
            });
        } else {
            // Failure: No match found
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    });
});

// --- ADMIN: Create new project ---
app.post('/api/projects', (req, res) => {
    const { title, location, status, total_budget, is_published } = req.body;
    const query = "INSERT INTO projects (title, location, status, total_budget, is_published) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [title, location, status, total_budget, is_published || 0], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: err.sqlMessage });
        res.json({ success: true, message: "Project saved!" });
    });
});

// --- PUBLIC: Fetch only published projects ---
app.get('/api/public-projects', (req, res) => {
    const query = "SELECT * FROM projects WHERE is_published = 1";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));