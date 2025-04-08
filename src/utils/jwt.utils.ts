import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set.");
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
