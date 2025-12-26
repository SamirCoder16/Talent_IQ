import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "../lib/env.js";
import logger from "../utils/logger.js";

const apikey = ENV.STREAM_API_KEY;
const apisecret = ENV.STREAM_API_SECRET;

if(!apikey || !apisecret) {
    throw new Error("Stream API key and secret must be set in enviroment variables.");
}

export const streamClient = new StreamClient(apikey, apisecret); // this will be used for video calls
export const chatClient = StreamChat.getInstance(apikey, apisecret); // this will be used for chat functionality

export const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        logger.info("Error upserting Stream user:", error);
        throw error;
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId, { markMessagesDeleted: true });
        try {
            logger.info(`Stream user with ID ${userId} deleted successfully.`);
        } catch (error) {
            console.log(`Stream user with ID ${userId} deleted successfully.`);
        }
    } catch (error) {
        logger.error("Error deleting Stream user:", error);
        throw error;
    }
}