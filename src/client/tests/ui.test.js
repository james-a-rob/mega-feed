const { renderMessages, filterMessages } = require("../ui");

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

  it("filters  messages by content", () => {
    const messages = [
      {
        service: "github",
        time: "12:00pm",
        content: "new commit",
      },
      {
        service: "slack",
        time: "13:00pm",
        content: "new message",
      },
    ];
    expect(filterMessages("message", messages)[0].service).toEqual("slack");
  });

  it("filters messages by content", () => {
    const messages = [
      {
        service: "github",
        time: "12:00pm",
        content: "new commit",
      },
      {
        service: "slack",
        time: "13:00pm",
        content: "new message",
      },
    ];
    expect(filterMessages("slack", messages)[0].service).toEqual("slack");
  });

  it("handles a fitler that does not match any messages", () => {
    const messages = [
      {
        service: "github",
        time: "12:00pm",
        content: "new commit",
      },
      {
        service: "slack",
        time: "13:00pm",
        content: "new message",
      },
    ];
    expect(filterMessages("not in any message", messages).length).toBe(0);
  });

  it("does not filter on empty string", () => {
    const messages = [
      {
        service: "github",
        time: "12:00pm",
        content: "new commit",
      },
      {
        service: "slack",
        time: "13:00pm",
        content: "new message",
      },
    ];
    expect(filterMessages("", messages).length).toBe(2);
  });
});
