const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const router = require("./routes");

const server = express();

const PORT = process.env.PORT || 4000;

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use("/api/", router);

server.listen(PORT, () => console.log(`Server started at port ${PORT}`));
