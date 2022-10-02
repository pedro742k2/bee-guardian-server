import { RedisClientType } from "@redis/client";
import { Response } from "express";
import { Knex } from "knex";
import { RedisFunctions, RedisModules, RedisScripts } from "redis";
import { IReq } from "src/Types/request";

export const handleRemoveHive =
  (
    db: Knex,
    redisClient: RedisClientType<RedisFunctions, RedisModules, RedisScripts>
  ) =>
  (req: IReq, res: Response) => {
    const { hive_id } = req.body;
    const { user_id } = req.user;

    return db("user_hives")
      .del()
      .where({
        hive_id,
        hive_user_id: user_id,
      })
      .returning("hive_id")
      .then((data) => {
        if (!data[0])
          return res.status(400).json({ error: "This hive is not added." });

        redisClient.sRem(`user:${user_id}:hives`, hive_id.toString());
        return res.json(data[0]);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };
