const renderMessages = (messages) => {
  const feedContainer = document.getElementById("feed-container");

  messages.forEach((message) => {
    const feedItem = document.createElement("div");
    feedItem.class = "feed-container";
    feedItem.innerHTML = `${message.service} | ${message.time} | ${message.content}`;
    feedContainer.appendChild(feedItem);
  });
};

const filterMessages = (filter, messages) => {
  return messages.filter((message) => {
    return message.content.includes(filter) || message.service.includes(filter);
  });
};

module.exports = {
  renderMessages,
  filterMessages,
};
