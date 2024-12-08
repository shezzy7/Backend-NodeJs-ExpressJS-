-- GROUP BY Clause:-
-- 		It groups rows that have the same values in summary rows.
-- 		It collects data from multiple records and groups the result by one or more column.
-- 		Syntax -> 	SELECT col1,col2.. FROM tabName GROUP  BY colName;
-- 		Usually we use group with some aggregasion function.
-- 		Example:-
		
		CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
		INSERT INTO user VALUES(1,"shezzy",20,"shezzy@gmail.com",150,10),(2,"goodo",17,"Zaini@gmail.com",160,19),(3,"Chooti goodo",15,"simleyGirl@gamil.com",250,19),(4,"Deeja",20,"ghostWriter@gmail.com",175,21);
		SELECT COUNT(id) FROM user GROUP BY age;

		--the above querry means first make groups of users according to ages and then count no of ids in each group and display them