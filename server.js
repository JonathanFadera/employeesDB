const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeesDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the employeesDB database.');
    start();
}
);

const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to the Employee Tracker! What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Delete an employee',
                'Delete a department',
                'Delete a role',
                'Update an employee role',
                'View employees by manager',
                'View employees by department',
                'View the total utilized budget of a department',
                'Exit'
            ]
        })
        .then((answer) => {
            const { action } = answer;

            if (choices === "View all employees") {
                viewEmployees();
            }

            if (choices === "View all departments") {
                viewDepartments();
            }
            if (choices === "View all roles") {
                viewRoles();
            }
            if (choices === "Add an employee") {
                addEmployee();
            }
            if (choices === "Add a department") {
                addDepartment();
            }
            if (choices === "Add a role") {
                addRole();
            }
            if (choices === "Delete an employee") {
                deleteEmployee();
            }
            if (choices === "Delete a department") {
                deleteDepartment();
            }
            if (choices === "Delete a role") {
                deleteRole();
            }
            if (choices === "Update an employee role") {
                updateEmployeeRole();
            }
            if (choices === "View employees by manager") {
                viewEmployeesByManager();
            }
            if (choices === "View employees by department") {
                viewEmployeesByDepartment();
            }
            if (choices === "View the total utilized budget of a department") {
                viewBudget();
            }
            if (choices === "Exit") {
                connection.end();
            }
        });
};

// function to view all employees
const viewEmployees = () => {
    console.log('Viewing all employees...\n');
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

// function to view all departments
const viewDepartments = () => {
    console.log('Viewing all departments...\n');
    const sql = `SELECT * FROM department`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// function to view all roles
const viewRoles = () => {
    console.log('Viewing all roles...\n');
    const sql = `SELECT * FROM role`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// function to add an employee
const addEmployee = () => {
    console.log('Adding an employee..\n');
    const sql = `SELECT * FROM role`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employee\'s first name?',
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log('Please enter a first name.');
                        return false;
                    }
                }
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employee\'s last name?',
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log('Please enter a last name.');
                        return false;
                    }
                }
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    const roleArray = [];
                    res.forEach(({ title }) => {
                        roleArray.push(title);
                    });
                    return roleArray;
                },
                message: 'What is the employee\'s role?'
            }
        ])
            .then((answer) => {
                let role_id;
                res.forEach((role) => {
                    if (role.title === answer.role) {
                        role_id = role.id;
                    }
                });
                const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
                connection.query(sql, [answer.first_name, answer.last_name, role_id], function (err, res) {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    start();
                });
            }
            );
    });
};

// function to add a department
const addDepartment = () => {
    console.log('Adding a department...\n');
    inquire.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department?',
            validate: (input) => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a department name.');
                    return false;
                }
            }
        }
    ])
        .then((answer) => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            connection.query(sql, answer.name, function (err, res) {
                if (err) throw err;
                console.log('Department added successfully!');
                start();
            });
        });
}
// function to add a role
const addRole = () => {
    console.log('Adding a role...\n');
    const sql = `SELECT * FROM department`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of the role?',
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log('Please enter a role name.');
                        return false;
                    }
                }
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?',
                validate: (input) => {
                    if (input) {
                        return true;
                    } else {
                        console.log('Please enter a salary.');
                        return false;
                    }
                }
            },
            {
                name: 'department',
                type: 'list',
                choices: function () {
                    const departmentArray = [];
                    res.forEach(({ name }) => {
                        departmentArray.push(name);
                    });
                    return departmentArray;
                },
                message: 'What is the department of the role?'
            }
        ])
            .then((answer) => {
                let department_id;
                res.forEach((department) => {
                    if (department.name === answer.department) {
                        department_id = department.id;
                    }
                }
                );
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                connection.query(sql, [answer.title, answer.salary, department_id], function (err, res) {
                    if (err) throw err;
                    console.log('Role added successfully!');
                    start();
                }
                );
            }
            );
    });
};

// function to delete an employee
const deleteEmployee = () => {
    console.log('Deleting an employee...\n');
    const sql = `SELECT * FROM employee`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: function () {
                    const employeeArray = [];
                    res.forEach(({ first_name, last_name }) => {
                        employeeArray.push(`${first_name} ${last_name}`);
                    });
                    return employeeArray;
                },
                message: 'Which employee would you like to delete?'
            }
        ])
            .then((answer) => {
                let employee_id;
                res.forEach((employee) => {
                    if (`${employee.first_name} ${employee.last_name}` === answer.employee) {
                        employee_id = employee.id;
                    }
                }
                );
                const sql = `DELETE FROM employee WHERE id = ?`;
                connection.query(sql, employee_id, function (err, res) {
                    if (err) throw err;
                    console.log('Employee deleted successfully!');
                    start();
                }
                );
            }
            );
    });
};

// function to delete a department
const deleteDepartment = () => {
    console.log('Deleting a department...\n');
    const sql = `SELECT * FROM department`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'department',
                type: 'list',
                choices: function () {
                    const departmentArray = [];
                    res.forEach(({ name }) => {
                        departmentArray.push(name);
                    });
                    return departmentArray;
                },
                message: 'Which department would you like to delete?'
            }
        ])
            .then((answer) => {
                let department_id;
                res.forEach((department) => {
                    if (department.name === answer.department) {
                        department_id = department.id;
                    }
                }
                );
                const sql = `DELETE FROM department WHERE id = ?`;
                connection.query(sql, department_id, function (err, res) {
                    if (err) throw err;
                    console.log('Department deleted successfully!');
                    start();
                }
                );
            }
            );
    });
};

// function to delete a role
const deleteRole = () => {
    console.log('Deleting a role...\n');
    const sql = `SELECT * FROM role`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    const roleArray = [];
                    res.forEach(({ title }) => {
                        roleArray.push(title);
                    });
                    return roleArray;
                },
                message: 'Which role would you like to delete?'
            }
        ])
            .then((answer) => {
                let role_id;
                res.forEach((role) => {
                    if (role.title === answer.role) {
                        role_id = role.id;
                    }
                }
                );
                const sql = `DELETE FROM role WHERE id = ?`;
                connection.query(sql, role_id, function (err, res) {
                    if (err) throw err;
                    console.log('Role deleted successfully!');
                    start();
                }
                );
            }
            );
    });
};

// function to update an employee's role
const updateEmployeeRole = () => {
    console.log('Updating an employee\'s role...\n');
    const sql = `SELECT * FROM employee`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: function () {
                    const employeeArray = [];
                    res.forEach(({ first_name, last_name }) => {
                        employeeArray.push(`${first_name} ${last_name}`);
                    });
                    return employeeArray;
                },
                message: 'Which employee would you like to update?'
            }
        ])
            .then((answer) => {
                let employee_id;
                res.forEach((employee) => {
                    if (`${employee.first_name} ${employee.last_name}` === answer.employee) {
                        employee_id = employee.id;
                    }
                }
                );
                const sql = `SELECT * FROM role`;
                connection.query(sql, function (err, res) {
                    if (err) throw err;
                    inquire.prompt([
                        {
                            name: 'role',
                            type: 'list',
                            choices: function () {
                                const roleArray = [];
                                res.forEach(({ title }) => {
                                    roleArray.push(title);
                                });
                                return roleArray;
                            },
                            message: 'What is the employee\'s new role?'
                        }
                    ])
                        .then((answer) => {
                            let role_id;
                            res.forEach((role) => {
                                if (role.title === answer.role) {
                                    role_id = role.id;
                                }
                            }
                            );
                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                            connection.query(sql, [role_id, employee_id], function (err, res) {
                                if (err) throw err;
                                console.log('Employee role updated successfully!');
                                start();
                            }
                            );
                        }
                        );
                });
            }
            );
    });
};

// function to update an employee's manager
const updateEmployeeManager = () => {
    console.log('Updating an employee\'s manager...\n');
    const sql = `SELECT * FROM employee`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: function () {
                    const employeeArray = [];
                    res.forEach(({ first_name, last_name }) => {
                        employeeArray.push(`${first_name} ${last_name}`);
                    });
                    return employeeArray;
                },
                message: 'Which employee would you like to update?'
            }
        ])
            .then((answer) => {
                let employee_id;
                res.forEach((employee) => {
                    if (`${employee.first_name} ${employee.last_name}` === answer.employee) {
                        employee_id = employee.id;
                    }
                }
                );
                const sql = `SELECT * FROM employee`;
                connection.query(sql, function (err, res) {
                    if (err) throw err;
                    inquire.prompt([
                        {
                            name: 'manager',
                            type: 'list',
                            choices: function () {
                                const managerArray = [];
                                res.forEach(({ first_name, last_name }) => {
                                    managerArray.push(`${first_name} ${last_name}`);
                                });
                                return managerArray;
                            },
                            message: 'Who is the employee\'s new manager?'
                        }
                    ])
                        .then((answer) => {
                            let manager_id;
                            res.forEach((manager) => {
                                if (`${manager.first_name} ${manager.last_name}` === answer.manager) {
                                    manager_id = manager.id;
                                }
                            }
                            );
                            const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
                            connection.query(sql, [manager_id, employee_id], function (err, res) {
                                if (err) throw err;
                                console.log('Employee manager updated successfully!');
                                start();
                            }
                            );
                        }
                        );
                });
            }
            );
    });
};
// function to view employees by manager
const viewEmployeesByManager = () => {
    console.log('Viewing employees by manager...\n');
    const sql = `SELECT * FROM employee`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'manager',
                type: 'list',
                choices: function () {
                    const managerArray = [];
                    res.forEach(({ first_name, last_name }) => {
                        managerArray.push(`${first_name} ${last_name}`);
                    });
                    return managerArray;
                },
                message: 'Which manager\'s employees would you like to view?'
            }
        ])
            .then((answer) => {
                let manager_id;
                res.forEach((manager) => {
                    if (`${manager.first_name} ${manager.last_name}` === answer.manager) {
                        manager_id = manager.id;
                    }
                }
                );
                const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            WHERE manager_id =?`;
                connection.query(sql, manager_id, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    start();
                }
                );
            }
            );
    });
};
// function to view employees by department
const viewEmployeesByDepartment = () => {
    console.log('Viewing employees by department...\n');
    const sql = `SELECT * FROM department`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: 'department',
                type: 'list',
                choices: function () {
                    const departmentArray = [];
                    res.forEach(({ name }) => {
                        departmentArray.push(name);
                    });
                    return departmentArray;
                },
                message: 'Which department\'s employees would you like to view?'
            }
        ])
            .then((answer) => {
                let department_id;
                res.forEach((department) => {
                    if (department.name === answer.department) {
                        department_id = department.id;
                    }
                }
                );
                const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            WHERE department_id =?`;
                connection.query(sql, department_id, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    start();
                }
                );
            }
            );
    });
};
// function to view the total utilized budget of a department
const viewBudget = () => {
    console.log('Viewing the total utilized budget of a department...\n');
    const sql = `SELECT department.name AS department, SUM(role.salary) AS utilized_budget
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    GROUP BY department.name`;
    connection.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
};