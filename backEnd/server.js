import express from "express";
import cors from "cors";
import connectToMongoDB from "./mongo/connect.js";
import todoRoutes from "./routes/todo_routes.js";
import authRoutes from "./routes/auth.js";

const JWT_SECRET = "1cff408cebcd48c9e9ed0a1d14c9d8937bccf9bd15f6ca460e6d87a56c95b0a6";

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
