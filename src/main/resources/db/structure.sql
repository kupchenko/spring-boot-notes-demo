DROP TABLE notes IF EXISTS;

CREATE TABLE notes
(
    id integer identity primary key,
    title  varchar(128) not null,
    content  varchar(512),
    owner integer not null,
    created_ts datetime not null,
    updated_ts datetime not null
);