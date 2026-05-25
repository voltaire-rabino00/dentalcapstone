import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

const CONNECTION_OPTIONS: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5000,  // Fail fast if MongoDB is unreachable
  socketTimeoutMS: 45000,          // Close sockets after 45s of inactivity
};

// ─── Event Listeners ──────────────────────────────────────────────────────────

mongoose.connection.on("connected", () => {
  console.log("[Database] MongoDB connection established successfully.");
});

mongoose.connection.on("error", (error: Error) => {
  console.error("[Database] MongoDB connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("[Database] MongoDB connection lost. Attempting to reconnect...");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("[Database] MongoDB connection closed due to application termination.");
  process.exit(0);
});

// ─── Connect Function ─────────────────────────────────────────────────────────

const connectDatabase = async (): Promise<void> => {
  if (!MONGODB_URI) {
    throw new Error(
      "[Database] MONGODB_URI is not defined. Please set it in your .env file."
    );
  }

  try {
    await mongoose.connect(MONGODB_URI, CONNECTION_OPTIONS);
  } catch (error) {
    console.error("[Database] Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDatabase;