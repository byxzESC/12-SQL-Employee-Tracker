const inquirer = require('inquirer');

const options = [];
const roles = ['Engineer', 'Finance', 'Legal', 'Sales', 'Service'];
const [Engineer, Finance, Legal, Sales, Service] = roles;

inquirer
    prompt([
    {
        type: 'list',
        name: 'todo',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
    ])
    .then((response) => {
        switch (response.todo) {
            case 'View All Employee':
            case 'Add Employee':
            case 'Update Employee Role':
            case 'View All Roles':
            case 'Add Role':
            case 'View All Departments':
            case 'Add Department':
            case 'Quit':
        }
    })