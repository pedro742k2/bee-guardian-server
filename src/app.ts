import express from "express";
import cors from "cors";
import helmet from "helmet";
require("dotenv").config();
import { router } from "./routes";
const morgan = require("morgan");

export const app = express();

app.use(morgan("combined"));
app.use(
  cors({
    origin: ["https://pedro742k2.github.io", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use(helmet());
app.use("/api/", router);
