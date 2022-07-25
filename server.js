const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require("./Selection/Manager");
const Engineer = require("./Selection/Engineer");
const Intern = require("./Selection/Intern");

const employeeArray = []

const chooseYourTeam = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Choose Your Team.',
                name: 'team',
                choices: ['Manager', 'Engineer', 'Intern', 'Complete']
            }
        ])
        .then((data) => {
            console.log(data)

            if (`${data.team}` === 'Manager') {
                managerTemplate();
            } else if (`${data.team}` === 'Engineer') {
                engineerTemplate();
            } else if (`${data.team}` === 'Intern') {
                internTemplate();
            } else {
                buildYourTeam();
            }

            // console.log(chooseYourTeam);
        })
};

chooseYourTeam();

// Manager Template
function managerTemplate () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Insert Managers Name?',
                name: 'managerName'
            },
            {
                type: 'input',
                message: 'Insert ID?',
                name: 'managerId'
            },
            {
                type: 'input',
                message: 'Insert Email?',
                name: 'managerEmail'
            },
            {
                type: 'input',
                message: 'Insert Office Number?',
                name: 'managerOfficeNumber'
            },
        ])

        .then((data) => {
            console.log(data)
            
            const newManager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber)
            employeeArray.push(newManager)
            console.log(employeeArray)
        
            return chooseYourTeam();
        })
};

// Engineer Template 
function engineerTemplate () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Insert Engineers Name?',
                name: 'engineerName'
            },
            {
                type: 'input',
                message: 'Insert ID?',
                name: 'engineerId'
            },
            {
                type: 'input',
                message: 'Insert Email?',
                name: 'engineerEmail'
            },
            {
                type: 'input',
                message: 'Insert You GitHub Aount?',
                name: 'engineerGithub'
            },
        ])

        .then((data) => {
            console.log(data)

            const newEngineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub)
            employeeArray.push(newEngineer)
            console.log(employeeArray)
            return chooseYourTeam();
        })
};

// Intern template 
function internTemplate () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Insert Interns Name?',
                name: 'internName'
            },
            {
                type: 'input',
                message: 'Insert ID?',
                name: 'internId'
            },
            {
                type: 'input',
                message: 'Insert Email?',
                name: 'internEmail'
            },
            {
                type: 'input',
                message: 'What School Did You Attend?',
                name: 'internSchool'
            },
        ])

        .then((data) => {
            console.log(data)
            const newIntern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool)
            employeeArray.push(newIntern)
            console.log(employeeArray)
            return chooseYourTeam();
        })
}


const buildYourTeam = () => {
    var htmlTemplate = ""
    for (var i = 0; i < employeeArray.length; i++) {
        htmlTemplate += `
    <div class="card text-center container-fluid" style="width: 18rem;">
  <div class="card-header">
  <li class="list-group-item">${employeeArray[i].name}</li>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Role: ${employeeArray[i].getRole()}</li>
    <li class="list-group-item">ID: ${employeeArray[i].id}</li>
    <li class="list-group-item">Email: ${employeeArray[i].email}</li>
  `
        if (employeeArray[i].getRole() === "Manager") {
            htmlTemplate += `<li class="list-group-item">OfficeNumber: ${employeeArray[i].getOfficeNumber()}</li>`
        } else if (employeeArray[i].getRole() === "Engineer") {
            htmlTemplate += `<li class="list-group-item">${employeeArray[i].getGithub()}</li>`
        } else {
            htmlTemplate += `<li class="list-group-item">${employeeArray[i].getSchool()}</li>`
        }
        htmlTemplate += `</ul>
    </div>`}

    // Generate HTML

    const generateHTML = `<!doctype html>
    <html lang="en">
      <head>
      <meta charset="UTF-8" />
     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
        <title>My Team</title>
      </head>
      <body>
      <div class="jumbotron bg-danger jumbotron-fluid text-center">
          <div class="container">
            <h1 class="display-4 ">My Team</h1>
          </div>
        </div>
        <main">
        ${htmlTemplate}
        </main>
      </body>
    </html>`

    fs.writeFile('index.html', generateHTML, (err) =>
        err ? console.log(err) : console.log("Success!")
    )
};