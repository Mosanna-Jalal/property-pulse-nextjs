import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set("strictQuery", true);

  // If the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('DB connected from try');
    
  }
    catch (error) {
        console.log('db error start');
        
    console.error("Database connection error:", error);
    }
};
export default connectDB;