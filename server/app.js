import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import "./utils/db.js";
import api from "./routes/api.js";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", api);

app.listen(port, () => {
    console.error(`${process.env.APP_NAME} Listening At\n\n ${chalk.white.bold("Local:")} ${chalk.green(`http://localhost:${port}`)}`);
});

// no kk = 3328041504130019
// nik = 3328042701870002
// 27/01/1987
