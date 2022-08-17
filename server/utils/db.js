import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(`\n\n${chalk.green("DB Connection has been established successfully.")}`))
    .catch((err) => console.log(err.message));
