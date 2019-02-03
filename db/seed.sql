DROP DATABASE IF EXISTS dafoor;
CREATE DATABASE dafoor;

\c dafoor

CREATE EXTENSION postgis; 
CREATE EXTENSION postgis_topology; 


CREATE TABLE users (
    id serial primary key,
    email varchar unique not null,
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
    state boolean not null,
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES users
);

CREATE TABLE requests (
    id serial primary key,
    subject varchar not null,
    duration varchar not null,
    cost varchar not null,
    status varchar not null,
    date date not null,
    studnet_id int not null,
    tutor_id int not null,
    FOREIGN KEY (studnet_id) REFERENCES users,
    FOREIGN KEY (tutor_id) REFERENCES users
);

INSERT INTO users (email, type) VALUES 
    ('moroj@gmail.com', 'student'),
    ('nada@gmail.com', 'tutor'),
    ('yahya@gmail.com', 'tutor'),
    ('sraj@sraj.com' , 'student')
;

INSERT INTO students (user_id,name, gender, location, phone_number) VALUES 
    (1,'Moroj', 'F', ST_GeomFromText('POINT(24.6613372 46.6807383)' , 4326), '0987654'),
    (4,'Sraj', 'M', ST_GeomFromText('POINT(24.6613372 46.6807388)' , 4326), '0987655')
;

INSERT INTO tutors (user_id, name, gender, location, phone_number, subject, rating, price, state) VALUES
    (2,'Nada', 'F', ST_GeomFromText('POINT(24.7155904 46.6548654)' , 4326), '09876543', '{"Math" , "Physics"}', 5, 20, true),
    (3,'Yahya', 'M', ST_GeomFromText('POINT(20.240377 47.791984)' , 4326), '097654', '{"Math" ,"Computer"}', 3.5, 10, true)
;

INSERT INTO requests (studnet_id, tutor_id, subject, duration, cost , status) VALUES
    (1, 2, 'math', '2', '200', 'active')
;

-- SELECT students.name, tutors.name FROM students, tutors WHERE ST_DWithin(students.location, tutors.location, 100);