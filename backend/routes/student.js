import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Get all students
router.get('/', (req, res) => {
    db.query('SELECT StudentID, Name, Email, Department, CGPA FROM Student', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Get student by ID
router.get('/:id', (req, res) => {
    db.query('SELECT StudentID, Name, Email, Department, CGPA FROM Student WHERE StudentID = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json(result[0]);
    });
});

// Update student info
router.put('/:id', (req, res) => {
    const { name, email, department, cgpa } = req.body;
    db.query(
        'UPDATE Student SET Name = ?, Email = ?, Department = ?, CGPA = ? WHERE StudentID = ?',
        [name, email, department, cgpa, req.params.id],
        (err) => {
            if (err) return res.status(500).send(err.message);
            res.send('Student information updated');
        }
    );
});

// ...existing code...

// Update student info (partial update support)
router.put('/:id', (req, res) => {
    const { name, email, department, cgpa } = req.body;
    // Only update provided fields
    let fields = [];
    let values = [];
    if (name) { fields.push('Name = ?'); values.push(name); }
    if (email) { fields.push('Email = ?'); values.push(email); }
    if (department) { fields.push('Department = ?'); values.push(department); }
    if (cgpa) { fields.push('CGPA = ?'); values.push(cgpa); }
    if (fields.length === 0) return res.status(400).send('No fields to update');
    values.push(req.params.id);
    db.query(
        `UPDATE Student SET ${fields.join(', ')} WHERE StudentID = ?`,
        values,
        (err) => {
            if (err) return res.status(500).send(err.message);
            res.send('Student information updated');
        }
    );
});

// Delete student account
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Student WHERE StudentID = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Account deleted');
    });
});

// Get all applications for a student
router.get('/applications/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const query = `
        SELECT a.*, pd.DriveDate, pd.Venue, c.Name AS CompanyName
        FROM Application a
        JOIN PlacementDrive pd ON a.DriveID = pd.DriveID
        JOIN Company c ON pd.CompanyID = c.CompanyID
        WHERE a.StudentID = ?
    `;
    db.query(query, [studentId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

export default router;