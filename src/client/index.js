const { setup, onMessage } = require("./ws");
const { renderMessages, searchMessages } = require("./ui");
var faker = require("faker");

const socket = setup("jon");

const demoMode = true;

const store = {
  messages: demoMode ? [] : [],
};

const scrollToBottom = () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  // When the user is [modifier]px from the bottom, fire the event.
  let modifier = 100;
  if (currentScroll + modifier > documentHeight) {
    console.log("You are near the bottom!");
    window.scrollTo(0, document.body.scrollHeight);
  }
};

if (demoMode) {
  const createRandomMessage = () => {
    const serviceOptions = ["slack", "figma", "github"];
    const randomThing1 = Math.random();
    const services = {
      slack: {
        name: "slack",
        time: Date.now(),
        content: `new message in channel - ${faker.lorem.sentence()} | <a target="_blank" href="https://slack.com/">Open</a> `,
      },
      github: {
        name: "github",
        time: Date.now(),
        content: `new pull request created in the ${faker.commerce.product()} repo | <a target="_blank" href="https://slack.com/">Open</a>`,
      },
      figma: {
        name: "figma",
        time: Date.now(),
        content: `the ${faker.commerce.product()} designs were just changed | <a target="_blank" href="https://slack.com/">Open</a>`,
      },
    };
    const service =
      services[
        serviceOptions[Math.floor(Math.random() * serviceOptions.length)]
      ];

    return {
      service: service.name,
      time: service.time,
      content: service.content,
    };
  };
  setInterval(() => {
    store.messages = [createRandomMessage(), ...store.messages];

    renderMessages(searchMessages(filterQuery, store.messages));
    scrollToBottom();
  }, 3000);
}

let filterQuery = "";
const filterQueryInput = document.getElementById("filter-query");
filterQueryInput.addEventListener("change", (event) => {
  filterQuery = event.target.value;
  console.log(filterQuery);
  renderMessages(searchMessages(filterQuery, store.messages));
});

onMessage(socket, (data) => {
  store.messages = [data, ...store.messages];
  renderMessages(searchMessages(filterQuery, store.messages));
  scrollToBottom();
});
