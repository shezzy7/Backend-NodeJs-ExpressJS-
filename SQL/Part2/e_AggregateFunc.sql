-- Aggregate functions:-
-- 		Aggregate functions perform a calculation on a set of values and return a single value.
-- 		Following are aggregate functions:-
-- 			i-COUNT()	ii-MIN()	        iii-MAX() 	iv-SUM()	       v-AVG()
-- 		Syntax ->  SLELECT funcName(colName) FROM tabName ;
-- 		Example:-
		CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
		INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",17,"Zaini@gmail.com",160,5),(3,"Chooti goodo",15,"simleyGirl@gamil.com",250,16),(4,"Deeja",20,"ghostwriter@gmail.com",175,18);
		--let suppose we have to find the user with maximum followers
		SELECT MAX(followers) FROM user;
		--let suppose we have to find the user with minimum age
		SELECT MIN(age) FROM user;
		--let suppose we have to find the average of their ages 
		SELECT AVG(age) FROM user;
		--let suppose we have to find the sum of 'following' of all the users
		SELECT sum(following) FROM user;
		--let we have to find the count of user with followers greater then 155
		SELECT COUNT(followers) FROM user WHERE followers>155;
		--let we want to get name of user whose followers are greater then all
		SELECT name FROM user WHERE followers=(SELECT MAX(followers) FROM user);
        SELECT name FROM user WHERE age>19;
        