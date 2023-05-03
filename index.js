// Importing the inquirer package
const inquirer = require('inquirer');

// Importing the queries module
const queries = require('./db/queries');

init();
async function init() {
  console.log("Welcome to the Hogwarts Database!");
  await start();
}
// prompt user to select an action to perform
function start() {
  inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Add an employee manager',
        'Update an employee manager',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View department budgets',
        'Exit'
      ]
    }
  ])
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Add an employee manager':
          addEmployeeManager();
          break;
        case 'Update an employee manager':
          updateEmployeeManager();
          break;
        case 'Delete a department':
          deleteDepartment();
          break;
        case 'Delete a role':
          deleteRole();
          break;
        case 'Delete an employee':
          deleteEmployee();
          break;
        case 'View department budgets':
          viewDepartmentBudgets();
          break;
        case 'Exit':
          console.log("Goodbye!");
          process.exit();
          break;
        // default:
        // exit();
      }
    })
    .catch(error => {
      console.error(error);
      process.exit();
    })
}

// view department function
function viewDepartments() {
  queries.findAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(() => start())
}

// view roles function
function viewRoles() {
  queries.findAllRoles()
    .then(([rows]) => {
      let roles = rows
      console.table(roles)
    })
    .then(() => start())
}

// view employees function
function viewEmployees() {
  queries.findAllEmployees()
    .then(([rows]) => {
      let employees = rows
      console.table(employees)
    })
    .then(() => start())
}

// add department function
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      let name = answer;
      queries
        .createDepartment(name)
        .then(() => console.log("Added department to the database."))
        .then(() => start());
    });
}

// add role function
function addRole() {
  queries.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoice = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }))
      inquirer.prompt([
        {
          name: 'title',
          message: 'What is the name of the role?',
        },
        {
          name: 'salary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Which department does this role belong to?',
          choices: departmentChoice
        }
      ])
        .then(role => {
          queries.createRole(role)
            .then(() => console.log("Added role to the database"))
            .then(() => start())
        })
    })

}

// add employee function
function addEmployee() {
  queries.findAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    inquirer
      .prompt([
        {
          name: "first_name",
          message: "What is the first name of the employee?",
        },
        {
          name: "last_name",
          message: "What is the last name of the employee?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the role of the employee?",
          choices: roleChoices,
        },
      ])
      .then((employee) => {
        queries
          .createEmployee(employee)
          .then(() => console.log("Added Employee to the database."))
          .then(() => start());
      });
  });
}

// // add an employee manager function
// function addEmployeeManager(){
//   queries.findAllEmployees()
//   .then(([rows])=> {
//     let employees = rows;
//     const employeeChoices = employees.map(({id, first_name, last_name})=> ({
//       name: `${first_name} ${last_name}`,
//       value: id,
//     }
//     ))
//     inquirer.prompt([
//       {
//         type: 'list',
//         name: 'id',
//         message:'Which employee would you like to set with a manager?',
//         choices: employeeChoices
//       }
//     ])
//     .then (employee => {
//       queries.findAllPossibleManagers(employee)
//       .then(([rows])=> {
//         let managers = rows;
//         const managerChoices = managers.map(({id, first_name, last_name})=> (
//           {
//             name: `${first_name} ${last_name}`,
//             value: id,
//           }
//         ))
//         inquirer.prompt([
//           {
//             type: 'list',
//             name: 'manager_id',
//             message:"Who is the employee's manager?",
//             choices: managerChoices
//           }
//         ])
//         .then (manager => {
//           queries.updateEmployeeManager(employee, manager)
//           .then(()=> console.log("Updated employee's manager"))
//           .then (()=> start())
//         })
//       })
//     })
//   })
// }


// update employee manager function
function updateEmployeeManager() {
  queries.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }
      ))
      inquirer.prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Which employee would you like to update?',
          choices: employeeChoices
        }
      ])
        .then(employee => {
          queries.findAllManagers(employee)
            .then(([rows]) => {
              let managers = rows;
              const managerChoices = managers.map(({ id, first_name, last_name }) => (
                {
                  name: `${first_name} ${last_name}`,
                  value: id,
                }
              ))
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'manager_id',
                  message: "Who is the employee's manager?",
                  choices: managerChoices
                }
              ])
                .then(manager => {
                  queries.updateEmployeeManager(employee, manager)
                    .then(() => console.log("Updated employee's manager"))
                    .then(() => start())
                })
            })
        })
    })
}


// delete department function
function deleteDepartment() {
  queries.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Which department would you like to delete?',
          choices: departmentChoices
        }
      ])
        .then(department => {
          queries.deleteDepartment(department)
            .then(() => console.log("Department deleted"))
            .then(() => start())
        })
    })
}

// delete role function
function deleteRole() {
  queries.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Which role would you like to delete?',
          choices: roleChoices
        }
      ])
        .then(role => {
          queries.deleteRole(role)
            .then(() => console.log("Deleted role"))
            .then(() => start())
        })
    })
}

// delete employee function
function deleteEmployee() {
  queries.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Which employee would you like to delete?',
          choices: employeeChoices
        }
      ])
        .then(employee => {
          queries.deleteEmployee(employee)
            .then(() => console.log("Deleted employee"))
            .then(() => start())
        })
    })
}


// function to view department budgets
function viewDepartmentBudgets() {
  queries.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Which department would you like to view?',
          choices: departmentChoices
        }
      ])
        .then(department => {
          queries.viewDepartmentBudgets(department)
            .then(() => console.log("Viewed department budgets"))
            .then(() => start())
        })
    })
}