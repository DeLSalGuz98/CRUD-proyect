CREATE DATABASE crud_database;

USE crud_database;

CREATE TABLE task(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_task VARCHAR(20) NOT NULL,
    description_task VARCHAR(50)
);