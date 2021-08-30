const createServer = require("./createServer");
const ngrok = require("ngrok");

const port = 3000;
const app = createServer();

(async function () {
  const url = await ngrok.connect({ addr: port });
  console.log(url);
})();

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
