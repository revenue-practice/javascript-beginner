create table users (
	id serial primary key,
	name varchar(250),
	email varchar(50) unique,
	age int 
);