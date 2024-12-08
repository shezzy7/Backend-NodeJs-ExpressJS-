-- TRUNCATE :- it's a command used to delete data of whole table.Mean instead of dropeing ouur table we want to reset our table data then we can use this command 
-- syntax-> TRUNCATE TABLE tableName;
-- example:-
    
  		CREATE TABLE employee(empId char(4),empName varchar(30),empFName varchar(30),empAge int,empSal int,empDept char(4));
  		INSERT INTO employee VALUES('E001','Ali Ahmad','Ahmad Hassan',27,70000,'D003'),('E002','Sana Javed','Javed Ahmad',21,60000,'D001'),
	   	('E003','Kamran Ali','Ali Ahmad',24,75000,'D002'),('E004','Kashif Ali','Ali Kamran',25,80000,'D001'),('E005','Hina Munir','Munir
 	   	Ahamad',22,65000,'D004'),('E006','Hamna Ali','Hassan Ali',27,75000,'D002'),('E007','Obaid Ali','Ali Ahmad',32,90000,'D001');
		TRUNCATE TABLE employee;

		