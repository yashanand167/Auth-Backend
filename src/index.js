import connectDB from "./db/index.js";
import express from "express";
import app from "./app.js";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
