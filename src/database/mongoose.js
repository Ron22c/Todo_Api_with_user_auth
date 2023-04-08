import mongoose from "mongoose";
import { MONGODB_ATLAS_URI } from "../config.js";

export default function bootstrap() {
  // Set up default mongoose connection
  mongoose.connect(MONGODB_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "task-app"
  });

  // Get the default connection
  const db = mongoose.connection;
  console.log("MongoDB connected successfully.");
  // Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}
