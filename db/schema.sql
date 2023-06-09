-- Dropes the database if exists
DROP DATABASE IF EXISTS managers_DB;

-- creates the database
CREATE DATABASE managers_DB;

-- use the employee_db database
USE managers_DB;


-- creates the table named department within the employee_db database
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);


-- creates the table named role within the employee_db database
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) 
  REFERENCES department (id)
);


-- creates the table named employee within the employee_db database
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  FOREIGN KEY (role_id) 
  REFERENCES role (id),
  FOREIGN KEY (manager_id) 
  REFERENCES employee (id)
);

-- -- creaate a table named manager within the employee_db database
-- CREATE TABLE manager (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INT NOT NULL,
--   FOREIGN KEY (role_id) 
--   REFERENCES role (id)
-- );