import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Add a new placement drive
router.post('/', (req, res) => {
  const { companyId, driveDate, venue, eligibility } = req.body;
  db.query(
    'INSERT INTO PlacementDrive (CompanyID, DriveDate, Venue, Eligibility) VALUES (?, ?, ?, ?)',
    [companyId, driveDate, venue, eligibility],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Drive created', driveId: result.insertId });
    }
  );
});

// Get all drives with company name
router.get('/', (req, res) => {
  const query = `
    SELECT d.DriveID, d.DriveDate, d.Venue, d.Eligibility, c.CompanyID, c.Name AS CompanyName
    FROM PlacementDrive d
    JOIN Company c ON d.CompanyID = c.CompanyID
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

export default router;