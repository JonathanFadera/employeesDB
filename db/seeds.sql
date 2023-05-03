-- USE managers_DB table;

INSERT INTO department (name) VALUES
('Ministry for Magic'),
('Magical Law Enforcement'),
('Magical Catastrophes'),
('Magical Internal Coop');


INSERT INTO role (title, salary, department_id) VALUES
('Minister for Magic', 60000, 1),
('Senior Undersecretary', 40000, 2),
('Head of the Department', 90000, 3),
('Auror', 70000, 4),
('Career Advisor', 30000, 5),
('Obliviator', 20000, 6),
('Senior Liaison Minister', 60000, 7),
('Lead Liaison Officer', 40000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Hermione', 'Granger', 1, 1),
('Dolores', 'Umbridge', 2, null),
('Harry', 'Potter', 3, 2),
('Ronald', 'Weasley', 4, null),
('Cornelius', 'Fudge', 5, 3),
('Arnold', 'Peasegood', 6, null),
('Bartemius', 'Crouch', 7, 4),
('Gareth', 'Greengrass', 8, null);