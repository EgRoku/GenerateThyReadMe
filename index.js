// Packages
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Array of questions
const promptQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Welcome to my README generator! To start, please provide your name:',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('You have to enter your name bub!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub:',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please give yourself some credit, add your Github!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Enter your email for a way for consumers to contact you with questions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is your projects title?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('You must have a title! Otherwise we wont know what to call it!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: "Please enter your project's description:",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter a discription so others know how/why to use your generator');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the install directions?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('We need Instructions! This is madness!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage Instructions:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('We need to know the usage, or all will be lost in translation!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can other devs help contribute to your project?',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please provide instructions on how other devs can help contribute code to your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Give Test instructions for your tests!',
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please provide instructions on how to run the tests dexter!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicenses',
        message: 'Would you like to include a usage license?',
        default: false
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'What usage license would you like to include?',
        choices: ['MIT', 'GPL', 'CC--0'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },
];

// Function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        // make a readme file and add to dist folder
        fs.writeFile('./dist/README.md', data, err => {
            // if there's an error, reject the Promise and send the error to .catch() method
            if (err) {
                reject (err);
                return;
            }
            // resolve the Promise and send the successful data
            resolve({
                ok: true,
                message: console.log('Success! Navigate to the "dist" folder to see your README!')
            });
        })
    })
}

// Initialize app
const init = () => {
    return inquirer.prompt(promptQuestions);
}

// Function call to initialize app
init()
.then(userInput => {
    return generateMarkdown(userInput);
})
.then(readmeInfo => {
    return writeToFile(readmeInfo);
})
.catch(err => {
    console.log(err);
})