import express from 'express';
import { db } from '../db.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Add a new company
router.post('/signup', (req, res) => {
    const { name, website, contactEmail, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
        'INSERT INTO Company (Name, Website, ContactEmail, Password) VALUES (?, ?, ?, ?)',
        [name, website, contactEmail, hashedPassword],
        (err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: 'Signup successful' });
        }
    );
});
// Company/Admin login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Company WHERE ContactEmail = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(401).send('Invalid credentials');
        const company = results[0];
        if (!bcrypt.compareSync(password, company.Password)) {
            return res.status(401).send('Invalid credentials');
        }
        res.json({ message: 'Login successful', companyId: company.CompanyID, name: company.Name });
    });
});
// Get all companies
router.get('/', (req, res) => {
    db.query('SELECT * FROM Company', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// ...existing code...

// Update interview status for a student's application
router.put('/application/status/:studentId/:driveId', (req, res) => {
    const { status } = req.body;
    db.query(
        'UPDATE Application SET Status = ? WHERE StudentID = ? AND DriveID = ?',
        [status, req.params.studentId, req.params.driveId],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result.affectedRows === 0) return res.status(404).send('Application not found');
            res.send('Status updated');
        }
    );
});
// Company/Admin login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Company WHERE ContactEmail = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(401).send('Invalid credentials');
        const company = results[0];
        if (!bcrypt.compareSync(password, company.Password)) {
            return res.status(401).send('Invalid credentials');
        }
        res.json({ message: 'Login successful', companyId: company.CompanyID, name: company.Name });
    });
});

// Get all applications for drives of this company
router.get('/applications/:companyId', (req, res) => {
    const companyId = req.params.companyId;
    const query = `
        SELECT 
            a.StudentID, s.Name as StudentName, s.Email as StudentEmail, 
            a.DriveID, a.Status, a.ApplicationDate, 
            pd.DriveDate, pd.Venue
        FROM Application a
        JOIN Student s ON a.StudentID = s.StudentID
        JOIN PlacementDrive pd ON a.DriveID = pd.DriveID
        WHERE pd.CompanyID = ?
    `;
    db.query(query, [companyId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});


export default router;