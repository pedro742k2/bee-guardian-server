import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

const { registerValidation } = require("../Validations/inputSyntax");
const { signToken } = require("../Validations/signToken");

export const handleRegister =
  (db: Knex, bcrypt: any) => (req: IReq, res: Response) => {
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

    return bcrypt.hash(password, SALT, (error: boolean, hash: string) => {
      if (error)
        return res.status(500).json({ error: "Internal server error." });

      return db
        .transaction((trx) =>
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
                .catch(() => {
                  return res
                    .status(500)
                    .json({ error: "Internal server error." });
                })
            )
            .then(trx.commit)
            .catch(trx.rollback)
        )
        .catch((error) => {
          if (error.code === "23505")
            return res.status(400).json({ error: error.detail });

          return res.status(500).json({ error: "Internal server error." });
        });
    });
  };
