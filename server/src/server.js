import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import connectDB from "./config/db_config.js";
import logger from "./utils/logger.js";
// // import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

// app.use(clerkMiddleware());
await connectDB();

app.get("/", (req,res) => {
  res.send("Welcome to the server!");
});

app.get("/health", (req, res) => {
  res.send("Server is healthy!");
});

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

// // Local development only
// if (ENV.NODE_ENV === "development") {
//   const PORT = ENV.PORT;
//   app.listen(PORT, () => {
//     logger.info(`Server running on port ${PORT}`);
//   });
// }

export default app;
