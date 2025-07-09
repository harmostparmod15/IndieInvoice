const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  checkValidDataRegister,
  checkValidDataLogin,
} = require("../middleware/authMiddleware");
const protectFromCookie = require("../middleware/cookieChecker")
const { isValidEmail } = require("../utils/index");
const User = require("../model/user");
const Client = require("../model/client");

const authRouter = express.Router();


//  ==============. USER ROUTES ===================

// Login route
authRouter.post("/login", checkValidDataLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      msg: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        companyName: user.companyName,
        logoUrl: user.logoUrl,
      },
      error: "",
    });
  } catch (error) {
    res.status(401).json({
      status: 401,
      msg: "Login failed",
      error: error.message,
      data: {},
    });
  }
});






// Register route
authRouter.post("/register", checkValidDataRegister, async (req, res) => {
  try {
    const { name, email, password, companyName, logoUrl } = req.body;

    if (!isValidEmail(email)) throw new Error("Invalid email format");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists with this email");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      companyName,
      logoUrl,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      status: 201,
      msg: "Registration successful",
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        companyName: savedUser.companyName,
        logoUrl: savedUser.logoUrl,
      },
      error: "",
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      msg: "Registration failed",
      error: error.message,
      data: {},
    });
  }
});


//  ==============. CLIENT ROUTES ===================




authRouter.post("/client/register",protectFromCookie , checkValidDataRegister, async (req, res) => {
  try {
    const { name, email, password, companyName,  phone,
        address,
        gstNumber,
        notes, } = req.body;


//  valid email check
if (!isValidEmail(email)) {
    throw new Error("Invalid email format.");
  }

    //  Check if user already exists
    const existingUser = await Client.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userId = req?.user?.id;

    //  Create new user
    const newClient = new Client({
        userId,
      name,
      email,
      passwordHash,
      companyName,
      phone,
      address,
      gstNumber,
      notes,
    });

    await newClient.save();


    res.status(201).json({
        status: 201,
        msg: "Client registered successfully",
        data: {
            id: newClient._id,
            name: newClient.name,
            email: newClient.email,
            companyName: newClient.companyName,
            phone:newClient.phone,
            gstNumber:newClient.gstNumber
          },
        error: "",
      });
  

  } catch (error) {

        res.status(400).json({
          status: 400,
          msg: "Registration failed",
          error: error.message,
          data: {},
        })

  }
});




module.exports = authRouter;
