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

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1));
});

afterAll(() => {
  jest.useRealTimers();
});

describe("api", () => {
  it("correctly handles incoming webhooks", (done) => {
    const app = createServer();

    request(app)
      .post("/hook/jon/github?key=1234")
      .send(JSON.stringify({ foo: "bar" }))
      .expect("Content-Type", /json/)
      .expect("Content-Length", "21")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(send).toHaveBeenCalledWith("jon", {
          service: "github",
          time: "Tue, 31 Mar 2020 23:00:00 GMT",
          content: "jons test message",
        });
        done();
      });
  });
});
