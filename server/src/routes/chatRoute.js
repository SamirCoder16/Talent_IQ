import express from "express";
import { getStreamtoken } from "../controllers/chatController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const chatRoute = express.Router();

chatRoute.get("/token", protectRoute, getStreamtoken);


export default chatRoute;