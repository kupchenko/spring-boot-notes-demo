INSERT INTO users(idUser, username, firstName, lastName)
VALUES (0, 'dmitrii', 'Dmitrii', 'Kupchenko');

INSERT INTO roles (name)
VALUES ('USER');
INSERT INTO roles(name)
VALUES ('ADMIN');

INSERT INTO user_has_roles(user, role)
VALUES (0, 0);
INSERT INTO user_has_roles(user, role)
VALUES (0, 1);


INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (0, 'My first note', 'Here is i can white my notes', 0, now(), now());