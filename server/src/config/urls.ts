// Array of URLs to monitor for availability and response time
// Add or remove URLs from this list to change what gets monitored
// The ping job will check each of these URLs every 5 minutes
export const monitoredUrls = [
  "https://brandonvervoort.com", // Example website (replace with real URLs)
  "https://google.com", // Google homepage
  "https://github.com", // GitHub homepage
  "https://thiswebsitedoesnotexist12345.com", // This will always be DOWN
];
