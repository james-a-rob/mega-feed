const request = require("supertest");
const fs = require("fs");

const createServer = require("../createServer");
const { send } = require("../ws");
const services = require("../../services");

jest.mock("fs");
jest.mock("../ws");

beforeAll(() => {
  fs.readFileSync.mockClear();
});

jest.mock("../../services", () => ({
  github: {
    parser: () => "jons test message",
    authenticate: (payload) => {
      return true;
    },
  },
  githubNoAuth: {
    parser: () => "jons test message",
    authenticate: (payload) => {
      return false;
    },
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
    fs.readFileSync.mockReturnValue("1234");

    const app = createServer();

    request(app)
      .post("/hook/jon/github?key=1234")
      .send(JSON.stringify({ service: "github" }))
      .expect("Content-Type", /json/)
      .expect("Content-Length", "21")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.statusCode).toEqual(200);
        expect(fs.readFileSync).toHaveBeenCalled();

        expect(send).toHaveBeenCalledWith("jon", {
          service: "github",
          time: "Tue, 31 Mar 2020 23:00:00 GMT",
          content: "jons test message",
        });
        done();
      });
  });

  it("returns 403 if not authorized", (done) => {
    const app = createServer();
    request(app)
      .post("/hook/jon/githubNoAuth?key=1234")
      .send(JSON.stringify({ service: "githubNoAuth" }))
      .expect("Content-Type", /json/)
      .expect("Content-Length", "0")
      .expect(403)
      .end(function (err, res) {
        expect(res.statusCode).toEqual(403);
        done();
      });
  });
});
