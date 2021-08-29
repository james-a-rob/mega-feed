const express = require("express");
const services = require("../services");
const { setup, send } = require("./ws");

const createServer = () => {
  const app = express();
  setup();
  app.use(express.json());
  app.post("/hook/:username/:service", async (req, res) => {
    const parsedMessage = services[req.params.service].parser(req.body);
    send(req.params.username, parsedMessage);
    res.status(200).json({ message: "worked" });
  });

  return app;
};

module.exports = createServer;
