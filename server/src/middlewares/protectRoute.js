import { requireAuth } from "@clerk/express";
import User from "../models/user_model.js";
import logger from "../utils/logger.js";

export const protectRoute = [
    requireAuth(), // Ensures the user is authenticated
    async (req,res,next) => {
        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({ message: "Unauthorized: No Clerk ID found." });

            const user = await User.findOne({ clerkId });
            if(!user) {
                res.status(404).json({ message: "User not found." });
                return;
            }

            req.user = user; // Attach user to request object
            next();
        } catch (error) {
            logger.error("Error in protectRoute middleware:", error);
            res.status(500).json({ message: "Internal Server Error." });
        }
    }
]