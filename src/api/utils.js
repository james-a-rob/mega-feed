const fs = require("fs");
const crypto = require("crypto");

const getUserId = () => {
  const userID = fs.readFileSync(__dirname + "/user-id.txt").toString();
  if (userID) {
    return userID;
  } else {
    const token = crypto.randomBytes(10).toString("hex");
    fs.writeFileSync(__dirname + "/user-id.txt", token);
    return token;
  }
};

const getSecureKey = () => {
  const secureKey = fs.readFileSync(__dirname + "/secure-key.txt").toString();
  if (secureKey) {
    return secureKey;
  } else {
    const token = crypto.randomBytes(10).toString("hex");
    fs.writeFileSync(__dirname + "/secure-key.txt", token);
    return token;
  }
};

module.exports = {
  getUserId,
  getSecureKey,
};
