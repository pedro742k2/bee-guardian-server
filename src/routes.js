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
const { handleGetHiveUsers } = require("./Controllers/GetHiveUsers");

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

// Receive data from the eletronic device
router.post("/receive-data", handleReceiveData(db));

// Register and authenticate a new user
router.post("/register", handleRegister(db, bcrypt));

// Authenticate a user
router.post("/login", handleLogin(db, bcrypt));

// Add a new hive or update its details
router.post("/add-hive", auth, handleAddHive(db));

// Get the hives of an user
router.get("/get-hives", auth, handleGetHives(db));

// Get the readings of an hive
router.post("/get-hive-data", auth, handleGetHiveData(db));

// Remove an hive from a user
router.delete("/remove-hive", auth, handleRemoveHive(db));

// Get a user profile
router.get("/get-user-profile", auth, handleGetUserProfile(db));

// Update a user profile
router.put("/update-user-profile", auth, handleUpdateUserProfile(db));

// Update a user password
router.put("/update-password", auth, handleUpdatePassword(db, bcrypt));

// Get the users associated with a hive
router.post("/get-hive-users", auth, handleGetHiveUsers(db));

module.exports = router;
