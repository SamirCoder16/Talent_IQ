import "dotenv/config";
import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import connectDB from "./config/db_config.js";
import logger from "./utils/logger.js";
// import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "*", credentials: true }));

// // ✅ DB connect per request (serverless-safe)
// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (err) {
//     next(err);
//   }
// });
// // app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.send("Server is healthy!");
});

// // ✅ Inngest
// app.use("/api/inngest", serve({ client: inngest, functions }));

// // ✅ Local development only
// if (ENV.NODE_ENV === "development") {
//   const PORT = ENV.PORT;
//   app.listen(PORT, () => {
//     logger.info(`Server running on port ${PORT}`);
//   });
// }

export default app;
