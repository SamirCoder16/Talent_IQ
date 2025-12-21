import { chatClient } from "../config/stream_config.js";
import logger from "../utils/logger.js";

export const getStreamtoken = async (req, res) => {
  try {
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      name: req.user.name,
      userId: req.user.clerkId,
      profileImage: req.user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating Stream token.", error } );
    logger.error("Error generating Stream token:", error);
  }
};
