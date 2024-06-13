import mongoose from 'mongoose';

const db :any = process.env.MONGODB_URI;

if (!db) {
  throw new Error("Please connect to the database");
}

let isConnected: boolean = false;

export default async function connectDB() {
  if (isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    isConnected = true;

    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });

    mongoose.connection.on("error", (error: any) => {
      console.error("Database Connection Failed", error);
      process.exit(1);
    });
  } catch (error: any) {
    console.error("Database Connection Failed", error);
    process.exit(1);
  }
}
