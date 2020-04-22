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

question();

async function question(){
await inquirer.prompt([
    {
    type: "list", 
    name: "role",
    message: "Position of employment",
    choices: ["Manager", "Engineer", "Intern"],
    }
]).then(response => {
    if(response.role === "Manager"){
        manPrompt()
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
                name:"OfficeNumber",
                message:"enter office number"
            },
            {
                type: "list",
                name: "new employee",
                message: "would you like to input a new employee",
                choices:["yes","no"]
            }

        ]).then( answers => {
            let man = new Manager(answers.name,answers.id,answers.email,answers.OfficeNumber,response.role);
            newEmployee.push(man)
            console.log(man);
            
        })
    }
}
    else if(response.role === "Engineer"){
        inquirer.prompt ([
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
                name:"GitHub",
                message:"enter GitHub name"
            }
        ]).then( answers => {
            let eng = new Engineer(answers.name,answers.id,answers.email);
            newEmployee.push(eng)
            console.log(eng);
        } 
        )
    }
    else if(response.role === "Intern"){
        inquirer.prompt ([
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
                name:"School",
                message:"enter student's university"
            }
        ]).then( answers => {
            let int = new Intern(answers.name,answers.id,answers.email,answers.School);
            newEmployee.push(int)
            console.log(int);
        })
    }
    
            fs.writeFile(outputPath,render(newEmployee), err =>{
                if(err){
                    console.log(err);
                    throw err
                }
                console.log("success")
    
            })
             promptEmployee();
}

)};




async function promptEmployee() {
   await inquirer.prompt([{
        type: "list",
        name: "new employee",
        message: "would you like to input a new employee",
        choices:["yes","no"]
    
    }]).then(res => {
        if(res.choices === "yes"){
            question();
            } else {
                console.log("no new employee");
            }

    });
}

    //     }
    

