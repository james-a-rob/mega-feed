const { parser, authenticate, respond } = require("..");

describe("slack parse function", () => {
  it("correctly parses a commit event", () => {});
});

describe("slack authenticate", () => {
  it("authenticates correctly", () => {});
});

describe("slack response", () => {
  it("responds correctly", () => {
    const sendMock = jest.fn();
    const res = {
      send: sendMock,
    };
    const req = {
      body: {
        challenge: "1234",
      },
    };
    respond(res, req);
    expect(sendMock).toHaveBeenCalledWith("1234");
  });
});
