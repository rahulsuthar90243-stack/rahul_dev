import mongoose from "mongoose"
import dotenv from "dotenv"

const connectDB = async () => {

    try {
     if(!process.env.MONGODB_URL){
     throw new Error("MONGODB_URL is not defined in environment");
     }

    const MONGO_URL = `${process.env.MONGODB_URL}/${process.env.DB_NAME.trim()}`;
     await mongoose.connect(MONGO_URL);

     console.log("MONGODB connect successfully");
        
    } catch (error) {
        console.log("MONGODB Connection Error", error);
        throw error;
    }
}

export default connectDB;