DROP TABLE roles IF EXISTS;

CREATE TABLE roles
(
    id integer identity,
    name   varchar(50) not null,
    PRIMARY KEY (id)
);

DROP TABLE users IF EXISTS;

CREATE TABLE users
(
    id    integer identity primary key,
    username  varchar(50) not null,
    firstName varchar(50) not null,
    lastName  varchar(50) not null
);

DROP TABLE user_has_roles IF EXISTS;

CREATE TABLE user_has_roles
(
    user integer,
    role integer
);

DROP TABLE notes IF EXISTS;

CREATE TABLE notes
(
    id integer identity primary key,
    title  varchar(128) not null,
    content  varchar(512),
    owner integer not null,
    created_ts date not null,
    updated_ts date not null
);