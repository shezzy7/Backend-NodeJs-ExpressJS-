-- DELETE :- it is used to deleted existing row
-- 	Synatx:- 	DELETE FROM tableName WHERE condition;
-- 	If we don't use condition here then it will delete data of whole table 
-- 	Example:-
	
  		CREATE TABLE employee(empId char(4),empName varchar(30),empFName varchar(30),empAge int,empSal int,empDept char(4));
  		INSERT INTO employee VALUES('E001','Ali Ahmad','Ahmad Hassan',27,70000,'D003'),('E002','Sana Javed','Javed Ahmad',21,60000,'D001'),
	   	('E003','Kamran Ali','Ali Ahmad',24,75000,'D002'),('E004','Kashif Ali','Ali Kamran',25,80000,'D001'),('E005','Hina Munir','Munir
 	   	Ahamad',22,65000,'D004'),('E006','Hamna Ali','Hassan Ali',27,75000,'D002'),('E007','Obaid Ali','Ali Ahmad',32,90000,'D001'),  
        		('E008','Muhammad Kamran','Kamran Ali',35,95000,'D004'),('E009','Muhammad Ali','Ali Hassan',21,55000,'D001');
		--let we want to DELETE data of all the employee whose age is greater then
		DELETE FROM employee WHERE empAge>=30; 