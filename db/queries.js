// const connection = require('./connection');

// function viewEmployees() {
//     console.log('Viewing all employees...\n');

//     var query =
//         `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
//         FROM employee
//         LEFT JOIN role ON employee.role_id = role.id
//         LEFT JOIN department ON role.department_id = department.id
//         LEFT JOIN employee manager ON manager.id = employee.manager_id`;

//     connection.query(query, function (err, res) {
//         if (err) throw err;

//         console.table(res);
//         console.log("Employees viewed!\n");
//         mainMenu();
//     });
//     }

// function viewRoles() {
//     console.log('Viewing all roles...\n');

//     var query =
//         `SELECT role.id, role.title, department.name AS department, role.salary 
//         FROM role
//         LEFT JOIN department ON role.department_id = department.id`;

//     connection.query(query, function (err, res) {
//         if (err) throw err;

//         console.table(res);
//         console.log("Roles viewed!\n");
//         mainMenu();
//     });
// }

// function viewDepartments() {
//     console.log('Viewing all departments...\n');

//     var query =
//         `SELECT department.id, department.name 
//         FROM department`;

//     connection.query(query, function (err, res) {
//         if (err) throw err;

//         console.table(res);
//         console.log("Departments viewed!\n");
//         mainMenu();
//     });
// }