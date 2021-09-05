const { setup, onMessage } = require("./ws");
const { renderMessages, searchMessages } = require("./ui");
const socket = setup("jon");
const messages = [
  {
    service: "slack",
    time: 1,
    content: "dummy message",
  },
  {
    service: "github",
    time: 2,
    content: "dummy message",
  },
  {
    service: "slack",
    time: 3,
    content: "very unrelated",
  },
  {
    service: "slack",
    time: 4,
    content: "dummy2 javascript",
  },
  {
    service: "miro",
    time: 5,
    content: "dummy2 python",
  },
  {
    service: "figma",
    time: 6,
    content: "very message",
  },
  {
    service: "twitter",
    time: 7,
    content: "javascript message",
  },
  {
    service: "slack",
    time: 8,
    content: "dummy message",
  },
  {
    service: "github",
    time: 9,
    content: "javascript message",
  },
  {
    service: "slack",
    time: 10,
    content: "code script",
  },
  {
    service: "slack",
    time: 11,
    content: "dummy2 message",
  },
  {
    service: "miro",
    time: 12,
    content: "JS code message",
  },
  {
    service: "figma",
    time: 13,
    content: "dummy message",
  },
  {
    service: "twitter",
    time: 14,
    content: "dummy message",
  },
];
let filterQuery = "";
const filterQueryInput = document.getElementById("filter-query");
filterQueryInput.addEventListener("change", (event) => {
  filterQuery = event.target.value;
  console.log(filterQuery);
  renderMessages(searchMessages(filterQuery, messages));
});

onMessage(socket, (data) => {
  messages.push(data);
  renderMessages(searchMessages(filterQuery, messages));
});
