const { renderMessages } = require("../ui");

describe("ui", () => {
  it("render all messages", () => {
    const feedContainer = document.createElement("div");
    feedContainer.id = "feed-container";

    document.body.appendChild(feedContainer);
    const messages = [
      {
        service: "github",
        time: "12:00pm",
        content: "new commit",
      },
    ];

    renderMessages(messages);
    const updatedFeedContainer = document.getElementById("feed-container");
    expect(updatedFeedContainer.children.length).toBe(1);
    expect(updatedFeedContainer.innerHTML.includes("new commit")).toBe(true);
  });

  it("filters  messages", () => {});
});
