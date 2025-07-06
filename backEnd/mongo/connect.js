import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.connect(url);

const connectToMongoDB = mongoose.connection;

connectToMongoDB.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1);
});

export default connectToMongoDB;
