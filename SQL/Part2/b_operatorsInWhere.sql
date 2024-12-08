-- WHERE Clause
-- 		operators are of 4 types these are following
-- 	1-Arithmatic operators :	  + , - , * , / , %
-- 			example...	
			CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
			INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15);
			--let we want to display name of user whose age will be above or equall to 18 next year
			SELECT name FROM user WHERE age + 1 >= 18;

	-- 2-Comparison operators : 	= , != , > , >= , < , <=
	-- 		example....
			CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
			INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15);
			--let we want to display name of user whose followers are not equal to 160 
			SELECT name FROM user WHERE followers != 150;

	-- 3-Logical Operators:	AND , OR , NOT , IN , BETWEEN , LIKE , ALL , ANY
	-- 		AND -> to check for all conditions to be true.Note: its not &, its AND 
	-- 			example.... 
				CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
				INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15);
				--let we want to print email of users whose followers are more then 100 and following is more than 10
				SELECT email FROM user WHERE  (followers>100  AND  following>10);
				--like this we can multiple conditions using AND between them
	
			-- OR ->   to check for one condition to be true.Note: its not |, its OR
			-- 	example...
				--let we want to print email of users whose followers are more then 100 or following is more than 10
				SELECT email FROM user WHERE  (followers>100  OR following>10);
				--like this we can add multiple conditions using OR between them
			
			-- BETWEEN -> it selects for a given range
			-- 	example...
				CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
				INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15),(4,"Deeja",20,"writer@gmail.com",175,18);
				--let we want to print name of users whose followers are between 100 to 200
				SELECT name FROM user WHERE followers BETWEEN 100 AND 200;

			-- IN ->   to match a elements in the list
			-- 	example...
				CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
				INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15),(4,"Deeja",20,"writer@gmail.com",175,18);
				--let we want to print name of users whose email is "shezzy@gmail.com" or "Zaini@gmail.com" or "abcd@gamil.com"
				SELECT name FROM user WHERE email IN ("shezzy@gmail.com","Zaini@gmail.com","abcd@gamil.com");
				--if any value in the list is not in the table then it will not show any error it will just match if present data will be shown else neglected
				--take another example if we want to display name and age of users whose age is 17 or 20
				SELECT name,age FROM user WHERE age IN(17,20);

			-- NOT -> to nevigate the given condition
			-- 	example...
				
				--let we want to print name of users whose email is other then "shezzy@gmail.com" or "Zaini@gmail.com" or "abcd@gamil.com"
				SELECT name FROM user WHERE email NOT IN ("shezzy@gmail.com","Zaini@gmail.com","abcd@gamil.com");
				--take another example if we want to display name and age of all the users whose age is other than 17 or 20
				SELECT name,age FROM user WHERE age NOT IN(17,20);

			
	4-Bitwise operators: 	& , |	