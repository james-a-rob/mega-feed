const ngrok = require("ngrok");
(async function () {
  const url = await ngrok.connect();
  console.log(url);
})();

const express = require("express");
const app = express();
app.use(express.json());

const port = 80;

app.post("/", (req, res) => {
  console.log(req.body); // your JSON

  console.log("got a message");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
