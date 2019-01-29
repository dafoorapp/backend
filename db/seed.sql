DROP DATABASE IF EXISTS dafoor;
CREATE DATABASE dafoor;

\c dafoor

CREATE EXTENSION postgis; 
CREATE EXTENSION postgis_topology; 


CREATE TABLE users (
    id serial primary key,
    email varchar unique not null,
    password varchar not null, 
    type varchar not null 
);

CREATE TABLE students (
    name varchar not null,
    gender varchar not null,
    phone_number varchar(15) not null,
    location GEOMETRY(POINT,4326),
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES users
);

CREATE TABLE tutors (
    name varchar not null,
    gender varchar not null,
    phone_number varchar(15) not null,
    location GEOMETRY(POINT,4326),
    rating double precision,
    subject TEXT [],
    price int not null,
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES users
);

CREATE TABLE requests (
    id serial primary key,
    subject varchar not null,
    duration varchar not null,
    cost varchar not null,
    studnet_id int not null,
    tutor_id int not null,
    FOREIGN KEY (studnet_id) REFERENCES users,
    FOREIGN KEY (tutor_id) REFERENCES users
);

INSERT INTO users (email, password, type) VALUES 
    ('moroj@gmail.com', '123456', 'student'),
    ('nada@gmail.com', '123456', 'tutor'),
    ('yahya@gmail.com', '123456', 'tutor')
;

INSERT INTO students (user_id,name, gender, location, phone_number) VALUES 
    (1,'Moroj', 'F', ST_GeomFromText('POINT(24.664221 46.681899)' , 4326), '0987654')
;

INSERT INTO tutors (user_id, name, gender, location, phone_number,price ) VALUES
    (2,'Nada', 'F', ST_GeomFromText('POINT(24.664221 46.681899)' , 4326), '09876543', 20),
    (3,'Yahya', 'F', ST_GeomFromText('POINT(24.664221 46.681899)' , 4326), '097654', 10)
;

INSERT INTO requests (studnet_id, tutor_id, subject, duration, cost) VALUES
    (1, 2, 'math', '2', '200')
;