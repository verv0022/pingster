// Import required dependencies
import express from "express";
import cors from "cors";
import { startPingJob } from "./jobs/pingJob";

// Create Express application instance
const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable or default to 3001

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from frontend
app.use(cors());

// Define a simple health check endpoint
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  startPingJob(); // Start the URL monitoring job when server starts
});
