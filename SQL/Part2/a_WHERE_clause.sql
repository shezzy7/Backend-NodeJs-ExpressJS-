-- WHERE Clause is used to define some conditions
-- Syntax->  SELECT col1,col2 FROM tableName WHERE conditions;
-- 	Let's create a table user and perform where clause on it is use
CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
INSERT INTO user VALUES(1,"Shahzad",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",160,5),(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15);
SELECT * FROM user;
SELECT * FROM user WHERE age>20;
SELECT name FROM user WHERE followers >= 155;
SELECT followers,following,email FROM user WHERE following<=13;

UPDATE user SET name="shezzy" WHERE name="shahzad";
SELECT * FROM user;
--we can set multiple conditions in where clause
SELECT * FROM user WHERE age>18 AND followers<170;