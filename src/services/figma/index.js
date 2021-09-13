const crypto = require("crypto");

const handleFileUpdate = (payload) => {
  return `${payload.file_name} were updated <a href="https://www.figma.com/file/${payload.file_key}/">Open</a>`;
};

const parser = (payload) => {
  if (payload.event_type === "FILE_UPDATE") {
    return handleFileUpdate(payload);
  }
};

const authenticate = (req, secureKey) => {
  return req.body.passcode === secureKey;
};

const respond = (res, req) => {
  res.sendStatus(200);
};

module.exports = {
  parser,
  authenticate,
  respond,
};
