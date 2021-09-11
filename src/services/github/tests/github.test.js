const { parser, authenticate, respond } = require("..");
const commitMock = require("./mocks/commit");

describe("github parse function", () => {
  it("correctly parses a commit event", () => {
    const parsedMessage = parser(commitMock);
    expect(parsedMessage).toBe(
      "new commit by jamesrobertson251 to the fullstack-js-kickstarter repo with message Update README.md"
    );
  });
});

describe("github authenticate", () => {
  it("authenticates correctly", () => {
    const isAuthenticated = authenticate(
      {
        body: { data: "some data" },
        headers: {
          "x-hub-signature": "sha1=313045c1c1692ba3b399d4f6fbb3e249e4c44b87",
        },
      },
      "1234"
    );

    expect(isAuthenticated).toBe(true);
  });
});

describe("github response", () => {
  it("responds correctly", () => {
    const sendMock = jest.fn();
    const res = {
      sendStatus: sendMock,
    };
    respond(res);
    expect(sendMock).toHaveBeenCalledWith(200);
  });
});
