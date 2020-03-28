const Manager = require('./Manager');
const Intern = require('./Intern');
const Engineer = require('./Engineer');

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const outputPath = path.join(__dirname, '../templates/main.html');
const render = require('./htmlRenderer');

const employees = [];
let employeeNumber = 1;


const addEmployee = (type) => {
    let questions = [
        {
            name: 'name',
            message: "Please enter employee's first name:",
            type: 'input',
        },
        {
            name: 'email',
            message: 'Please enter employee email:',
            type: 'input',
        }
    ]
    switch (type[0]) {
        case 'Engineer':
            questions.push({
                name: 'githubUsername',
                message: "Please enter the engineer's GitHub Username:",
                type: 'input',
            })
            break;
        case 'Intern':
            questions.push({
                name: 'schoolName',
                message: "Please enter the intern's school name:",
                type: 'input',
            })
            break;
        case 'Manager':
            questions.push({
                name: 'officeNumber',
                message: "Please enter the manager's office number:",
                type: 'input',
            })
            break;
        default:
            break;
    }
    inquirer.prompt(questions).then(answers => {
        switch (type[0]) {
            case 'Engineer':
                let engineer = new Engineer(answers.name, employeeNumber, answers.email,  answers.githubUsername);
                employees.push(engineer);
                break;
            case 'Intern':
                let intern = new Intern(answers.name, employeeNumber, answers.email, answers.schoolName,);
                employees.push(Intern);
            case 'Manager':
                let manager = new Manager(answers.name, employeeNumber, answers.email, answers.officeNumber);
                employees.push(manager);
            default:
                break;
        }
        employeeNumber++;
        wantsToAdd();
    })
}
const promptEmployee = () => {
    inquirer.prompt({
        name: 'employeeType',
        message: 'Please select the type of employee you want to add:',
        type: 'checkbox',
        choices: ['Engineer', 'Intern', 'Manager']
    })
    .then(answer => {
        addEmployee(answer.employeeType);
    })
}
const wantsToAdd = () => {
    inquirer.prompt({
        name: 'wantsToAdd',
        message: 'Do you want to add an employee?',
        type: 'confirm',
    })
    .then(answer => {
        if (answer.wantsToAdd) {
            promptEmployee();
        } else {
            fs.writeFile(outputPath, render(employees), () => {
                console.log('Done writing file!');
            })
        }
    })
}
wantsToAdd();