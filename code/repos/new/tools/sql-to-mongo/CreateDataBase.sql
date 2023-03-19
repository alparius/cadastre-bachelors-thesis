DROP DATABASE IF EXISTS PriestsDataBase;
CREATE DATABASE PriestsDataBase;
USE PriestsDataBase;

CREATE TABLE Priests (
	ID INT NOT NULL AUTO_INCREMENT,
	Name VARCHAR(50),
	BornDate VARCHAR(100),
	DeathDate VARCHAR(100),
	BornCountry VARCHAR(50),
	BornCounty VARCHAR(50),
	BornTown VARCHAR(50),
	Diocese VARCHAR(50),
	UnMarried INT,
	Married INT,
	Widow INT,
	Divorced INT,
	Father VARCHAR(50),
	Mother VARCHAR(50),
	SpeakWell VARCHAR(50),
	SpeakMedium VARCHAR(50),
	SpeakLess VARCHAR(50),
	WriteWell VARCHAR(50),
	WriteMedium VARCHAR(50),
	WriteLess VARCHAR(50),
	Army VARCHAR(2000),
	RetirementDate VARCHAR(100),
	Consecration VARCHAR(100),
 	Resigned VARCHAR(50),
  	Fired VARCHAR(50),
 	ChangedCareer VARCHAR(50),  
 	Note VARCHAR(2000),
    
	PRIMARY KEY (ID)
);

CREATE TABLE Wifes (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	Name VARCHAR(50),
	BornDate VARCHAR(50),
	Job VARCHAR(200),
	MarriageDate VARCHAR(50),
	Father VARCHAR(50),
	Mother VARCHAR(50),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE Children (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	Name VARCHAR(50),
	BornPlace VARCHAR(50),
	BornDate VARCHAR(50),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE Qualifications (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	DiplomaName VARCHAR(100),
	GenesisDate VARCHAR(50),
	IssuingAuthority VARCHAR(200),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE AssistantPriestPlaces (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	Place VARCHAR(100),
	StartDate VARCHAR(50),
	EndDate VARCHAR(50),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE MainPriestPlaces (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	Place VARCHAR(100),
	StartDate VARCHAR(50),
	EndDate VARCHAR(50),
	MunimentGenesisDate VARCHAR(100),
	MunimentNumber VARCHAR(100),
	MunimentIssuingAuthority VARCHAR(100),
	Income VARCHAR(100),
	NumberOfPeople VARCHAR(100),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE ChurchOffices (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	Name VARCHAR(500),
	StartDate VARCHAR(50),
	EndDate VARCHAR(50),
	Comment VARCHAR(200),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE OtherOffices (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	Name VARCHAR(500),
	StartDate VARCHAR(50),
	EndDate VARCHAR(50),
	Comment VARCHAR(200),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE LiteraryWorks (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	Title VARCHAR(700),
	Comment VARCHAR(200),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE DisciplinaryMatters (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	Name VARCHAR(300),
	IssuingAuthority VARCHAR(100),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);

CREATE TABLE Suspensions (
	ID INT NOT NULL AUTO_INCREMENT,
	PriestID INT NOT NULL,
	StartDate VARCHAR(50),
	EndDate VARCHAR(50),
	Punishment VARCHAR(200),
	DateAndNumber VARCHAR(200),
	Comment VARCHAR(200),
    
	PRIMARY KEY (ID),
	FOREIGN KEY (PriestID) REFERENCES Priests(ID)
);


SELECT * FROM Priests;
SELECT * FROM Wifes;
SELECT * FROM Children;
SELECT * FROM Qualifications;
SELECT * FROM AssistantPriestPlaces;
SELECT * FROM MainPriestPlaces;
SELECT * FROM ChurchOffices;
SELECT * FROM OtherOffices;
SELECT * From LiteraryWorks;
SELECT * From DisciplinaryMatters;
SELECT * From Suspensions;