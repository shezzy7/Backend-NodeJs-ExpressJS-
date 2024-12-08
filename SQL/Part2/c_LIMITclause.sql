-- LIMIT Clause:-
-- 	     Set an upper limit on number of tuples to be returned
-- 	     Syntax ->    SELECT * FROM tableName LIMIT 3;
-- 	     Example:-
		CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
		INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",16,"Zaini@gmail.com",160,5),(3,"Chooti goodo",16,"simleyGirl@gamil.com",250,16),(4,"Deeja",16,"writer@gmail.com",175,18);
		--let we have to display data of first 2 rows
		SELECT * FROM user LIMIT 2;
		--let we have to displayy name of 2 users if exist whose age is 16
		SELECT name,age FROM user WHERE age IN(16) LIMIT 2 ;