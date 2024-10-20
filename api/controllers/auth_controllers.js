import bcrypt from "bcrypt";
import prisma from '../Prisma.js';  // Ensure correct path
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// REGISTER
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate request body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user in the database
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },
        });

        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create user!" });
    }
};

// LOGIN
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        // Find the user by username
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Wrong password" });
        }

        // Generate token
        const token = jwt.sign(
            { 
              id: user.id,
              isAdmin: true
             },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }  // Token valid for 7 days
        );

        // Set cookie with token
        res.cookie('token', token, {
            httpOnly: true, // Prevent access to the cookie via JavaScript
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie valid for 7 days
            sameSite: 'Lax',  // Adjust SameSite policy as necessary
        });

        res.status(200).json({ message: "Login successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to login!" });
    }
};

// LOGOUT
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
  };
  
