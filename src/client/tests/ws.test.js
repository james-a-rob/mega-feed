const { WebSocketServer } = require("ws");
const { socket, setup, onMessage } = require("../ws");

describe("client ws", () => {
  it("connects to server", (done) => {
    let socket;
    wss = new WebSocketServer({
      port: 8080,
    });

    wss.on("connection", function connection(ws, req) {
      expect(req.url).toEqual("/?user=jon&key=1234");
      wss.close();
      socket.close();
      done();
    });
    socket = setup("jon", 1234);
  });

  it("listens for messages from server", (done) => {
    let socket;

    wss = new WebSocketServer({
      port: 8080,
    });

    wss.on("connection", function connection(ws, req) {
      expect(req.url).toEqual("/?user=ben&key=1234");
      ws.send(
        JSON.stringify({
          service: "Github",
          time: "12:00pm",
          content: "new commit",
        })
      );
    });
    socket = setup("ben", 1234);
    onMessage(socket, (event) => {
      expect(event.service).toEqual("Github");
      wss.close();
      socket.close();
      done();
    });
  });
});
