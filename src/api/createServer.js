const express = require("express");
const path = require("path");
const services = require("../services");
const { setup, send } = require("./ws");
const { getSecureKey } = require("./utils");

const createServer = () => {
  const app = express();
  app.use("/", express.static(path.join(__dirname, "../client")));
  setup();
  app.use(express.json());
  const secretKey = getSecureKey();

  app.post("/hook/:user/:service", async (req, res) => {
    console.log(req.body);

    const service = req.params.service;
    const time = new Date().toUTCString();

    const serviceUtils = services[service];

    if (!service) {
      res.status(400).json();
      return;
    }

    if (!serviceUtils.authenticate(req, secretKey)) {
      res.status(403).json();
      return;
    }

    const payload = req.body;
    const content = serviceUtils.parser(payload);

    if (!content) {
      res.status(400).json();
      return;
    }

    send(req.params.user, { service, time, content });
    serviceUtils.respond(res, req);
  });

  return app;
};

module.exports = createServer;
