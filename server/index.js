const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRouter = require("./routes/auth.js")
const clientRouter = require("./routes/client.js")

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // allow React frontend
  credentials: true               // allow cookies (very important)
}));

// Middleware
app.use(cookieParser());
app.use(express.json());



app.use("/api/auth/", authRouter  );
app.use("/api/client" , clientRouter);

// DB
connectDB();

// Start server
app.listen(4000, () => console.log("🚀 Server started at 4000"));
