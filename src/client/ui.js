const Fuse = require("fuse.js/dist/fuse.min.js");

const options = {
  includeScore: true,
  useExtendedSearch: true,
  shouldSort: false,
  threshold: 0.2,
  keys: ["combined"],
};

const renderMessages = (messages) => {
  const feedContainer = document.getElementById("feed-container");
  feedContainer.innerHTML = "";
  messages.forEach((message) => {
    const feedItem = document.createElement("div");
    feedItem.className = "feed-item";
    feedItem.innerHTML = `<div class="feed-item-service ${message.service}">${message.service} </div> <div class="feed-item-content">${message.content}</div> <div class="feed-item-time">${message.time} </div> `;
    feedContainer.appendChild(feedItem);
  });
};

const searchMessages = (query, messages) => {
  if (query === "") {
    return messages;
  }
  const messagesWithCombined = messages.map((message) => ({
    ...message,
    combined: message.service + message.content,
  }));
  const fuse = new Fuse(messagesWithCombined, options);
  const foundItems = fuse.search(query);
  return foundItems.map((item) => item.item);
};

module.exports = {
  renderMessages,
  searchMessages,
};
