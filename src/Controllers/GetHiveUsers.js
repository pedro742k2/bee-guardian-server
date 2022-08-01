const handleGetHiveUsers = (db) => (req, res) => {
  const { hive_id } = req.body;
  const { user_id } = req.user;

  return db("user_hives")
    .select("hive_id")
    .where({
      hive_id,
      hive_user_id: user_id,
    })
    .then((data) => {
      if (data[0].hive_id !== hive_id)
        return res.status(301).json({
          error: "You do not have permission to access this hive info",
        });

      return db("user_hives")
        .join("login", "user_hives.hive_user_id", "login.user_id")
        .join("users", "login.username", "users.username")
        .select("login.email", "users.name")
        .where({ hive_id })
        .then((data) => res.json(data))
        .catch((error) =>
          res.status(500).json({ error: "Internal Server Error" })
        );
    })
    .catch((error) => res.json({ error: "Internal Server Error" }));
};

module.exports = { handleGetHiveUsers };
