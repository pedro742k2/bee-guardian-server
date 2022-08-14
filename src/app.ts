import express from "express";
import cors from "cors";
import helmet from "helmet";
require("dotenv").config();
import { router } from "./routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/api/", router);
