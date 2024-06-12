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

// import mongoose,{Mongoose} from "mongoose";

// const db =process.env.MONGODB_URI;

// interface MongooseConnection{
//     connection: Mongoose | null;
//     promise: Promise<Mongoose> | null;
// }

// let cached: MongooseConnection = ( global as any).mongoose;

// if(!cached){
//     cached = (global as any).mongoose = { connection: null, promise: null };
// }

// export const connectDB = async () => {
//     if(cached.connection){
//         return cached.connection;
//     }

//     if (!db) throw new Error("MONGODB_URL is not defined");
//         cached.promise = cached.promise || 
//         mongoose.connect(db, 
//              {dbName:'users', bufferCommands: false});
       
    
//     cached.connection = await cached.promise;
//     return cached.connection;
// }

