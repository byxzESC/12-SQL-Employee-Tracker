const connection = require('./connection');

class DB {
    constructor (connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id AS id, first_name, last_name, role.title AS role, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;'
        )
    }

    createEmployee (employee) {
        return this.connection.promise().query(
            'INSERT INTO employee SET ?', employee
        )
    }

    findAllRoles () {
        return this.connection.promise().query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;'
        )
    }
}

module.exports = new DB(connection);



// // // using promisify from util
// // const util = require('util');

// // const todoQuestions = util.promisify(Questions);

// // module.exports = { todoQuestions };


// // add to db
// adding = (todo) => {
//     // let tableName = '' ;
//     // let columnVariable = '';
//     // let rowContent = '';

//     if (todo === 'Add Employee') {
//         // tableName = 'employee';

//         inquirer.prompt([
//             {
//                 type:'input',
//                 name: 'firstName',
//                 message: 'What is the first name of the employee?'
//             },
//             {
//                 type:'input',
//                 name: 'lastName',
//                 message: 'What is the last name of the employee?'
//             }
//         ]).then((input) => {
//             let values = [input.firstName, input.lastName];
//             db.query('INSERT INTO employee (first_name, last_name) VALUES ?', values, (err, result) => {
//                 if (err) throw err;
//                 console.log(`added ${values} to employee`);
//             })
//         })
//     }
//     if (todo === 'Add Role') {
//         // tableName = 'role';

//         inquirer.prompt([
//             {
//                 type:'input',
//                 name: 'title',
//                 message: 'What is the title of the role?'
//             },
//             {
//                 type:'input',
//                 name: 'salary',
//                 message: 'What is the salary of the role?'
//             }
//         ]).then((input) => {
//             let values = [input.title, input.salary];
//             db.query('INSERT INTO employee (title, salary) VALUES ?', values, (err, result) => {
//                 if (err) throw err;
//                 console.log(`added ${values} to role`);
//             })
//         })
//     }
//     if (todo === 'Add Department') {
//         // tableName = 'department';

//         inquirer.prompt([
//             {
//                 type:'input',
//                 name: 'department',
//                 message: 'What is the name of the department?'
//             }
//         ]).then((input) => {
//             db.query('INSERT INTO department VALUES (?)', input.department, (err, result) => {
//                 if (err) throw err;
//                 console.log(`added ${input.department} to department`);
//             })
//         })
//     }

//     // [tableName, [columnVariables], [rowContent]]

// }

// //input employee id, what role
// // output updated employee 
// updateEmployeeRole = (todo) => {
//     //input employee id, what role
//     const employee = [];
//     db.query('SELECT id, first_name, last_name FROM employee', function (err, result) {
//         if (err) console.error(err);
//         result.map((e) => {
//             return { name: e.first_name + ' ' + e.last_name, id: e.id };
//         })
//     })

//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'employeeId',
//             message: 'Who do you want to update?',
//             choices: [employee]
//         }
//     ]).then((response) => {
//         // we'll get employee id and role from prompt
//     })
//     db.query('UPDATE employee SET title = ? WHERE id = ?')
// }
