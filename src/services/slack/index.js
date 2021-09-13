const crypto = require("crypto");

const handleChannelMessage = (payload) => {
  return `new message received - ${payload.event.text} <a href="https://app.slack.com/client/${payload.event.team}/${payload.event.channel}">Open</a>`;
};

const parser = (payload) => {
  if (payload.event.type === "message") {
    return handleChannelMessage(payload);
  }
};

const authenticate = (req, secureKey) => {
  return true;
};

const respond = (res, req) => {
  const challenge = req.body.challenge;
  if (challenge) {
    res.send(req.body.challenge);
  } else {
    res.sendStatus(200);
  }
};

module.exports = {
  parser,
  authenticate,
  respond,
};
