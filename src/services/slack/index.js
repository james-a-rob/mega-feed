const crypto = require("crypto");

const handleCommit = (payload) => {
  return `new commit by ${payload.pusher.name} to the ${payload.repository.name} repo with message ${payload.commits[0].message}`;
};

const parser = (payload) => {
  return { test: "blah" };
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
