import { Response } from "express";
import { Knex } from "knex";
import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "redis";
import { IReq } from "src/Types/request";
import { verifyHiveAccess } from "../Validations/verifyHiveAccess";

export const handleGetHiveNotes =
  (
    db: Knex,
    redisClient: RedisClientType<RedisFunctions, RedisModules, RedisScripts>
  ) =>
  async (req: IReq, res: Response) => {
    const { user_id } = req.user;
    const { hive_id } = req.body;

    if (!user_id || !hive_id)
      return res.status(400).json({ message: "Invalid parameters." });

    const hasAccess = await verifyHiveAccess(db, user_id, hive_id, redisClient);

    const { access, message, httpCode } = hasAccess;

    if (!access) return res.status(httpCode || 403).json({ message });

    return db
      .transaction((trx) =>
        trx("hive_notes")
          .select("note_id", "note", "added_by", "added_date")
          .where({ hive_id })
          .then((data) => {
            return res.json(data);
          })
          .then(trx.commit)
          .catch(trx.rollback)
      )
      .catch(() => {
        return res.status(500).json({ error: "Internal Server Error" });
      });
  };
