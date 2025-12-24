import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: "All fields are required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET_KEY);

        res.json({success: true, message: "User registered successfully",token, userData: {name: userData.name} });

    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check if user exists
        const userData = await User.findByEmail(email);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" }); 
        }

        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET_KEY);
        res.json({ success: true, message: "User logged in successfully", token, userData: { name: userData.name } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const userCredits = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log(userId)
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const userData = await User.findById(userId);
        // console.log(userData)
        res.json({ success: true, credits: userData.credit_balance, user: userData.name });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message + 'hello' });
    }
}

export { registerUser, loginUser, userCredits };