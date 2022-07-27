const jwt = require("jsonwebtoken");

const signToken = (user_id) =>
  jwt.sign(
    {
      user_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

module.exports = { signToken };
