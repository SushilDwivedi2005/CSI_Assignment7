import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToMongoDB from "./mongo/connect.js";
import todoRoutes from "./routes/todo_routes.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const port = 5000;

app.use(cors()); 
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

connectToMongoDB.on("open", () => {
  console.log("MongoDB connected successfully");
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
});
