-- HAVING Clause :-
-- 		It is similiar to WHERE Clause.It applies some conditions on rows
-- 		But it is used when we want to apply any condition after grouping 
-- 		Syntax:-	SELECT co1,col2 FROM tabName GROUP BY colName HAVING condition;
-- 		Keep in mind WHERE is for the column and HAVING is for the row
-- 		Grouping is necessary for HAVING

-- 		Example:-
			-- GROUP BY Clause:-
-- 		It groups rows that have the same values in summary rows.
-- 		It collects data from multiple records and groups the result by one or more column.
-- 		Syntax -> 	SELECT col1,col2.. FROM tabName GROUP  BY colName;
-- 		Usually we use group with some aggregasion function.
-- 		Example:-
			CREATE TABLE user(id int ,name varchar(30),age int,email varchar(50),followers int,following int);
			INSERT INTO user VALUES(1,"shezzy",21,"shezzy@gmail.com",150,10),(2,"goodo",19,"Zaini@gmail.com",201,5),(3,"Chooti goodo",19,"simleyGirl@gamil.com",250,15);
			--let we want to group table by age and want to display name and followers of those groups whose follower count is greater then 200 then
            
            SELECT name FROM user GROUP BY age HAVING followers>200;
            --that query will group data by age mean users with same ages will lie in same group here 'goodo' and 'chooti goodo' both are of same age so they will make one group and shezzy will make another group.So two groups are formed here .Then second condition is that print name of only those users of these groups that contain followers above 200 .So here goodo will be output as his followers are 201  
		--the above querry means first make groups of users according to ages and then count no of ids in each group and display them