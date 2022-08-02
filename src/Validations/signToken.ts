const jwt = require("jsonwebtoken");

export const signToken = (user_id: number, expiresIn: number) =>
  jwt.sign(
    {
      user_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn,
    }
  );
