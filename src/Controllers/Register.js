const { registerValidation } = require("../Validations/inputSyntax");
const { signToken } = require("../Validations/signToken");

const handleRegister = (db, bcrypt) => (req, res) => {
  const SALT = 10;
  const { name, username, password, email, phone } = req.body;

  const isValid = registerValidation({
    name,
    username,
    password,
    email,
    phone,
  });

  if (isValid.error)
    return res.status(400).json({
      error: isValid.error.details[0].message,
    });

  return bcrypt.hash(password, SALT, (error, hash) => {
    if (error) return res.status(500).json({ error: "Internal server error." });

    db.transaction((trx) =>
      trx
        .insert({
          name,
          username,
          email,
          phone,
          join_date: new Date(),
        })
        .into("users")
        .then(() =>
          trx("login")
            .insert({
              username,
              email,
              hash,
            })
            .returning("*")
            .then((data) => {
              const token = signToken(data[0].user_id, "1d");

              return res.json({
                token,
              });
            })
            .catch((error) => {
              console.log(error);
              return res.status(500).json({ error: "Internal server error." });
            })
        )
        .then(trx.commit)
        .catch(trx.rollback)
    ).catch((error) => {
      console.log(error);
      if (error.code === "23505")
        return res.status(400).json({ error: error.detail });

      return res.status(500).json({ error: "Internal server error." });
    });
  });
};

module.exports = { handleRegister };
