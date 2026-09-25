import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async() : Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined");
  }

  try{
     await mongoose.connect(mongoURI);
    
   
  }
    
   catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
