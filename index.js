const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// using promisify from util
const util = require('util');
const { todoQuestions } = require('./helper/util');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const roles = ['Engineer', 'Finance', 'Legal', 'Sales', 'Service'];
const [Engineer, Finance, Legal, Sales, Service] = roles;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'asdf',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db.')
);

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
            switch (response.todo) {
                case 'View All Employee':
                    todoQuestions('View All Employee')
                    .then(() => init());
                case 'Add Employee':

                case 'Update Employee Role':

                case 'View All Roles':

                case 'Add Role':

                case 'View All Departments':

                case 'Add Department':

                case 'Quit':
                    Connection.end();
            }
        })
}

// add to db
adding = (todo) => {
    

    if (todo === 'Add Employee') {
        // What is the first name of the employee?
        // What is the last name of the employee?
    }
    if (todo === 'Add Role') {
        // What is the name of the role?
        // What is the salary of the role?
    }
    if (todo === 'Add Department') {
        // What is the name of the department?
    }

    db.query('INSERT INTO ? (?) VALUES ')

}

viewing = (todo) => {
    const tableToView = '';
    if (todo === 'View All Employees') {
        tableToView = 'employee';
    }
    if (todo === 'View All Departments') {
        tableToView = 'department';
    }

    db.query('SELECT * FROM ?', tableToView, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result);
        }
    })
}

updateEmployeeRole = (todo) => {

}




init();