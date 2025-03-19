/* eslint-disable no-var */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined.");
}

declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

globalThis.mongooseConnection = globalThis.mongooseConnection || {
  conn: null,
  promise: null,
};

async function connectToDatabase() {
  if (globalThis.mongooseConnection.conn) {
    console.log("Using cached MongoDB connection");
    return globalThis.mongooseConnection.conn;
  }

  if (!globalThis.mongooseConnection.promise) {
    const opts = {
      dbName: "exclusive",
      bufferCommands: false,
    };

    globalThis.mongooseConnection.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("New MongoDB connection established");
        return mongooseInstance;
      });
  }

  try {
    globalThis.mongooseConnection.conn = await globalThis.mongooseConnection
      .promise;
  } catch (error) {
    globalThis.mongooseConnection.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return globalThis.mongooseConnection.conn;
}

export default connectToDatabase;
