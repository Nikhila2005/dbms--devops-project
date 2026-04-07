DROP DATABASE IF EXISTS placement_db;



CREATE DATABASE IF NOT EXISTS placement_db;


USE placement_db;



-- Student Table
CREATE TABLE IF NOT EXISTS Student (
    StudentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Department VARCHAR(100),
    CGPA DECIMAL(3,2),
    Password VARCHAR(255)
);

-- Company Table
CREATE TABLE IF NOT EXISTS Company (
    CompanyID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Website VARCHAR(100),
    ContactEmail VARCHAR(100),
    Password VARCHAR(255)
);


-- Placement Drive Table
CREATE TABLE IF NOT EXISTS PlacementDrive (
    DriveID INT AUTO_INCREMENT PRIMARY KEY,
    CompanyID INT,
    DriveDate DATE,
    Venue VARCHAR(100),
    Eligibility VARCHAR(255),
    FOREIGN KEY (CompanyID) REFERENCES Company(CompanyID)
);



-- Application Table
CREATE TABLE IF NOT EXISTS Application (
    StudentID INT,
    DriveID INT,
    ApplicationDate DATE,
    Status ENUM('Applied', 'Selected', 'Rejected') DEFAULT 'Applied',
    PRIMARY KEY (StudentID, DriveID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (DriveID) REFERENCES PlacementDrive(DriveID)
);

-- Coordinator Table
CREATE TABLE IF NOT EXISTS Coordinator (
    CoordinatorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(15)
);

-- Sample Companies
INSERT INTO Company (Name, Website, ContactEmail,Password)
VALUES 
    ('TCS', 'https://www.tcs.com', 'hr@tcs.com','$2a$10$8Ave1L1KxW8lbnJhjWkituyDqkhCYPtB442cXKpswAhXQI5G67pgi'),
    ('AMAZON', 'https://www.amazon.com', 'hr@amazon.com','$2a$10$8Ave1L1KxW8lbnJhjWkituyDqkhCYPtB442cXKpswAhXQI5G67pgi'),
    ('flipkart', 'https://www.flipkart.com', 'hr@flipkart.com','$2a$10$8Ave1L1KxW8lbnJhjWkituyDqkhCYPtB442cXKpswAhXQI5G67pgi');
    
    
 
    
    
select * from company ;


select companyId from company where name='flipkart';





    

-- Sample Placement Drives (for CompanyID 1 and 2)
INSERT INTO PlacementDrive (CompanyID, DriveDate, Venue, Eligibility)
VALUES 
    (1, '2025-06-01', 'Main Auditorium', 'CGPA >= 7.0'),
    (2, '2025-06-15', 'Hall B', 'CGPA >= 8.0');
    
select * from student;
select * from company;




-- Sample Placement Drive for Flipkart (CompanyID 3)
INSERT INTO PlacementDrive (CompanyID, DriveDate, Venue, Eligibility)
VALUES (3, '2025-06-20', 'Online', 'CGPA >= 6.0');
    










    
