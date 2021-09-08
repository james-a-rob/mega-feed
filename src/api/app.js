const ngrok = require("ngrok");
const services = require("../services/config");
const createServer = require("./createServer");
const { getUserId, getSecureKey } = require("./utils");
const port = 3000;
const app = createServer();

(async function () {
  const userId = getUserId();
  const url = await ngrok.connect({ addr: port });
  const secureKey = getSecureKey();
  console.log("webhook urls");

  services.forEach((service) => {
    console.log(`${url}/hook/${userId}/${service.name}`);
  });

  console.log("secure key");
  console.log(secureKey);
})();

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
