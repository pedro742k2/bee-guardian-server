import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

export const handleGetHives = (db: Knex) => (req: IReq, res: Response) => {
  const { user_id } = req.user;

  return db("hives")
    .join("user_hives", "hives.hive_id", "user_hives.hive_id")
    .select("hives.hive_id", "hive_details", "add_date")
    .where("user_hives.hive_user_id", user_id)
    .orderBy("hive_details")
    .then((data) => {
      return res.json(data);
    })
    .catch(() => res.status(500).json({ error: "Internal Server Error" }));
};
