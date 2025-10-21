import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Signup controller
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate user
        if ( !username || !email || !password ) {
            return res.status(400).json({ message: "All field are required"});
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "Email already in use" });
            }

        // Create user (password will be hashed by the model pre-save hook)
        const createdUser = await User.create({
            username,
            email,
            password,
        });

        // Generate a token
        const token = jwt.sign(
            { id: createdUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Respond
        res.status(201).json({
            message : "User signed up successfully, Welcome!",
            user: {
                id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
                password: createdUser.password,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later!" });
        console.error("Signup error:", error);
    }
};


// Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate user
        if ( !email || !password ) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // compare password using model method
        const isMatch = await existingUser.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a token
        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Respond
        res.status(200).json({
            message: "Login successful, Welcome back!",
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                password: existingUser.password,    
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later!" });
        console.error("Login error:", error);
    }
};
