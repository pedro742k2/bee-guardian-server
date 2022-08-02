import express from "express";
import cors from "cors";
import helmet from "helmet";
require("dotenv").config();
import { router } from "./routes";

const server = express();

const PORT = process.env.PORT || 4000;

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use("/api/", router);

server.listen(PORT, () => console.log(`Server started at port ${PORT}`));
