DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    age int NOT NULL,
    birthday VARCHAR (30) NOT NULL,
    children INT NOT NULL
);
