import { RedisClientType } from "@redis/client";
import { Knex } from "knex";

export const verifyHiveAccess = async (
  db: Knex,
  user_id: number,
  hive_id: number,
  redisClient: RedisClientType
) => {
  const cachedUserHiveAccess = await redisClient.sIsMember(
    `user:${user_id}:hives`,
    hive_id.toString()
  );

  if (cachedUserHiveAccess)
    return {
      access: true,
      message: "ok",
      httpCode: 200,
    };

  return db("user_hives")
    .select("hive_id")
    .where({
      hive_id,
      hive_user_id: user_id,
    })
    .then((data) => {
      if (data[0]?.hive_id !== hive_id)
        return {
          access: false,
          message: "You do not have permission to access this hive info",
          httpCode: 403,
        };

      redisClient.sAdd(`user:${user_id}:hives`, hive_id.toString());

      return {
        access: true,
        message: "ok",
        httpCode: 200,
      };
    })
    .catch(() => ({
      access: false,
      message: "Internal Server Error",
      httpCode: 500,
    }));
};
