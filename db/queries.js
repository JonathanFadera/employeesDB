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

  // View employees by manager
  findAllEmployeesByManager(managerId) {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name 
                 FROM employee 
                 LEFT JOIN role ON employee.role_id = role.id 
                 LEFT JOIN department ON role.department_id = department.id 
                 LEFT JOIN employee manager ON employee.manager_id = manager.id 
                 WHERE manager.id = ?`;

    return connection.query(sql, [managerId]);
  }

  // View employees by department
  findAllEmployeesByDepartment(departmentId) {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary
                  FROM employee
                  LEFT JOIN role ON employee.role_id = role.id
                  LEFT JOIN department ON role.department_id = department.id
                  WHERE department.id = ?`;
                  return connection.query(sql, [departmentId]);
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

  // add a manager 
  createManager(manager) {
    return this.connection.promise().query("INSERT INTO employee SET ?", manager);
  }
  

  // Update an employee's role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id =? WHERE id =?",
      [roleId, employeeId]
    );
  }

  // Find all possible managers
  findAllPossibleManagers(employeeId) {
    return this.connection.promise().query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  // Update an employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
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
  findAllManagers() {
    return this.connection.promise().query(
      "SELECT id, first_name, last_name FROM employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)"
    );
  }

  // Delete a department
  deleteDepartment(departmentId) {
    return this.connection.promise().query("DELETE FROM department WHERE id =?", departmentId);
  }

  // Delete a role
  deleteRole(roleId) {
    return this.connection.promise().query("DELETE FROM role WHERE id =?", roleId);
  }
  // Delete an employee
  deleteEmployee(employeeId) {
    return this.connection.promise().query("DELETE FROM employee WHERE id =?", employeeId);
  }
}

// // View the total utilized budget of a department -- ie the combined salaries of all employees in that department
// const queries = {
//   findAllDepartments() {
//     return connection.promise().query('SELECT * FROM department');
//   },

//   // Add the viewDepartmentBudgets function here
//   viewDepartmentBudgets(departmentId) {
//     const sql = `SELECT department.name AS department, SUM(role.salary) AS budget
//                   FROM employee
//                   LEFT JOIN role ON employee.role_id = role.id
//                   LEFT JOIN department ON role.department_id = department.id
//                   WHERE department.id = ?
//                   GROUP BY department.id`;
//     return connection.promise().query(sql, [departmentId]);
//   }
// };


module.exports = new DB(connection);