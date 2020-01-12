INSERT INTO users(id, username, firstName, lastName)
VALUES (0, 'dmitrii', 'Dmitrii', 'Kupchenko');

INSERT INTO users(id, username, firstName, lastName)
VALUES (1, 'dmitrii1', 'Dmitrii', 'Kupchenko');

INSERT INTO roles (name)
VALUES ('USER');
INSERT INTO roles(name)
VALUES ('ADMIN');

INSERT INTO user_has_roles(user, role)
VALUES (0, 0);
INSERT INTO user_has_roles(user, role)
VALUES (0, 1);


INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (0, 'My first note', 'Here is i can white my notes. This text is long enough to show shorter.', 0, now(), now());

INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (1, 'My second note', 'Some content here. Adding long text. Test test test test.', 1, now(), now());

INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (2, 'My third note', 'Another content here. Another text is presented here.', 0, now(), now());

INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (3, 'My fourth note', 'Some tfgyhu jihugyfdf lhbdf sdhgf shdgf jdshgfjhsdgf jhsdgfjsdgf iuytwegifuyg isdugfiusydgfiuywegifuygw', 0, now(), now());

INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (4, 'My fifth note', 'Fifth Some content here. Adding long text. Test test test test.', 0, now(), now());

INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (5, '1My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (6, '2My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (7, '3My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (8, '4My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (9, '5My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (10, '6My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (11, '7My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (12, '8My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (13, '9My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (14, '10My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (15, '11My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());
INSERT INTO notes(id, title, content, owner, created_ts, updated_ts)
VALUES (16, '12My sixth note', 'Sixth Another content here. Another text is presented here.', 0, now(), now());