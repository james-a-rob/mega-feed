const request = require("supertest");
const createServer = require("../createServer");
const { send } = require("../ws");
const services = require("../../services");
jest.mock("../ws");
jest.mock("../../services", () => ({
  github: {
    parser: () => "jons test message",
  },
}));
describe("api", () => {
  it("correctly handles incoming webhooks", (done) => {
    jest
      .useFakeTimers("modern")
      .setSystemTime(new Date("2020-01-01").getTime());
    const app = createServer();

    request(app)
      .post("/hook/jon/github?key=1234")
      .send({ foo: "bar" })
      .expect("Content-Type", /json/)
      .expect("Content-Length", "20")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(send).toHaveBeenCalledWith(
          "jon",
          "Github | Wed, 01 Jan 2020 00:00:00 GMT | jons test message"
        );
        done();
      });
  });
});
