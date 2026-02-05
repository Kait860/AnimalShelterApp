--Database Initialization Script--

--Create Database
CREATE DATABASE IF NOT EXISTS animal_shelter;

--Use the created database
USE animal_shelter;

--Create Table for Animals
CREATE TABLE IF NOT EXISTS Animal (
    animalId INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    age INT,
    temperament VARCHAR(255),
    medicalNeeds VARCHAR(255),
    adoptionStatus VARCHAR(50) DEFAULT 'Available',
    photoPath VARCHAR(255),
    PRIMARY KEY (animalId)
);