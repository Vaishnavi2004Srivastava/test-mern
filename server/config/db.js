const mongoose = require("mongoose");

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    const LOCAL_URI = "mongodb://localhost:27017/expense_tracker";

    try {
        console.log("Connecting to MongoDB Atlas...");
        // Fast fail if connection issues
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB Atlas connected successfully");
    } catch (err) {
        console.error("MongoDB Atlas connection failed:");
        console.error(err.message);

        console.log("Attempting fallback to local MongoDB...");
        try {
            await mongoose.connect(LOCAL_URI, {
                serverSelectionTimeoutMS: 5000
            });
            console.log("Local MongoDB connected successfully");
        } catch (localErr) {
            console.error("Local MongoDB connection failed too.");
            console.warn("Server will continue running without DB connection. API calls will fail.");
        }
    }
};

module.exports = connectDB;
