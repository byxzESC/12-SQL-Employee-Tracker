const connection = require('../config/connection');

class DB {
    constructor (connection) {
        this.connection = connection;
        this.promise = this.connection.promise();
    }

    // budge() {
    //     return this.promise.query(
    //         `SELECT department, SUM(salary) as total_salary
    //         FROM role
    //         GROUP BY department;`
    //     )
    // }

    findAllEmployees () {
        return this.promise.query(
            `SELECT employee.id AS id, 
            first_name, 
            last_name, 
            role.title AS role, 
            department.name AS department, 
            role.salary, 
            manager_id AS manager 
            FROM employee 
            JOIN role ON employee.role_id = role.id 
            JOIN department ON role.department_id = department.id 
            ORDER BY employee.id;`,
        )
    }

    findManager (managerId) {
        return this.promise.query(
            `SELECT first_name, 
            last_name 
            FROM employees 
            WHERE role_id = (
                SELECT manager_id 
                FROM employees 
                WHERE id = ?)`, [managerId], (err, response) => {
                    if (err) console.error(err);
                    let managerName = `${response[0].first_name} ${response[0].last_name}`;
                    return managerName
                }
        )
    }
        // this.connection.query(
        //     `SELECT first_name, 
        //     last_name 
        //     FROM employee 
        //     WHERE role_id = (
        //         SELECT manager_id 
        //         FROM employees 
        //         WHERE id = ?)`, [managerId], (err, response) => {
        //             if (err) console.error(err);
        //             let managerName = `${response[0].first_name} ${response[0].last_name}`;
        //             return managerName;
        //         }
        // )

        // .then((response) => {
        //     if (err) console.error(err);
        //     let managerName = `${response[0].first_name} ${response[0].last_name}`;
        //     return managerName;
        // });
    // }

    createEmployee (employee) {
        return this.promise.query(
            'INSERT INTO employee SET ?;', employee
        )
    }

    updateEmployeeRole (employeeId, roleId) {
        return this.promise.query(
            'UPDATE employee SET role_id = ? WHERE id = ?;', [roleId, employeeId]
        )
    }

    findAllRoles () {
        return this.promise.query(
            `SELECT role.id, 
            role.title, 
            department.name AS department, 
            role.salary 
            FROM role 
            LEFT JOIN department 
            ON role.department_id = department.id;`
        )
    }

    createRole (role) {
        return this.promise.query(
            'INSERT INTO role SET ?;', role
        )
    }

    findAllDepartment () {
        return this.promise.query(
            'SELECT id, name AS department FROM department;'
        )
    }

    createDepartment (department) {
        return this.promise.query(
            //department is a string
            'INSERT INTO department(name) VALUES (?);', department
        )
    }

    end () {
        this.connection.end();
    }
    
}

module.exports = new DB(connection);