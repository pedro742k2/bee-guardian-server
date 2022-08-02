import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

const { verifyHiveAccess } = require("../Validations/verifyHiveAccess");

export const handleUpdateTareWeight =
  (db: Knex) => async (req: IReq, res: Response) => {
    const { user_id } = req.user;
    const { hive_id, tare_weight } = req.body;

    const isHiveAssociated = await verifyHiveAccess(db, user_id, hive_id);
    const { access, message, httpCode } = isHiveAssociated;

    if (!access) return res.status(httpCode).json({ error: message });

    return db("hives")
      .update({ tare_weight })
      .returning("tare_weight")
      .then((data) => {
        if (!data[0] || Number(data[0]?.tare_weight) !== tare_weight)
          return res.status(500).json({ error: "Internal Server Error" });

        return res.json({ updated: true });
      })
      .catch(() => res.status(500).json({ error: "Internal Server Error" }));
  };
