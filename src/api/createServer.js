const express = require("express");
const services = require("../services");
const { setup, send } = require("./ws");

const createServer = () => {
  const app = express();
  setup();
  app.use(express.json());

  app.post("/hook/:username/:service", async (req, res) => {
    const service = req.params.service;
    const time = new Date().toUTCString();
    const content = services[req.params.service].parser(req.body);

    send(req.params.username, { service, time, content });
    res.status(200).json({ message: "working" });
  });

  return app;
};

module.exports = createServer;
