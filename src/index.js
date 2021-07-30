require("dotenv").config();
const View = require('./view');
const Twitter = require('./services/twitter');
console.clear();
const view = new View();
const twitter = new Twitter(view);
// const miro = new Miro(view);
