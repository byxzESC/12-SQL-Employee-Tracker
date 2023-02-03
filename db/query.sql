-- SELECT department.name AS 'Department', title, salary
-- FROM department
-- JOIN role
-- ON department.id = role.department_id;

-- SELECT employee.id AS 'id', first_name, last_name, role.title, role.salary
-- FROM role
-- JOIN employee ON role.id = employee.role_id;

-- SELECT employee.id AS id, first_name, last_name, role.title AS role, department.name AS department, salary
-- FROM employee 
-- JOIN role 
-- ON employee.role_id = role.id
-- JOIN department 
-- ON role.department_id = department.id;

-- SELECT employee.id AS id, 
--             first_name, 
--             last_name, 
--             role.title AS role, 
--             department.name AS department, 
--             role.salary, 
--             manager_id AS manager 
--             FROM employee 
--             JOIN role ON employee.role_id = role.id 
--             JOIN department ON role.department_id = department.id 
--             ORDER BY employee.id;

-- UPDATE employee SET role_id = 3 WHERE id = 8;

SELECT department, SUM(role.salary) as total_salary
    FROM role
    GROUP BY department;