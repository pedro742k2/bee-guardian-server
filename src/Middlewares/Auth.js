const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.status(401).json({ error: "Access denied." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    return next();
  } catch {
    return res.status(401).json({ error: "Access denied." });
  }
};

module.exports = requireAuth;
