import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (mongoose.connections && mongoose.connections[0].readyState) {
            return;
        }
        // Added timeout options to fail fast if connection hangs (e.g. correct IP not whitelisted)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;

    } catch (error) {
        console.error("Error connecting to database:", error.message);
        // Throw error so calling functions know connection failed
        throw new Error("Database connection failed");
    }
}

export default connectDb;