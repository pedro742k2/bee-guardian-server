import knex from "knex";
import express from "express";
import bcrypt from "bcryptjs";
import auth from "./Middlewares/Auth";
import { handleReceiveData } from "./Controllers/ReceiveData";
import { handleLogin } from "./Controllers/Login";
import { handleRegister } from "./Controllers/Register";
import { handleAddHive } from "./Controllers/AddHive";
import { handleGetHiveData } from "./Controllers/GetHiveData";
import { handleGetHives } from "./Controllers/GetHives";
import { handleRemoveHive } from "./Controllers/RemoveHive";
import { handleGetUserProfile } from "./Controllers/GetUserProfile";
import { handleUpdateUserProfile } from "./Controllers/UpdateUserProfile";
import { handleUpdatePassword } from "./Controllers/UpdatePassword";
import { handleGetHiveUsers } from "./Controllers/GetHiveUsers";
import { handleAddHiveNote } from "./Controllers/AddHiveNote";
import { handleUpdateTareWeight } from "./Controllers/UpdateTareWeight";
import { handleRefreshToken } from "./utils/RefreshToken";
import { handleMockToDB } from "./Controllers/Tests/mockToDB";
import { handleGetHiveNotes } from "./Controllers/GetHiveNotes";
import { handleRemoveHiveNote } from "./Controllers/RemoveHiveNote";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DATABASE_URL, NODE_ENV } =
  process.env;

const DB_CONNECTION_CONFIG =
  NODE_ENV === "production"
    ? {
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      };

const db = knex({
  client: "pg",

  connection: DB_CONNECTION_CONFIG,
});

export const router = express.Router();

router.post("/upload-mock-to-db", handleMockToDB(db));

// Receive data from the eletronic device
router.post("/receive-data", handleReceiveData(db));

// Refresh the JWT token if possible
router.get("/refresh-token", handleRefreshToken);

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

// Add a note to the hive
router.post("/add-hive-note", auth, handleAddHiveNote(db));

// Get the hive notes
router.post("/get-hive-notes", auth, handleGetHiveNotes(db));

// Remove hive note
router.delete("/remove-hive-note", auth, handleRemoveHiveNote(db));

// Update the hive tare weight
router.put("/update-tare-weight", auth, handleUpdateTareWeight(db));
