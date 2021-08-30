const { setupm onMessage } = require("./ws");
const { renderMessages, filterMessages } = require("./ui");
setup();
const messages = [];
const filterQuery = "";
const filterQueryInput = document.getElementById("filter-query");
filterQueryInput.addEventListener("change", () => {
  renderMessages(filterMessages(messages));
});

onMessage(()=>{
    messages.push(JSON.parse(event.data));
    renderMessages(filterMessages(messages));
})

// messages
// filter query
// setup filter
// setup listen
//// render message
