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

export const handleRemoveHiveNote =
  (
    db: Knex,
    redisClient: RedisClientType<RedisFunctions, RedisModules, RedisScripts>
  ) =>
  async (req: IReq, res: Response) => {
    const { user_id } = req.user;
    const { note_id, hive_id } = req.body;

    const isHiveAssociated = await verifyHiveAccess(
      db,
      user_id,
      hive_id,
      redisClient
    );
    const { access, message, httpCode } = isHiveAssociated;

    if (!access) return res.status(httpCode || 403).json({ error: message });

    return db("hive_notes")
      .delete("note_id")
      .where({ note_id })
      .returning("note_id")
      .then((data) => {
        if (!data[0])
          return res.status(400).json({ error: "Note doesn't exist." });

        return res.json({ message: "Note deleted successfully." });
      })
      .catch(() => res.status(500).json({ error: "Internal Server Error." }));
  };
