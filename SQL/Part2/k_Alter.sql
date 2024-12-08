-- ALTER :- Alter command is used to change the schema.Mean with the help of it we can add new columns to the table ,we can update value of columns,type of column,we can change type of column,we can drop any column completely and we can rename our table.
	
-- 	1-Add column:-We can add any column in table 
-- 		Syntax: ALTER TABLE tableName ADD colName dataType Constraint;
-- 		Example: 
			DROP TABLE IF EXISTS user1;
			CREATE TABLE user1(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
			INSERT INTO user1 VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),
			(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15),(4,"Deeja",20,"writer@gmail.com",175,18);
			SELECT * FROM user1;
			--let we want to add a column for cgpa and assign them default value of 3.9
			ALTER TABLE user1 ADD COLUMN cgpa float DEFAULT 3.9;
			--add another column for heights
            ALTER TABLE user1 ADD COLUMN height float DEFAULT 5.7;
            --now lets print the table
			SELECT * FROM user1;
            ALTER TABLE user1 ADD COLUMN DOB varchar(50) NOT NULL DEFAULT '13/04/2003';
            SELECT * FROM user1;


	-- 2-DROP column:-We can drop any existing column from the table
	-- 	Syntax: ALTER tableName DROP COLUMN colName;
	-- 	Example: 
			CREATE TABLE user2(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
			INSERT INTO user2 VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),
			(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15),(4,"Deeja",20,"writer@gmail.com",175,18);
			SELECT * FROM user2;
			--let we want to add a column for cgpa and assign them default value of 3.9
			ALTER TABLE user2 ADD COLUMN cgpa float DEFAULT 3.9;
			--now lets print the table
			SELECT * FROM user2; 
			--lets remove the newly added column cgpa from the table and print the table
			ALTER TABLE user2 DROP COLUMN cgpa;
			SELECT * FROM user2;

	-- 3-RENAME table:-We can change the name of out table
	-- 	Synatx: ALTER TABLE tableName RENAME TO newName;
	-- 	Example: 
			CREATE TABLE user3(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
			INSERT INTO user3 VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),
			(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15),(4,"Deeja",20,"writer@gmail.com",175,18);
			SELECT * FROM user3;
			--let we want to add a column for cgpa and assign them default value of 3.9
			ALTER TABLE user3 ADD COLUMN cgpa float DEFAULT 3.9;
			--now lets print the table
			SELECT * FROM user3; 
			--lets remove the newly added column cgpa from the table and 
			ALTER TABLE user3 DROP COLUMN cgpa;
			SELECT * FROM user3;
			--lets change the name of our table from user to warriors and print it by its new name
			ALTER TABLE user3 RENAME TO warriors;
			SELECT * FROM warriors;


	-- 4-CHANGE COLUMN(rename):-we can also rename any column.
	-- Syntax-> ALTER TABLE tableName RENAME COLUMN old_colName TO new_colName;
	-- 	Example: 
			CREATE TABLE user3(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
			INSERT INTO user3 VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),
			(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15),(4,"Deeja",20,"writer@gmail.com",175,18);
			SELECT * FROM user3;
			--lets change the name of id to sr
			ALTER TABLE user3 CHANGE COLUMN id TO sr;
			SELECT sr FROM user3;
			SELECT * FROM user3;

	-- 5-MODIFY COLUMN(change dataType,constraints):-we can also change any column's dataType,and its constraint
	-- Syntax-> ALTER TABLE tableName MODIFY COLUMN colName new_dataType newConstraint;
	-- 	Example: 
			CREATE TABLE user3(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
			INSERT INTO user3 VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),
			(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15),(4,"Deeja",20,"writer@gmail.com",175,18);
			SELECT * FROM user3;
			--let we want to change the type of age from int to float and set a constraint for it 
			ALTER TABLE user3 MODIFY COLUMN age float default 18;
			SELECT * FROM user3;
