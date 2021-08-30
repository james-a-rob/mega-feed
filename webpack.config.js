const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/client/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "src/client/dist"),
  },
};
