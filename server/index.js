import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/User-Routes.js";
import videoRoutes from "./routes/Video-Routes.js";
import commentRoutes from "./routes/Comment-Routes.js";
import authRoutes from "./routes/Auth-Routes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log("Connected to the DB!");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Connected to the Server!");
});
