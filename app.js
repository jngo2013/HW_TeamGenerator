console.log("Hello")
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const render = require("./lib/htmlRenderer.js");
const Manager = require("./lib/Manager.js");
const fs = require("fs")
const path = require("path")

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");


let newEmployee = [];
let employee = '';
question();

async function question(){
 inquirer.prompt([
    {
    type: "list", 
    name: "role",
    message: "Position of employment",
    choices: ["Manager", "Engineer", "Intern"]
    }
]).then(await function(response) {
    console.log(response)
    switch(response.role) {
        case 'Manager': manPrompt();
        break;
        case 'Engineer':  engPrompt();
        break;
        case 'Intern': intPrompt();
        break;
        default: break;
    }

});
}        
        async function manPrompt(){
        await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "name of employee"
            },
            {
                type: "input",
                name: "id",
                message:"please give an ID to this employee"
            },
            {
                type: "input",
                name:"email",
                message:"enter employee's email"
            },
            {
                type: "input",
                name:"officeNumber",
                message:"enter office number"
            }
        ]).then( answers => {
            let man =  new Manager(answers.name,answers.id,answers.email,answers.officeNumber);
            newEmployee.push(man);
            console.log(man);
        })
        askQuestion();
    }
    async function engPrompt(){
        await inquirer.prompt ([
            {
                type: "input",
                name: "name",
                message: "name of employee"
            },
            {
                type: "input",
                name: "id",
                message:"please give an ID to this employee"
            },
            {
                type: "input",
                name:"email",
                message:"enter employee's email"
            },
            {
                type: "input",
                name:"gitHub",
                message:"enter GitHub name"
            }
        ]).then( answers => {
            let eng = new Engineer(answers.name,answers.id,answers.email,answers.gitHub);
            newEmployee.push(eng)
            console.log(eng);
        })
        askQuestion()
    }
    async function intPrompt(){
        await inquirer.prompt ([
            {
                type: "input",
                name: "name",
                message: "name of employee"
            },
            {
                type: "input",
                name: "id",
                message:"please give an ID to this employee"
            },
            {
                type: "input",
                name:"email",
                message:"enter employee's email"
            },
            {
                type: "input",
                name:"school",
                message:"enter student's university"
            }
        ]).then( answers => {
            let int = new Intern(answers.name,answers.id,answers.email,answers.school);
            newEmployee.push(int)
            console.log(int);
        })
        askQuestion()
        
    }
    // await askQuestion();
    async function askQuestion(){
        await inquirer.prompt([
             {
                type: "list",
                name: "newerEmployee",
                message: "would you like to input a new employee",
                choices:["true", "false"]
            }
        ]).then( answers => {
            console.log(newEmployee)
            let {newerEmployee} = answers
            if(newerEmployee === "true"){
                 question();
            }else if(newerEmployee === "false"){
                console.log(render(newEmployee))
                fs.writeFile(outputPath, render(newEmployee), err =>{
                    if(err){
                        console.log(err);
                        throw err
                    }
                    console.log("success")
        
                })
                
            }
        })
    }
    
            
