USE employee_db;

INSERT INTO department (name) VALUES
('Minister for Magic'),
('Magical Law Enforcement'),
('Magical Catastrophes'),
('Magical Internal Coop');


INSERT INTO role (title, salary, department_id) VALUES
('Minister for Magic', 140000, 1),
('Senior Undersecretary', 80000, 1),
('Head of the Department', 200000, 2),
('Auror', 130000, 2),
('Career Advisor', 70000, 3),
('Obliviator', 60000, 3),
('Senior Liaison Minister', 80000, 4),
('Lead Liaison Officer', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Hermione', 'Granger', 1, 1),
('Dolores', 'Umbridge', 2, null),
('Harry', 'Potter', 3, 2),
('Ronald', 'Weasley', 4, null),
('Cornelius', 'Fudge', 5, 3),
('Arnold', 'Peasegood', 6, null),
('Bartemius', 'Crouch', 7, 4),
('Gareth', 'Greengrass', 8, null);