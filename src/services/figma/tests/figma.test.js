const { parser, authenticate, respond } = require("..");
const mockFileUpdate = require("./mocks/file-updated");

describe("slack parse function", () => {
  it("correctly parses a commit event", () => {
    const message = parser(mockFileUpdate);
    expect(message).toEqual(
      `iPhone App Mock Designs were updated <a href="https://www.figma.com/file/nXgh3JHWzseCGzt3evkikD/">Open</a>`
    );
  });
});

describe("slack authenticate", () => {
  it("authenticates correctly", () => {
    expect(authenticate({ body: { passcode: "1234" } }, "1234")).toBe(true);
  });
});

describe("slack response", () => {
  it("responds correctly", () => {
    const sendMock = jest.fn();
    const res = {
      sendStatus: sendMock,
    };
    respond(res);
    expect(sendMock).toHaveBeenCalledWith(200);
  });
});
