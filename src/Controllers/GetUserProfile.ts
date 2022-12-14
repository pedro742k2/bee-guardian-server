import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

export const handleGetUserProfile =
  (db: Knex) => (req: IReq, res: Response) => {
    const { user_id } = req.user;

    db("users")
      .join("login", "users.username", "login.username")
      .select("login.username", "name", "users.email", "phone", "join_date")
      .where("login.user_id", user_id)
      .then((data) => {
        if (!data[0])
          return res.status(400).json({ error: "User does not exist." });

        return res.json(data[0]);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal server error." });
      });
  };
