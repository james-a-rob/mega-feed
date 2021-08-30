const setup = (user, key) => {
  const socket = new WebSocket(`ws://localhost:8080?user=${user}&key=${key}`);
  return socket;
};

const onMessage = (socket, handler) => {
  socket.addEventListener("message", function (event) {
    handler(JSON.parse(event.data));
  });
};

module.exports = {
  setup,
  onMessage,
};
