const Employee = require('./Employee')

class Intern extends Employee {
    constructor (name,id,email,getSchool) {
        super(name,id,email);
        this.getSchool = getSchool;
    }
 
    getRole() {
        return "Intern";
    }
    getSchool(){
        return this.school;
    }
}

module.exports = Intern;