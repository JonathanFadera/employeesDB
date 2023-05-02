const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // View all departments
  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department"
    );
  }

  // View all roles
  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id"
    );
  }

  // View all employees
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on employee.manager_id = manager.id;"
    );
  }

  // Add a department
  createDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }

  // Add a role
  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  // Add an employee
  createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }

  // Update an employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  // Find all employees by manager
  findAllEmployeesByManager(managerId) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id WHERE manager_id = ?",
      managerId
    );
  }

  // Find all employees by department
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id WHERE department_id = ?",
      departmentId
    );
  }

  // Find all managers
  findAllManagers(employeeId) {
    return this.connection.promise().query(
      "SELECT DISTINCT e.id, e.first_name, e.last_name FROM employee e WHERE e.id != ? AND e.id = e.manager_id",
      employeeId
    );
  }
}

module.exports = new DB(connection);