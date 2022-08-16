const jwt = require("jsonwebtoken");

export const signToken = (
  user_id: number,
  expiresIn: "session_token" | "refresh_token"
) =>
  jwt.sign(
    {
      user_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: expiresIn === "session_token" ? "1d" : "7d",
    }
  );
