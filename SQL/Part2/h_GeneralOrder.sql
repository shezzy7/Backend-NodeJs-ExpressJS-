-- General order for writing clauses:-
-- 			SELECT column
-- 			FROM tableName
-- 			WHERE condition
-- 			GROUP BY column
-- 			HAVING condition
-- 			ORDER BY column ASC/DESC;

			DROP TABLE IF EXISTS user;;
		CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);			
		INSERT INTO user VALUES(1,"Shahzad",20,"shezzy@gmail.com",150,10),(2,"goodo",15,"Zaini@gmail.com",160,5),(3,"Chooti goodo",15,"simleyGirl@gamil.com",250,16),(4,"Deeja",18,"writer@gmail.com",175,18);
		SELECT * FROM user WHERE age>15 GROUP BY age HAVING followers> 155 ORDER BY id desc;
		--if order is wrong then error will be generated