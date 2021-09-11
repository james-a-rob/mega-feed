const github = require("./github");
const slack = require("./slack");

const services = {
  github,
  slack,
};

module.exports = services;
