const { exec } = require("child_process");
const services = require("../services/config");
const createServer = require("./createServer");
const { getUserId, getSecureKey } = require("./utils");
const port = 3000;
const app = createServer();

(async function () {
  const userId = getUserId();
  const secureKey = getSecureKey();
  const hostName = `megafeed-${userId}`;
  async function setupLoopHole() {
    const { stdout, stderr } = await exec(
      `loophole http ${port} --hostname ${hostName}`
    );
  }

  setupLoopHole();
  const url = `https://${hostName}.loophole.site`;
  services.forEach((service) => {
    console.log(`${url}/hook/${userId}/${service.name}`);
  });

  console.log("secure key");
  console.log(secureKey);
})();

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
