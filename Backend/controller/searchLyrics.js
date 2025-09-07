// controller/searchLyrics.js
import dotenv from "dotenv";
import * as cheerio from "cheerio";
dotenv.config();

// Pure function: returns lyrics safely
export const searchLyrics = async ({ q }) => {
  if (!q) throw new Error("Missing query parameter 'q'");

  try {
    // 1. Search Genius
    const searchResponse = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(q)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GENIUS_SECRET_TOKEN}`,
        },
      }
    );
    const searchData = await searchResponse.json();

    if (!searchData.response.hits.length) {
      throw new Error("No songs found");
    }

    const songUrl = searchData.response.hits[0].result.url;

    // 2. Scrape Genius lyrics
    const pageResponse = await fetch(songUrl);
    const html = await pageResponse.text();
    const $ = cheerio.load(html);

    let lyrics = "";
    $('[data-lyrics-container="true"]').each((i, el) => {
      lyrics += $(el).text() + "\n";
    });

    if (!lyrics) {
      throw new Error("Could not extract lyrics from page");
    }

    // 3. Clean up lyrics safely
    let str = lyrics.includes("[Verse 1]")
      ? lyrics.substring(lyrics.indexOf("[Verse 1]"))
      : lyrics; // fallback if [Verse 1] not found

    const mark = "[Music Video]";
    let cleaned = str.includes(mark)
      ? str.substring(0, str.indexOf(mark)).trim()
      : str;

    // Remove any remaining tags like [Chorus], [Verse 2], etc.
    cleaned = cleaned.replace(/\[.*?\]/g, "").trim();

    // Fallback: if still empty, return raw lyrics
    return cleaned || lyrics.trim();
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    throw new Error(error.message || "Failed to fetch lyrics");
  }
};

// Express wrapper for endpoint
export const searchLyricsHandler = async (req, res) => {
  try {
    const lyrics = await searchLyrics({ q: req.query.q });
    res.json(lyrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
