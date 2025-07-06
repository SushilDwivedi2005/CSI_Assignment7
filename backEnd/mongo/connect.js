import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/todo_app';

mongoose.connect(url);

const connectToMongoDB = mongoose.connection;

connectToMongoDB.on('error', (err) => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1); 
});

export default connectToMongoDB;
