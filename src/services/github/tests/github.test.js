const { parser } = require("..");
const commitMock = require("./mocks/commit");

describe("github parse function", () => {
  it("correctly parses a commit event", () => {
    const parsedMessage = parser(commitMock);
    expect(parsedMessage).toBe(
      "new commit by jamesrobertson251 to the fullstack-js-kickstarter repo with message Update README.md"
    );
  });
});
