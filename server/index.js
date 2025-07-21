console.log("Starting server...");

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";

// --- SETUP ---
// Get __dirname equivalent in ES Modules for correct path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// --- MIDDLEWARE ---
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());


// Add JSON parsing middleware
app.use(express.json());

// --- SWIGGY API PROXY CONFIG ---
const SWIGGY_API_BASE = "https://www.swiggy.com/dapi";
const LAT = "28.63270"; // Example Latitude (Connaught Place, New Delhi)
const LNG = "77.21980"; // Example Longitude (Connaught Place, New Delhi)

// =================================================================
// --- API ROUTES (These must come BEFORE the static file server) ---
// =================================================================

// --- API Route: Get All Restaurants ---
app.get("/restaurants", async (req, res) => {
  try {
    const url = `${SWIGGY_API_BASE}/restaurants/list/v5?lat=${LAT}&lng=${LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    const response = await fetch(url, {
      headers: {
        // Swiggy's API often requires a browser-like User-Agent header
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Swiggy API returned ${response.status} for /restaurants`);
      return res.status(response.status).json({
        error:
          "Failed to fetch restaurants from Swiggy API. It might be blocking the request.",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error in /restaurants:", err.message);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// --- API Route: Get Restaurant Menu ---
app.get("/restaurant/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;

  // Validate restaurantId
  if (!restaurantId || restaurantId.trim() === "") {
    return res.status(400).json({ error: "Restaurant ID is required" });
  }

  try {
    const url = `${SWIGGY_API_BASE}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${restaurantId}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Swiggy API returned ${response.status} for /restaurant/${restaurantId}`
      );
      return res.status(response.status).json({
        error: `Failed to fetch menu from Swiggy API for restaurant ${restaurantId}. It might be blocking the request.`,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(`Error in /restaurant/${restaurantId}:`, err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// Test route to verify server is working
app.get("/test", (req, res) => {
  res.json({
    message: "Server is working!",
    timestamp: new Date().toISOString(),
  });
});

// =================================================================
// --- SERVE REACT FRONTEND (These must come AFTER the API routes) ---
// =================================================================

// Define the path to the React build directory
const buildPath = path.join(__dirname, "..", "client", "dist");
console.log("Current directory:", __dirname);
console.log("Resolved build path:", buildPath);

// Verify the path exists
if (!fs.existsSync(buildPath)) {
  console.error(
    "ERROR: React 'dist' folder not found. Did you run `npm run build` in /client?"
  );
  console.log("Available directories:");
  const clientPath = path.join(__dirname, "..", "client");
  if (fs.existsSync(clientPath)) {
    fs.readdirSync(clientPath).forEach((dir) => {
      console.log(`- ${dir}`);
    });
  }
  process.exit(1);
}

// Serve static assets (JS, CSS, images, etc.) from the React build folder
app.use(express.static(buildPath));

// SOLUTION 1: Use a more specific pattern instead of "*"
// The catch-all handler for client-side routing
app.get("*", (req, res) => {
  const indexPath = path.join(buildPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send("Server error");
    }
  });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`Frontend should be accessible at http://localhost:${PORT}`);
});
