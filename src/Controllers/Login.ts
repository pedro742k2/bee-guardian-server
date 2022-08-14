import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

const { signToken } = require("../Validations/signToken");

export const handleLogin =
  (db: Knex, bcrypt: any) => (req: IReq, res: Response) => {
    const { user, password } = req.body;

    db("login")
      .join("users", "users.username", "login.username")
      .select(
        "hash",
        "user_id",
        "login.username",
        "login.email",
        "users.name",
        "users.phone",
        "users.join_date"
      )
      .where("login.username", user)
      .orWhere("login.email", user)
      .then((data) => {
        if (!data[0])
          return res.status(400).json({ error: "Wrong credentials" });

        return bcrypt
          .compare(password, data[0].hash)
          .then((success: boolean) => {
            if (!success)
              return res.status(400).json({ error: "Wrong credentials" });

            const token = signToken(data[0].user_id, "1d");
            const { username, email, name, phone, join_date } = data[0];

            return res.json({
              token,
              profile: {
                username,
                email,
                name,
                phone,
                join_date,
              },
            });
          })
          .catch(() =>
            res.status(500).json({ error: "Internal Server Error." })
          );
      });
  };
