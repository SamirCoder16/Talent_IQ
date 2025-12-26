import { chatClient, streamClient } from "../config/stream_config.js";
import Session from "../models/session.model.js";
import logger from "../utils/logger.js";

export const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = req?.user?._id;
    const clerkId = req?.user?.userId;

    if (!problem || !difficulty) {
      res.status(400).json({
        message: "Problem and dificulty are required to create a session.",
      });
      return;
    }
    // generate unique call ID for stream video call
    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    // Create session in DB
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });
    //  Create Stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      created_by_id: clerkId,
      custom: { problem, difficulty, sessionId: session._id.toString() },
    });
    // Create ChatMessage for session creation
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Seession`,
      created_by_id: clerkId,
      members: [clerkId], // Member at a time of creation
    });
    await channel.create();
    res.status(201).json({ message: "Session created successfully.", session });
  } catch (error) {
    logger.error("Error creating session:", error);
    res
      .status(500)
      .json({ message: "Internal server error while creating session." });
  }
};
export const getActiveSessions = async (_, res) => {
  try {
    const sessions = await Session.find({ status: active })
      .populate("host", "name profileImage eemail clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    logger.error("Error fetching active sessions:", error);
    res.status(500).json({
      message: "Internal Server Error while feetching active sessions.",
    });
  }
};
export const getMyRecentSessions = async (req, res) => {
  try {
    // wher user is host or participant
    const userId = req?.user?._id;

    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participants: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    logger.error("Error fetching recent sessions:", error);
    res.status(500).json({
      message: "Internal Server Error while fetching recent sessions.",
    });
  }
};
export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Session ID is required." });
    }
    const session = await Session.findById(id)
      .populate("host", "name profileImage email clerkId")
      .populate("participants", "name profileImage email clerkId");

    if (!session) {
      res.status(404).json({ meessage: "Session not found." });
      return;
    }
    res.status(200).json({ session });
  } catch (error) {
    logger.error("Error fetching session by ID:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error while fetching session." });
  }
};
export const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req?.user?._id;
    const clerkId = req?.user?.clerkId;

    const session = await Session.findById(id);
    if (!session) {
      res.status(404).json({ message: "Session not found." });
      return;
    }
    // check if session is active
    if (session.status !== "active") {
      return res
        .status(400)
        .json({ message: "Cannot join a completed session." });
    }
    // if you are the Host
    if (session.host.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "Host cannot join as participant." });
    }
    // check if session already has participant
    if (session.participants)
      return res
        .status(409)
        .json({ message: "Session already has a participant." });

    session.participants = userId;
    await session.save();

    // Add participant to Stream
    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json({ message: "Joined session successfully.", session });
  } catch (error) {
    logger.error("Error joining session:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error while joining session." });
  }
};
export const endSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req?.user?._id;

    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }
    // check if user is host
    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the host can end the session." });
    }
    // check if session is already completed
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed." });
    }
    // End Stream video call - Note: Stream video calls auto expire after some time, this is just a placeholder
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // Delete Stream Chat Channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ message: "Session ended successfully.", session });
  } catch (error) {
    logger.error("Error ending session:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error while ending session." });
  }
};
