const knex = require("knex");
const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("./Middlewares/Auth");
const { handleReceiveData } = require("./Controllers/ReceiveData");
const { handleLogin } = require("./Controllers/Login");
const { handleRegister } = require("./Controllers/Register");
const { handleAddHive } = require("./Controllers/AddHive");
const { handleGetHiveData } = require("./Controllers/GetHiveData");
const { handleGetHives } = require("./Controllers/GetHives");
const { handleRemoveHive } = require("./Controllers/RemoveHive");
const { handleGetUserProfile } = require("./Controllers/GetUserProfile");
const { handleUpdateUserProfile } = require("./Controllers/UpdateUserProfile");
const { handleUpdatePassword } = require("./Controllers/UpdatePassword");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = knex({
  client: "pg",
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
});

const router = express.Router();

router.post("/receive-data", handleReceiveData(db));

router.post("/register", handleRegister(db, bcrypt));

router.post("/login", handleLogin(db, bcrypt));

router.post("/add-hive", auth, handleAddHive(db));

router.get("/get-hives", auth, handleGetHives(db));

router.post("/get-hive-data", auth, handleGetHiveData(db));

router.delete("/remove-hive", auth, handleRemoveHive(db));

router.get("/get-user-profile", auth, handleGetUserProfile(db));

router.put("/update-user-profile", auth, handleUpdateUserProfile(db));

router.put("/update-password", auth, handleUpdatePassword(db, bcrypt));

module.exports = router;
