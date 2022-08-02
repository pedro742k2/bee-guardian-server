import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

const { signToken } = require("../Validations/signToken");

export const handleLogin =
  (db: Knex, bcrypt: any) => (req: IReq, res: Response) => {
    const { user, password } = req.body;

    db.select("hash", "user_id", "email")
      .where("username", user)
      .orWhere("email", user)
      .from("login")
      .then((data) => {
        if (!data[0])
          return res.status(400).json({ error: "Wrong credentials" });

        return bcrypt
          .compare(password, data[0].hash)
          .then((success: boolean) => {
            if (!success)
              return res.status(400).json({ error: "Wrong credentials" });

            const token = signToken(data[0].user_id, "1d");

            return res.json({
              token,
            });
          })
          .catch(() =>
            res.status(500).json({ error: "Internal Server Error." })
          );
      });
  };
