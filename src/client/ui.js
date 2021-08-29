const renderMessages = (messages) => {
  const feedContainer = document.getElementById("feed-container");

  messages.forEach((message) => {
    const feedItem = document.createElement("div");
    feedItem.class = "feed-container";
    feedItem.innerHTML = `${message.service} | ${message.time} | ${message.content}`;
    feedContainer.appendChild(feedItem);
  });
};

const filterMessages = () => {};

module.exports = {
  renderMessages,
  filterMessages,
};
