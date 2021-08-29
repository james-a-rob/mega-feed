const createServer = require("./createServer");

const port = 3000;
const app = createServer();

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
