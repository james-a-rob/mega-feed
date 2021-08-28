const inquirer = require("inquirer");
const chalk = require('chalk');

require("dotenv").config();
const config = require("./config");

const serviceOptions = config.reduce((accumulator, service)=>{
    accumulator.push(service.displayName);
    return accumulator;
}, []);

const View = require('./view');
const Twitter = require('./services/twitter');



inquirer
  .prompt([
   
    {
      type: "checkbox",
      name: "services",
      message: "Pick which service to monitor",
      choices: serviceOptions,
    }
  ])
  .then((answers) => {
    console.clear();
    const style = (displayName)=>{
        const color = config.find(service => (service.displayName === displayName)).color;
        return chalk.hex(color).bold(displayName)
    }
    console.log(`Listening for messages from ${style('Twitter')}, ${style('Miro')}, ${style('Figma')}, ${style('Slack')} and ${style('Github')}`);

    const view = new View();
    const twitter = new Twitter(view);
    twitter.init();
  });
