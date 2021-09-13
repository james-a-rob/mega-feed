const { parser, authenticate, respond } = require("..");
const mockNewMessage = require("./mocks/new-message");

describe("slack parse function", () => {
  it("correctly parses a commit event", () => {
    const message = parser(mockNewMessage);
    expect(message).toEqual(
      `new message received - some text <a href="https://app.slack.com/client/T02EB3GQK09/C02DYPDSGE7">Open</a>`
    );
  });
});

describe("slack authenticate", () => {
  it("authenticates correctly", () => {
    expect(authenticate({})).toBe(true);
  });
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
