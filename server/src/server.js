import "dotenv/config";
import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import connectDB from "./config/db_config.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ withcredentials: true }));

app.get("/", (req, res) => {
  res.send(`Hello from the Server!`);
});
app.get("/health", (req, res) => {
  res.send(`Server is healthy!`);
});

const startServer = async () => {
  try {
    app.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server is running on port ${PORT}`);
    });
    await connectDB();
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

export default app;
