USE managers_DB;

INSERT INTO department (name) VALUES
('Ministry for Magic'),
('Magical Law Enforcement'),
('Magical Catastrophes'),
('Magical Internal Coop');

INSERT INTO role (title, salary, department_id) VALUES
('Minister for Magic', 60000, 1),
('Senior Undersecretary', 40000, 1),
('Head of the Department', 90000, 2),
('Auror', 70000, 2),
('Career Advisor', 30000, 3),
('Obliviator', 20000, 3),
('Senior Liaison Minister', 60000, 4),
('Lead Liaison Officer', 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Hermione', 'Granger', 1, NULL),
('Dolores', 'Umbridge', 2, 1),
('Harry', 'Potter', 3, NULL),
('Ronald', 'Weasley', 4, 3),
('Cornelius', 'Fudge', 5, NULL),
('Arnold', 'Peasegood', 6, 5),
('Bartemius', 'Crouch', 7, NULL),
('Gareth', 'Greengrass', 8, 7);