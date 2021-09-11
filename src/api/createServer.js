const express = require("express");
const services = require("../services");
const { setup, send } = require("./ws");
const { getSecureKey } = require("./utils");

const createServer = () => {
  const app = express();
  setup();
  app.use(express.json());
  const secretKey = getSecureKey();
  app.post("/hook/:user/:service", async (req, res) => {
    const service = req.params.service;
    const time = new Date().toUTCString();

    const serviceUtils = services[service];
    if (service) {
      const payload = req.body;
      if (!serviceUtils.authenticate(req, secretKey)) {
        res.status(403).json();
        return;
      }
      const content = serviceUtils.parser(payload);

      send(req.params.user, { service, time, content });
      serviceUtils.respond(res, req);
    } else {
      res.status(400).json();
    }
  });

  return app;
};

module.exports = createServer;
