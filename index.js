const inquirer = require('inquirer');
//mysql library 
const mysql = require('mysql2');
//library for creating table
const cTable = require('console.table');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    //  Add MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)

);

// main function
function employeeTraker() {
    // prompt list of tod choices
    inquirer.prompt([

         {
            type: "list",
            message: "What do you like to do?",
            choices: [
                "View all departments", 
                "View all roles", 
                "View all employees", 
                "Add a department", 
                "Add a role", 
                "Add an employee", 
                "Update an employee role"
            ],
            name: "Todo"
        }]
        )
        //executing the function of ecach case 
        .then((response) =>{
            switch(response.Todo){
                case "View all departments": viewDepartments(); break;
                case "View all roles": viewRole(); break;
                case "View all employees": viewEmployee(); break;
                case "Add a department": addDepartment(); break;
                case "Add a role": addRole(); break;
                case "Add an employee": addEmployee(); break;
                case "Update an employee role": updateEmployeeRole(); break;
            
            }
        })
}

employeeTraker()
// function provide user with all departments
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, row) => {
        if (err) { console.log(err); } 
        else { console.log(`\n`); console.table(row); employeeTraker();}
});
}
// function to provide user with all roles u
function viewRole() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, row) => {
        if (err) { console.log(err); } 
        else { console.log(`\n`); console.table(row); employeeTraker(); }
});
} 
// function to provide user with all employess
function viewEmployee() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, row) => {
        if (err) { console.log(err); } 
        else {console.log(`\n`); console.table(row); 
        employeeTraker(); 
    }
});
} 
// fuction to add new department
function addDepartment() {
    inquirer.prompt(
    {
        type: "input",
        message: "what is the name of the department?",
        name: "newDepartment"
    })
    .then((response) =>{
        const sql = `INSERT INTO department (name) VALUES (?)`;    
        db.query(sql, response.newDepartment, (err, result) => {
            if (err) { console.log(err); }  
        else {console.log("New department was added"); 
        employeeTraker(); 
    }
});
} 
)}
// creation a list of department using query that select all from department table
const listDep = async () => {
    const sql = `SELECT * FROM department;`;
    const query = await db.promise().query(sql);
    
    let result = query[0].map(({name, id}) => ({
        name: `${name}`,
        value: id
    }));
    return result;
}
//creation a list of Roles using query that select all from role table
const listRole = async () => {
    const sql = `SELECT * FROM role;`;
    const query = await db.promise().query(sql);
    
    let result = query[0].map(({title,id}) => ({
        name: `${title}`,
        value: id
    }));
    return result;
}
// function to add a manager to an  employee
const manager = async () => {
    const sql = `SELECT	employee.id,
        CONCAT(employee.first_name, " ", employee.last_name) AS manager
    FROM employee
    WHERE employee.manager_id IS NULL;`;
    const query = await db.promise().query(sql);
    
    let result = query[0].map(({id, manager}) => ({
        name: `${manager}`,
        value: id
    }));
    result.push({name: 'No Manager Available', value: null});
    return result;
} 

//list of Employee
const listEmployee = async () => {
    const sql = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS employees FROM employee;`;
    const query = await db.promise().query(sql);

    let result = query[0].map(({id,employees}) => ({
        name: `${employees}`,
        value: id
    }));
   
    return result;
    
}

//add role to the role table

function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newRole',
            message: "What is the Name of the new Role?"
        },
        {
            type:'input',
            name: 'newSalary',
            message: "What is the new Salary for this role?"
        },
        {
            type: 'list',
            name: 'Dprt',
            message: "What department is this role related to?",
            choices: async function list() {return listDep();}
        }
        
    ])
    .then((response) =>{
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`; 
        const param = [response.newRole, response.newSalary, response.Dprt];   
        db.query(sql, param, (err, result) => {
            if (err) { console.log(err); }  
        else {console.log("New Role was added"); 
        employeeTraker(); 
    }
});
} 
)}
// add employee to a  employee table
function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newName',
            message: "What is the  first name of the new employee"
        },
        {
            type:'input',
            name: 'newLastName',
            message: "What is the last name of the new employee?"
        },
        {
            type: 'list',
            name: 'Rl',
            message: "What department is this role related to?",
            choices: async function list() {return listRole();}
        },
        {
            type: 'list',
            name: 'mngr',
            message: "who is his/her manager?",
            choices: async function list() {return manager();}
        }
        
    ])
    .then((response) =>{

        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`; 
        const param = [response.newName, response.newLastName, response.Rl, response.mngr];   
        db.query(sql, param, (err, result) => {
            if (err) { console.log(err); }  
        else {console.log("New employee was added"); 
        employeeTraker(); 
    }
});
} 
)}

//update an employee role
function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'nameEpl',
            message: "choose a name from the list?",
            choices: async function list() {return listEmployee();}
        },
        {
            type: 'list',
            name: 'nRl',
            message: "What is his/her new role?",
            choices: async function list() {return listRole();}
        },
        
        
    ])
    .then((response) =>{

        const sql = `UPDATE  employee SET role_id=? WHERE id=? `; 
        const param = [response.nRl, response.nameEpl];   
        db.query(sql, param, (err, result) => {
            if (err) { console.log(err); }  
        else {console.log("The employe is up to date"); 
        employeeTraker(); 
    }
});
} 
)}

