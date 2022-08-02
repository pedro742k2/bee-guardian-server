import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

const { updateUserValidation } = require("../Validations/inputSyntax");

export const handleUpdateUserProfile =
  (db: Knex) => (req: IReq, res: Response) => {
    const { newName, newEmail, newPhone } = req.body;
    const { user_id } = req.user;

    // Nota: Knex não suporta update com join
    // https://stackoverflow.com/questions/41516066/knex-error-missing-from-clause-entry-for-table

    const isValid = updateUserValidation({
      name: newName,
      email: newEmail,
      phone: newPhone,
    });

    if (isValid.error)
      return res.status(400).json({ error: isValid.error.details[0].message });

    return db
      .select("username")
      .from("login")
      .where("user_id", user_id)
      .then((data) => {
        if (!data[0]) return res.status(401).json({ error: "Access denied." });

        return db("users")
          .update({
            name: newName,
            email: newEmail,
            phone: newPhone,
          })
          .where("username", data[0].username)
          .returning("email")
          .then((returning) => {
            const { email } = returning[0];
            if (email !== newEmail)
              return res.status(500).json({ success: false });

            return db("login")
              .where("user_id", user_id)
              .update({
                email: newEmail,
              })
              .returning("email")
              .then((loginReturn) => {
                const { email } = loginReturn[0];

                if (email !== newEmail)
                  return res.status(500).json({ success: false });

                return res.json({ success: true });
              })
              .catch(() =>
                res.status(500).json({ error: "Internal Server Error" })
              );
          })
          .catch((error) => {
            if (error.code === "23505")
              return res.status(400).json({ error: error.detail });

            return res.status(500).json({ error: "Internal Server Error" });
          });
      })
      .catch(() => res.status(500).json({ error: "Internal Server Error" }));
  };
