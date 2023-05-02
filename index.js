// Importing the inquirer package
const inquirer = require('inquirer');

// Importing the queries module
const queries = require('./db/queries');

init();
async function init(){
  console.log("welcome to the employee tracker");
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
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    .then(answer => {
      let choice = answer.action;
      switch (choice) {
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
        case 'Update an employee role':
          updateEmployeeRole();
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
function viewDepartments(){
  queries.findAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(()=> start())
}

// view roles function
function viewRoles(){
  queries.findAllRoles()
    .then(([rows]) => {
      let roles = rows
      console.table(roles)
    })
    .then(()=> start())
}

// view employees function
function viewEmployees(){
  queries.findAllEmployees()
    .then(([rows]) => {
      let employees = rows
      console.table(employees)
    })
    .then(()=> start())
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
function addRole(){
  queries.findAllDepartments()
  .then(([rows])=> {
    let departments = rows;
    const departmentChoice = departments.map(({id, name})=> ({
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
        message:'Which department does this role belong to?',
        choices: departmentChoice
      }
    ])
    .then (role => {
      queries.createRole(role)
      .then(()=> console.log("Added role to the database"))
      .then (()=> start())
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