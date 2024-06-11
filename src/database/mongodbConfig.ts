import mongoose from 'mongoose';

const db = process.env.MONGODB_URI;

export default async function connectDB() {
  try {
    mongoose.connect(db!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database Connected");
    });
    connection.on("error", (error: any) => {
      console.log("Database Connection Failed", error);
      process.exit();
    });
  } catch (error: any) {
    console.log("Database Connection Failed", error);
  }
}
