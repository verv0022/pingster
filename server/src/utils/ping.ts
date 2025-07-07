import axios from "axios";

/**
 * Pings a URL and measurets responsetime
 * @param url - The URL to ping (e.g., "https://google.com")
 * @returns Promise with ping results including status ("UP" or "DOWN") and response time
 */
export async function pingUrl(
  url: string
): Promise<{ url: string; status: string; responseTime: number }> {
  // Record the start time to measure response time
  const start = Date.now();
  try {
    const res = await axios.get(url);

    const responseTime = Date.now() - start;

    // Return successful ping results
    return { url, status: "UP", responseTime: responseTime };
  } catch (err: any) {
    // If request fails, still calculate response time
    const responseTime = Date.now() - start;

    // Return error results with "DOWN" status
    return {
      url,
      status: "DOWN",
      responseTime,
    };
  }
}
