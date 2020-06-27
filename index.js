const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
// array of questions for user
const questions = [
  {
    type: "input",
    message: "What is the project title?",
    name: "projectTitle",
  },
  {
    type: "input",
    message: "Please input a short description of your project.",
    name: "description",
  },
  {
    type: "input",
    message: "Please input your Github username.",
    name: "ghUsername",
  },
  {
    type: "input",
    message: "Please input your email address.",
    name: "email",
  },
  {
    type: "input",
    message: "Please input instructions for the installation of your project.",
    name: "installation",
  },
  {
    type: "input",
    message: "Please input usage information for this project.",
    name: "usage",
  },
  {
    type: "input",
    message: "Please input guide lines for contributing to this project",
    name: "contributing",
  },
  {
    type: "input",
    message: "Please input tests for this project.",
    name: "tests",
  },
  {
    type: "list",
    message: "Select a license for this project?",
    name: "license",
    choices: ["MIT", "Apache", "Boost", "Mozilla", "ODbL"],
  },
];

const licenseArr = {
  MIT:
    "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
  Apache:
    "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
  Boost:
    "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
  Mozilla:
    "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
  ODbL:
    "[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)",
};

// function to write README file
function writeHTML(res) {
  return `# ${res.projectTitle}
  ${licenseArr[res.license]}
  ## Description 
  
  ${res.description}
  
  
  ## Table of Contents
  
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  * [License](#license)
  
  
  ## Installation
  ${res.installation}
  
  
  ## Usage 
  ${res.usage}
  
  
  ## Contributing
  ${res.contributing}
  
  ## Tests
  ${res.tests}
  
  
  ## Questions
  If you have any questions, please reach out to me at:<br>${res.email} OR<br>github.com/${res.ghUsername}
  
  
  ## License
  
  This project is licensed under the ${res.license} license.
  
  `;
}

// function to initialize program
function init() {
  return inquirer.prompt(questions);
}

// function call to initialize program
init()
  .then(function (res) {
    const fileHTML = writeHTML(res);
    return writeFileAsync("README.md", fileHTML);
  })
  .then(function () {
    console.log("Enjoy Your ReadMe!");
  })
  .catch(function (err) {
    console.log(err);
  });
