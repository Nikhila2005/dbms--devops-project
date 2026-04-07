import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';

const router = express.Router();

router.post('/signup', (req, res) => {
    const { name, email, department, cgpa, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
        'INSERT INTO Student (Name, Email, Department, CGPA, Password) VALUES (?, ?, ?, ?, ?)',
        [name, email, department, cgpa, hashedPassword],
        (err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: 'Signup successful' });
        }
    );
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Student WHERE Email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];
        const valid = bcrypt.compareSync(password, user.Password);
        if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

        res.json({ message: 'Signin successful', student: user });
    });
});

// ...existing code...

// Change password
router.post('/change-password', (req, res) => {
    const { studentId, oldPassword, newPassword } = req.body;
    db.query('SELECT Password FROM Student WHERE StudentID = ?', [studentId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Student not found' });
        const valid = bcrypt.compareSync(oldPassword, results[0].Password);
        if (!valid) return res.status(401).json({ message: 'Current password is incorrect' });
        const hashed = bcrypt.hashSync(newPassword, 10);
        db.query('UPDATE Student SET Password = ? WHERE StudentID = ?', [hashed, studentId], (err2) => {
            if (err2) return res.status(500).json({ message: err2.message });
            res.json({ message: 'Password updated successfully' });
        });
    });
});

export default router;
