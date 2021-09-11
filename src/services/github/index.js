const crypto = require("crypto");

const handleCommit = (payload) => {
  return `new commit by ${payload.pusher.name} to the ${payload.repository.name} repo with message ${payload.commits[0].message}`;
};

const parser = (payload) => {
  if (payload.commits) {
    return handleCommit(payload);
  }
  return "";
};

const authenticate = (req, secureKey) => {
  const expectedSignature =
    "sha1=" +
    crypto
      .createHmac("sha1", secureKey)
      .update(JSON.stringify(req.body))
      .digest("hex");

  if (expectedSignature === req.headers["x-hub-signature"]) {
    return true;
  }
  return false;
};

const respond = (res) => {
  res.sendStatus(200);
};

module.exports = {
  parser,
  authenticate,
  respond,
};
