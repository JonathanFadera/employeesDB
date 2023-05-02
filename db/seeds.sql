INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Doe', 2, 1),
('Mike', 'Smith', 3, 2),
('Sally', 'Jones', 4, 3),
('Bill', 'Johnson', 5, 4),
('Bob', 'Smith', 6, 5),
('Joe', 'Doe', 7, 6),
('Sue', 'Smith', 8, 7);
```