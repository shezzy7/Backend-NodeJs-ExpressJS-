-- ORDER BY Clause:-
-- 		It is used to sort in ascending(ASC) or descending clause(DESC)
-- 	Syntax -> SELECT col1,col2 FROM tableName ORDER BY col_name(s) (ASC or DESC);
-- 	Example:- 
-- 		Let suppose we have a table of users in data in which we want to sort our rows according to their ages in ascending order
		CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);			
		INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",17,"Zaini@gmail.com",160,5),(3,"Chooti goodo",15,"simleyGirl@gamil.com",250,16),(4,"Deeja",20,"writer@gmail.com",175,18);
		SELECT * FROM user ORDER BY age ASC;
		SELECT name,age FROM user ORDER BY followers DESC;
		--BY default order is Ascending .If we not specify any order then it will be displayed in ascending order
		SELECT * FROM user ORDER BY name;
		--name will be order according to their ascii values