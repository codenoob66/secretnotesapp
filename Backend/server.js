import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { searchYoutubeHandler } from "./controller/searchController.js";
import { searchLyricsHandler } from "./controller/searchLyrics.js";
import { both } from "./controller/getSongandLyrics.js";
import { health } from "./controller/HealthController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Express route handlers now use the handler wrappers
app.get("/song/lyrics", searchLyricsHandler);

app.get("/", (req, res) => {
  res.send("You're reached the backend");
});

app.get("/search", searchYoutubeHandler);

app.get("/songwithlyrics", both); // 'both' already calls the pure functions

app.get("/health", health)

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
