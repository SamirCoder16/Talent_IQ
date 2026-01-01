import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import connectDB from "./config/db_config.js";
import logger from "./utils/logger.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import chatRoute from "./routes/chatRoute.js";
import sessionRoute from "./routes/sessionRoute.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://talent-iq-teal.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(clerkMiddleware()); // this adds auth field to request object : req.auth();
app.use(morgan("dev"));

await connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.get("/health", (req, res) => {
  console.log(req.auth());
  res.send("Server is healthy!");
});

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat", chatRoute);
app.use("/api/sessions", sessionRoute);

// Local development only
if (ENV.NODE_ENV === "developement") {
  const PORT = ENV.PORT;
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

export default app;
