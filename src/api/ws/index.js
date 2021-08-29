const { WebSocketServer } = require("ws");
const querystring = require("querystring");

const openConnections = {};
let wss;

const setup = (port = 8080) => {
  wss = new WebSocketServer({
    port,
  });

  wss.on("connection", function connection(ws, req) {
    const urlQueries = querystring.decode(req.url.substring(2));
    const user = urlQueries.user;
    openConnections[user] = {
      ws,
    };
  });
};

const send = (user, message) => {
  const openConnection = openConnections[user];
  if (openConnection) {
    openConnection.ws.send(message);
  }
};

const cleanup = () => {
  wss.close();
};

module.exports = {
  setup,
  send,
  cleanup,
};
