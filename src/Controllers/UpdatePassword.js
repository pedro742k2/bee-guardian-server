const { passwordValidation } = require("../Validations/inputSyntax");

const handleUpdatePassword = (db, bcrypt) => (req, res) => {
  const SALT = 10;
  const { currentPassword, newPassword } = req.body;
  const { user_id } = req.user;

  const isValid = passwordValidation({
    password: newPassword,
  });

  if (isValid.error)
    return res.status(400).json({ error: isValid.error.details[0].message });

  // Nota: Knex não suporta update com join
  // https://stackoverflow.com/questions/41516066/knex-error-missing-from-clause-entry-for-table

  return db
    .select("hash")
    .from("login")
    .where("user_id", user_id)
    .then((data) => {
      if (!data[0]) return res.status(401).json({ error: "Access denied." });

      bcrypt
        .compare(currentPassword, data[0].hash)
        .then((result) => {
          if (!result) return res.status(400).json({ error: "Wrong password" });

          bcrypt.hash(newPassword, SALT, (error, hash) => {
            if (error)
              return res
                .status(500)
                .json({ error: "Internal server error", codError: 0 });

            db("login")
              .update({
                hash,
              })
              .where("user_id", user_id)
              .returning("user_id")
              .then((returning) => {
                if (!returning[0]) return res.json({ success: false });

                return res.json({ success: true });
              })
              .catch((error) =>
                res.status(500).json({ error: "Internal Server Error" })
              );
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) =>
      res.status(500).json({ error: "Interrnal Server Error" })
    );
};

module.exports = { handleUpdatePassword };
