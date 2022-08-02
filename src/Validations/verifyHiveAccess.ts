import { Knex } from "knex";

export const verifyHiveAccess = (db: Knex, user_id: number, hive_id: number) =>
  db("user_hives")
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

      return {
        access: true,
      };
    })
    .catch(() => ({
      access: false,
      message: "Internal Server Error",
      httpCode: 500,
    }));
