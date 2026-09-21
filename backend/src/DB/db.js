import mongoose from "mongoose"

let connectionPromise;

const connectDB = async () => {

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not defined in environment");
    }

    if (!process.env.DB_NAME) {
        throw new Error("DB_NAME is not defined in environment");
    }

    const mongoUrl = `${process.env.MONGODB_URL}/${process.env.DB_NAME.trim()}`;
    connectionPromise = mongoose.connect(mongoUrl)
        .then(() => {
            console.log("MONGODB connect successfully");
            return mongoose.connection;
        })
        .catch((error) => {
            connectionPromise = undefined;
            console.error("MONGODB Connection Error", error);
            throw error;
        });

    return connectionPromise;
}

export default connectDB;