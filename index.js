const inquirer = require('inquirer');
const { findAllRoles } = require('./db/util');
// const db = require('./db');
const db = require('./db/util');
require('console.table');
// using promisify from util
// const util = require('util');
// const { todoQuestions } = require('./helper/util');
// const PORT = process.env.PORT || 3001;

// const roles = ['Engineer', 'Finance', 'Legal', 'Sales', 'Service'];
// const [Engineer, Finance, Legal, Sales, Service] = roles;

// init to ask user what to do
// then go to different section, adding, viewing, or updating
// prompt to user for info for adding and updating
// gather those input and put it into db
// back to init
init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'todo',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
            }
        ])
        .then((response) => {
            console.log(response.todo);
            if (response.todo === 'View All Employees') {
                viewAllEmployees();
            } else if (response.todo === 'Add Employee') {
                addEmployee();
            } else if (response.todo === 'Update Employee Role') {
                updateEmployeeRole();
            } else if (response.todo === 'View All Roles') {
                viewAllRoles();
            } else if (response.todo === 'Add Role') {
                addRole();
            } else if (response.todo === 'View All Departments') {
                viewAllDepartments();
            } else if (response.todo === 'Add Department') {
                addDepartment();
            } else if (response.todo === 'Quit') {
                Connection.end();
            }
        })
}

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name for the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name for the employee?',
        }
    ])
    .then((response) => {
        let first = response.firstName;
        let last = response.lastName;
        db.findAllRoles().then(([rows]) => {
            //[[id, first_name, last_name, role, department], [id, first_name, last_name, role, department]]
            let roles = rows;
            const roleChoices = roles.map(({id, title}) => ({
                name: title,
                value: id
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'What is the employee\'s role?',
                    choices: roleChoices
                }
            ])
            .then(response => {
                let roleId = response.roleId;
                db.findAllEmployees()
                .then(([rows]) => {
                    // rows
                    let employees = rows;
                    const managerChoices = employees.map(({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    managerChoices.unshift({name:'none', value: NULL})
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'managerId',
                            message: 'Who is the employee\'s manager?',
                            choices: managerChoices
                        }
                    ])
                    .then(response => {
                        let employee = {
                            manger_id: response.managerId,
                            role_id: roleId,
                            first_name: first,
                            last_name: last
                        }
                        db.createEmployee (employee);
                    })
                    .then(()=> {
                        console.log('employee has added to the data base.')
                    })
                    .then(() => init())
                })
            })
        })
    })
}

updateEmployeeRole = () => {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Which employee you would like to update?',
                choices: employeeChoices
            }
        ])
        .then((response) => {
            let employeeId = response.employeeId;
            db.findAllRoles
        })
    })
}










addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
        }
    ])
    .then((response) => {
        db.query('INSERT INTO department VALUES (?)', response.department, (req, res) => {
            if (err) console.error(err);
        })
    })
}

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to?',
            choices: []
        }
    ])
    .then((response) => {
        db.query('INSERT INTO department VALUES (?)', response.department, (req, res) => {
            if (err) console.error(err);
        })
    })
}

// id, first name, last name, title, department, salary, manager
viewAllEmployees = () => {
    db.findAllEmployees()
    .then(([rows])=> {
        let employee = rows;
        console.table(employee);
    })
    .then(()=> init());
}

// id title department salary
viewAllRoles = () => {
    db.query('SELECT role.id AS id, title AS role, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id', 
    (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result);

        }
    })
}

viewAllDepartments = () => {
    db.query('SELECT department.id AS id, name FROM department', (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result);
        }
    })
}


init();

            // switch (response.todo) {
            //     case 'View All Employee':
            //         viewing('View All Employees')
            //     case 'Add Employee':
            //         adding('Add Employee');
            //     case 'Update Employee Role':
            //         updating();
            //     case 'View All Roles':
            //         viewing('View All Roles')
            //     case 'Add Role':
            //         adding('Add Employee');
            //     case 'View All Departments':
            //         viewing('View All Departments')
            //     case 'Add Department':
            //         adding('Add Employee');
            //     case 'Quit':
            //         Connection.end();
            //     default: 
            //         console.log('in switch');
            // }