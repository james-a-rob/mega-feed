const WebSocket = require("ws");
const { setup, send, cleanup } = require("..");

describe("ws", () => {
  it("pushes message to client", (done) => {
    setup();
    const ws = new WebSocket("ws://localhost:8080?user=jon&key=1234", {
      perMessageDeflate: false,
    });
    ws.on("open", () => {
      ws.on("message", (message) => {
        expect(message.toString()).toEqual("test message");
        ws.close();
        cleanup();
        done();
      });
      send("jon", "test message");
    });
  });

  it("pushes messages to two differnt clients", (done) => {
    setup();
    let messageCount = 0;
    const ws1 = new WebSocket("ws://localhost:8080?user=ben&key=1234", {
      perMessageDeflate: false,
    });
    const ws2 = new WebSocket("ws://localhost:8080?user=bill&key=1234", {
      perMessageDeflate: false,
    });
    const maybeDone = () => {
      if (messageCount === 2) {
        cleanup();
        ws1.close();
        ws2.close();
        done();
      }
    };

    ws1.on("open", () => {
      ws1.on("message", (message) => {
        expect(message.toString()).toEqual("bens test message");
        ws1.close();
        messageCount++;
        maybeDone();
      });
      send("ben", "bens test message");
    });
    ws2.on("open", () => {
      ws2.on("message", (message) => {
        expect(message.toString()).toEqual("bills test message");
        ws2.close();
        messageCount++;
        maybeDone();
      });
      send("bill", "bills test message");
    });
  });
});
