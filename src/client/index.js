const { setup, onMessage } = require("./ws");
const { renderMessages, filterMessages } = require("./ui");
const socket = setup("jon");
const messages = [];
const filterQuery = "";
const filterQueryInput = document.getElementById("filter-query");
filterQueryInput.addEventListener("change", () => {
  renderMessages(filterMessages(messages));
});

onMessage(socket, (event) => {
  console.log(event);
  messages.push(JSON.parse(event.data));
  renderMessages(filterMessages(messages));
});

// messages
// filter query
// setup filter
// setup listen
//// render message
