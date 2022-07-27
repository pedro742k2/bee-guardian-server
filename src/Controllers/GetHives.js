const handleGetHives = (db) => (req, res) => {
  const { user_id } = req.user;

  return db("hives")
    .join("user_hives", "hives.hive_id", "user_hives.hive_id")
    .select("hives.hive_id", "hive_details", "add_date")
    .where("user_hives.hive_user_id", user_id)
    .orderBy("hive_details")
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => res.status(500).json({ error: "Internal Server Error" }));
};

module.exports = { handleGetHives };
