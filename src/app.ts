import express from "express";
import connectdb from "./db";
import cors from "cors";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";
import { env } from "./config/env";
console.log(env.DB_URL);

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(notFound);
app.use(errorHandler);

connectdb();

app.listen(() => {
  console.log("Server is Running now");
});
