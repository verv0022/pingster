import fs from "fs";
import path from "path";

interface PingResult {
  url: string;
  status: string;
  responseTime: number;
}

/**
 * Simple logging utility for ping results
 * Logs results in batches for better performance
 */
export class Logger {
  private logFile: string;

  constructor() {
    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), "logs");
    console.log("📁 Logs directory:", logsDir);

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
      console.log("✅ Created logs directory");
    }

    // Create log file with current date
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    this.logFile = path.join(logsDir, `ping-${today}.log`);
    console.log("📄 Log file:", this.logFile);
  }

  /**
   * Log a batch of ping results from one job run
   */
  logPingBatch(results: PingResult[]) {
    const timestamp = new Date().toISOString();

    // Create summary line
    const upCount = results.filter((r) => r.status === "UP").length;
    const downCount = results.filter((r) => r.status === "DOWN").length;
    const avgResponseTime = Math.round(
      results.reduce((sum, r) => sum + r.responseTime, 0) / results.length
    );

    // Log each result
    for (const result of results) {
      const resultEntry = `[${timestamp}] ${result.url} - ${result.status} - ${result.responseTime}ms\n`;
      fs.appendFileSync(this.logFile, resultEntry);
    }

    // Log summary
    const summaryEntry = `[${timestamp}] 📊 Summary: ${upCount} UP, ${downCount} DOWN, Avg: ${avgResponseTime}ms\n\n`;
    fs.appendFileSync(this.logFile, summaryEntry);
  }
}
