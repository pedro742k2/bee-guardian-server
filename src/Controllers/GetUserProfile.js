const handleGetUserProfile = (db) => (req, res) => {
  const { user_id } = req.user;

  db("users")
    .join("login", "users.username", "login.username")
    .select("name", "users.email", "phone")
    .where("login.user_id", user_id)
    .then((data) => {
      if (!data[0])
        return res.status(400).json({ error: "User does not exist." });

      return res.json(data[0]);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error." });
    });
};

module.exports = { handleGetUserProfile };
