import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// ✅ Apply for a placement drive
router.post('/apply', (req, res) => {
  const { studentId, driveId, applicationDate } = req.body;

  // Check for existing application first (to prevent duplicates)
  const checkQuery = `
    SELECT * FROM Application WHERE StudentID = ? AND DriveID = ?
  `;

  db.query(checkQuery, [studentId, driveId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });


    if (results.length > 0) {
      return res.status(400).send('Already applied for this drive');
    }

    // Insert new application
    const insertQuery = `
      INSERT INTO Application (StudentID, DriveID, ApplicationDate, Status)
      VALUES (?, ?, ?, 'Applied')
    `;

    db.query(insertQuery, [studentId, driveId, applicationDate], (err2) => {
      if (err2) return res.status(500).send(err2.message);
      res.send('Application submitted');
    });
  });
});

// ✅ Get all applications for a student with drive and company details
router.get('/student/:id', (req, res) => {
  const studentId = req.params.id;
  console.log('Fetching applications for student:', studentId); // log incoming ID

  const sql = `
  SELECT 
    a.Status, a.ApplicationDate,
    d.DriveID, d.DriveDate, d.Venue, d.Eligibility,
    c.CompanyID, c.Name AS CompanyName
  FROM Application a
  JOIN PlacementDrive d ON a.DriveID = d.DriveID
  JOIN Company c ON d.CompanyID = c.CompanyID
  WHERE a.StudentID = ?
`;


  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error('Database error:', err); // <--- log actual error
      return res.status(500).json({ error: err.message }); // return JSON
    }
    res.json(results);
  });
});

// Update interview status for a student's application
router.put('/status/:applicationId', (req, res) => {
  const { status } = req.body; // status should be 'Pass' or 'Fail'
  db.query(
    'UPDATE Application SET InterviewStatus = ? WHERE ApplicationID = ?',
    [status, req.params.applicationId],
    (err) => {
      if (err) return res.status(500).send(err.message);
      res.send('Interview status updated');
    }
  );
});
export default router;
