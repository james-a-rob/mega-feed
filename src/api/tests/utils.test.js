const fs = require("fs");
const { getUserId, getSecureKey } = require("../utils");

jest.mock("fs");
beforeAll(() => {
  fs.writeFileSync.mockClear();
  fs.readFileSync.mockClear();
});
describe("user id", () => {
  it("gets already created user id", () => {
    fs.readFileSync.mockReturnValue("1234");

    expect(getUserId()).toBe("1234");
  });

  it("creates user id if one does not exist", () => {
    fs.readFileSync.mockReturnValue("");
    getUserId();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});

describe("secure key", () => {
  it("gets already created secure key", () => {
    fs.readFileSync.mockReturnValue("1234");

    expect(getSecureKey()).toBe("1234");
  });

  it("creates secure key if one does not exist", () => {
    fs.readFileSync.mockReturnValue("");
    getSecureKey();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
