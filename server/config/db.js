const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/invoice-app", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(" MongoDB connected");
    } catch (error) {
        console.error(" MongoDB connection failed:", error.message);
        process.exit(1); // Exit app on failure
    }
};

module.exports = connectDB;
