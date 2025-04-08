import { generateToken } from "../jwt.utils";

describe("generateToken", () => {
  it("should generate a valid JWT token", () => {
    process.env.JWT_SECRET = "test-secret";

    const payload = { id: 1, email: "test@example.com" };
    const token = generateToken(payload);

    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
  });

  it("should throw an error if JWT_SECRET is not defined", () => {
    delete process.env.JWT_SECRET;

    expect(() => generateToken({ id: 1 })).toThrow("JWT_SECRET is not set");
  });
});
