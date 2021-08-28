const chalk = require("chalk");
const date = require("date-and-time");
const config = require("./config");

class View {
  constructor() {}
  formatMessage(message) {
    const now = new Date();
    const service = config.find((service) => service.name === message.service);
    const serviceTextStyling = chalk.hex(service.color).bold;
    return `${serviceTextStyling(service.displayName)} - ${
      message.content
    } - ${date.format(now, "hh:mm A [GMT]Z", true)}`;
  }
  onMessage(message) {
    const formatedMessage = this.formatMessage(message);
    console.log(formatedMessage);
  }
}

module.exports = View;
