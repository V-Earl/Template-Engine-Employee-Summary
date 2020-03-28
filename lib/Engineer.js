// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

module.exports = class Engineer extends Employee {
    constructor(name, id, email, githubUserName = '') {
        super(name, id, email);
        this.githubUserName = githubUserName;
    }

    getGithub() {
        return this.githubUserName;
    }

    getRole() {
        return 'Engineer';
    }
}