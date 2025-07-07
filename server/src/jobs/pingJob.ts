import cron from "node-cron";
import { monitoredUrls } from "../config/urls";
import { pingUrl } from "../utils/ping";
import { Logger } from "../utils/logger";

// Store the cron job reference so we can stop it if needed
let pingJob: any = null;
const logger = new Logger();

/**
 * Function to run the actual ping job
 */
async function runPingJob() {
  console.log("🔄 Running Ping Job...");

  const results = [];

  for (const url of monitoredUrls) {
    const result = await pingUrl(url);

    // Log to console for immediate feedback
    console.log(
      `✅ ${result.url} - ${result.status} - ${result.responseTime}ms`
    );

    // Collect results for batch logging
    results.push(result);
  }

  // Log all results to file in one batch
  logger.logPingBatch(results);
}

/**
 * Starts a scheduled job that pings all monitored URLs every 5 minutes
 */
export function startPingJob() {
  // Stop any existing job to prevent duplicates
  if (pingJob) {
    pingJob.stop();
  }

  // Run immediately when server starts
  runPingJob();

  // Then run every 5 minutes
  pingJob = cron.schedule("*/5 * * * *", runPingJob);
}
