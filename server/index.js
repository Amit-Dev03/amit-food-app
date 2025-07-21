console.log("Starting server...");
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Ensure you're using node-fetch v3

const app = express();
const PORT = 4000;

app.use(cors());

const SWIGGY_API_BASE = "https://www.swiggy.com/dapi";
const LAT = "28.63270";
const LNG = "77.21980";

app.get("/restaurants", async (req, res) => {
  try {
    const url = `${SWIGGY_API_BASE}/restaurants/list/v5?lat=${LAT}&lng=${LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
        accept: "application/json",
      },
    });

    // 🛑 Check if Swiggy blocks the request
    if (!response.ok) {
      throw new Error(`Swiggy API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error in /restaurants:", err.message);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});
// Add this route to fetch menu for a restaurant by ID
app.get("/restaurant/:restaurantId", async (req, res) => {
  const restaurantId = req.params.restaurantId;
  try {
    const url = `${SWIGGY_API_BASE}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${restaurantId}`;
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Swiggy API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(`Error in /menu/${restaurantId}:`, err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
//backend-host code
import path from "path";
import { fileURLToPath } from "url";

// Required only for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
