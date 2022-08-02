import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

const { passwordValidation } = require("../Validations/inputSyntax");

export const handleUpdatePassword =
  (db: Knex, bcrypt: any) => (req: IReq, res: Response) => {
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

        return bcrypt
          .compare(currentPassword, data[0].hash)
          .then((result: string) => {
            if (!result)
              return res.status(400).json({ error: "Wrong password" });

            return bcrypt.hash(
              newPassword,
              SALT,
              (error: boolean, hash: string) => {
                if (error)
                  return res
                    .status(500)
                    .json({ error: "Internal server error", codError: 0 });

                return db("login")
                  .update({
                    hash,
                  })
                  .where("user_id", user_id)
                  .returning("user_id")
                  .then((returning) => {
                    if (!returning[0]) return res.json({ success: false });

                    return res.json({ success: true });
                  })
                  .catch(() =>
                    res.status(500).json({ error: "Internal Server Error" })
                  );
              }
            );
          })
          .catch(() => {
            return res.status(500).json({ error: "Internal Server Error" });
          });
      })
      .catch(() => res.status(500).json({ error: "Interrnal Server Error" }));
  };
