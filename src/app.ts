import express from "express";
import connectdb from "./db";
import cors from "cors";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";
import { env } from "./config/env";
import authorRouter from "./routes/auther.router";
import catagorieRouter from "./routes/catagory.router";
import bookRouter from "./routes/book.router";
import path from "path";

console.log(env.DB_URL);
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/authors", authorRouter);
app.use("/catagories", catagorieRouter);
app.use("/books", bookRouter);
app.use(notFound);
app.use(errorHandler);

connectdb();

app.listen(env.PORT, () => {
  console.log("Server is Running now on");
});
