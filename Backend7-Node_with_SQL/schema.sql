use apna_database;

create table posts(
    id varchar (50) ,
    username varchar(50) unique,
    email varchar(50) unique not null,
    password varchar(30) not null
)