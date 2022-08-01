const verifyHiveAccess = (db, user_id, hive_id) =>
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
    .catch((error) => ({
      access: false,
      message: "Internal Server Error",
      httpCode: 500,
    }));

module.exports = { verifyHiveAccess };
