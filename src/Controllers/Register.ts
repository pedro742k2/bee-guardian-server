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
            .returning("*")
            .then((userData) =>
              trx("login")
                .insert({
                  username,
                  email,
                  hash,
                })
                .returning("*")
                .then((loginData) => {
                  const token = signToken(
                    loginData[0].user_id,
                    "session_token"
                  );
                  const refresh_token = signToken(
                    loginData[0].user_id,
                    "refresh_token"
                  );

                  const { name, phone, join_date } = userData[0];
                  const { username, email } = loginData[0];

                  return res.json({
                    token,
                    refresh_token,
                    profile: {
                      username,
                      email,
                      name,
                      phone,
                      join_date,
                    },
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

          console.log(error);

          return res.status(500).json({ error: "Internal server error." });
        });
    });
  };
