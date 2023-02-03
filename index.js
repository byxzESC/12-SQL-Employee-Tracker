const inquirer = require('inquirer');
const { findManager } = require('./db/dbConstrutor');
const db = require('./db/dbConstrutor');
require('console.table');

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
                changeEmployeeRole();
            } else if (response.todo === 'View All Roles') {
                viewAllRoles();
            } else if (response.todo === 'Add Role') {
                addRole();
            } else if (response.todo === 'View All Departments') {
                viewAllDepartments();
            } else if (response.todo === 'Add Department') {
                addDepartment();
            } else if (response.todo === 'Quit') {
                db.end();
            }
        })
}

// --------- Viewing data base
viewAllEmployees = () => {
    // id, first name, last name, title, department, salary, manager
    db.findAllEmployees()
    .then(([rows]) => {
        let employee = rows;
        // console.log(employee[1].manager)
        // const allEmployee = employee.map( ({id, first_name, last_name, role, department, salary, manager}) => {
        //     const managerName = manager !== null ?  db.findManager(manager) : null;
        //     return {
        //     id: id,
        //     first_name: first_name,
        //     last_name: last_name,
        //     title: role,
        //     department: department,
        //     salary: salary,
        //     manager: managerName
        //     }
        // });
        // const resolvedEmployees = await Promise.all(allEmployee);
        console.table(employee);
    })
    .then(() => init());
}

viewAllRoles = () => {
    // id title department salary
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);
    })
    .then(() => init());
}

viewAllDepartments = () => {
    db.findAllDepartment()
    .then(([rows])=> {
        let departments = rows;
        console.table(departments)
    })
    .then(() => init());
}

// --------- adding to data base
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
                    let employees = rows;
                    const managerChoices = employees.map(({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    managerChoices.unshift({name:'none', value: null})
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
                            manager_id: response.managerId,
                            role_id: roleId,
                            first_name: first,
                            last_name: last
                        }
                        db.createEmployee (employee);
                    })
                    .then(()=> {
                        console.log('----- New employee has added to the data base.')
                        init();
                    })
                    // .then(() => )
                })
            })
        })
    })
}

// -------- add a new department to the database
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
        }
    ])
    .then((response) => {
        db.createDepartment(response.department);
    })
    .then(() => {
        console.log('----- New department has added to the data base.');
        init()
    })
}

// -------- add a new role to the database
addRole = () => {
    db.findAllDepartment()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({id, department}) => {
            return {name: department, value: id};
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department does the role belongs to?',
                choices: departmentChoices
            }
        ])
        .then((response) => {
            let role = {
                title: response.title,
                salary: response.salary,
                department_id: response.departmentId
            }
            db.createRole(role);
        })
        .then(() => {
            console.log(`----- New Role has added to the database.`);
            init();
        });
    })
}

// ------------ update employee role
changeEmployeeRole = () => {
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
            let employee = response.employeeId;
            db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({id, title}) => ({
                    name: title,
                    value: id
                }))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Which role do you want to assign the selected employee?',
                        choices: roleChoices
                    }
                ])
                .then((response) => {
                    let role = response.roleId;
                    db.updateEmployeeRole(employee, role);
                })
                .then(()=> {
                    console.log('Updated employee\'s role');
                    init();
                })
            })
        })
    })
}




init();