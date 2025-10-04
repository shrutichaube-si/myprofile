import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const db = await connectToDatabase();
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
    }
    //const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password; // Storing plain text password (not recommended)
    await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
   return res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const db = await connectToDatabase();
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'User not existed' });
    }
    const isMatch = (password === rows[0].password); // Comparing plain text passwords (not recommended)
    //const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
        return res.status(404).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: rows[0].id }, 'your_jwt_secret',{ expiresIn: '1h' });
    return res.status(201).json({ token: token });
});

// const verifyToken = (req, res, next) => {
//     try {
//         const token = req.headers['authorization'];
//         if (!token) {
//             return res.status(401).json({ message: 'No token provided' });
//         }
//         const decoded = jwt.verify(token, 'your_jwt_secret');
//         req.userId = decoded.id;
//         next();
//     } catch (error) {
//         console.error("Error verifying token:", error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }

// }

// router.get('/user', verifyToken, async (req, res) => {
//     try {
//         const db = await connectToDatabase();
//         const [rows] = await db.execute('SELECT id, username, email FROM users WHERE id = ?', [req.userId]);
//         if (rows.length === 0) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(201).json(rows[0]);
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// });



export default router;