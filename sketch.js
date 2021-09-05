const Fuse = require("fuse.js");
const options = {
  includeScore: true,
  useExtendedSearch: true,
  keys: ["service", "content"],
};
const messages = [
  {
    service: "slack",
    time: new Date().toUTCString(),
    content: "dummy message",
  },
  {
    service: "github",
    time: new Date().toUTCString(),
    content: "dummy message",
  },
  {
    service: "slack",
    time: new Date().toUTCString(),
    content: "dummy message",
  },
  {
    service: "slack",
    time: new Date().toUTCString(),
    content: "dummy2 message",
  },
  {
    service: "miro",
    time: new Date().toUTCString(),
    content: "dummy2 message",
  },
  {
    service: "figma",
    time: new Date().toUTCString(),
    content: "dummy message",
  },
  {
    service: "twitter",
    time: new Date().toUTCString(),
    content: "one two three",
  },
  {
    service: "slack",
    time: new Date().toUTCString(),
    content: "three four five",
  },
  {
    service: "github",
    time: new Date().toUTCString(),
    content: "dummy message",
  },
  {
    service: "slack",
    time: new Date().toUTCString(),
    content: "dummy message blah",
  },
  {
    service: "slack",
    time: new Date().toUTCString(),
    content: "dummy2 message",
  },
  {
    service: "miro",
    time: new Date().toUTCString(),
    content: "dummy2 message",
  },
  {
    service: "figma",
    time: new Date().toUTCString(),
    content: "dummy message",
  },
  {
    service: "twitter",
    time: new Date().toUTCString(),
    content: "dummy message",
  },
];
const fuse = new Fuse(messages, options);

// Search for items that include "Man" and "Old",
// OR end with "Artist"
const foundItems = fuse.search("!slack");

console.log(foundItems);
