const jwt = require("jsonwebtoken");

const signToken = (user_id, expiresIn) =>
  jwt.sign(
    {
      user_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn,
    }
  );

module.exports = { signToken };
