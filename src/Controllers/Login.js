const { signToken } = require("../Validations/signToken");

const handleLogin = (db, bcrypt) => (req, res) => {
  const { user, password } = req.body;

  db.select("hash", "user_id", "email")
    .where("username", user)
    .orWhere("email", user)
    .from("login")
    .then((data) => {
      if (!data[0]) return res.status(400).json({ error: "Wrong credentials" });

      bcrypt
        .compare(password, data[0].hash)
        .then((result) => {
          if (!result)
            return res.status(400).json({ error: "Wrong credentials" });

          const token = signToken(data[0].user_id, "1d");

          return res.json({
            token,
          });
        })
        .catch((error) =>
          res.status(500).json({ error: "Internal Server Error." })
        );
    });
};

module.exports = { handleLogin };
