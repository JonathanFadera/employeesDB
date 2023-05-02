USE employee_db;

INSERT INTO department (name) VALUES
('Minister for Magic and Support Staff'),
('Department of Magical Law Enforcement'),
('Department of Magical Accidents and Catastrophes'),
('Department of Magical Internal Magical Cooperation');


INSERT INTO role (title, salary, department_id) VALUES
('Minister for Magic', 140000, 1),
('Senior Undersecretary', 80000, 1),
('Head of the Department', 200000, 2),
('Auror', 130000, 2),
('Carreer Advisor', 70000, 3),
('Obliviator', 60000, 3),
('Senior Liaison Minister', 80000, 4),
('Lead Liaison Officer', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Hermione', 'Granger', 1, 1),
('Dolores', 'Umbridge', 2, 1),
('Harry', 'Potter', 3, 2),
('Ronald', 'Weasley', 4, 3),
('Cornelius', 'Fudge', 5, 4),
('Arnold', 'Peasegood', 6, 5),
('Bartemius', 'Crouch', 7, 6),
('Gareth', 'Greengrass', 8, 7);