// controller/searchLyrics.js
import dotenv from "dotenv";
import * as cheerio from "cheerio";
dotenv.config();

// Pure function: returns lyrics
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
    if (!searchResponse.ok) {
      console.error(
        "Genius API search failed:",
        searchResponse.status,
        await searchResponse.text()
      );
      throw new Error("Genius API search failed");
    }
    const searchData = await searchResponse.json();

    if (!searchData.response.hits.length) {
      return ""; // No songs found, return empty string like your original code
    }

    const songUrl = searchData.response.hits[0].result.url;

    // 2. Scrape Genius lyrics
    const pageResponse = await fetch(songUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36",
      },
    });
    if (!pageResponse.ok) {
      console.error(
        "Genius lyrics page fetch failed:",
        pageResponse.status,
        await pageResponse.text()
      );
      throw new Error("Genius lyrics page fetch failed");
    }
    const html = await pageResponse.text();
    const $ = cheerio.load(html);

    let lyrics = "";
    $('[data-lyrics-container="true"]').each((i, el) => {
      lyrics += $(el).text() + "\n";
    });
    let str = lyrics.substring(lyrics.indexOf("[Verse 1]"));
    let mark = "[Music Video]";
    let cleaned = lyrics.includes(mark)
      ? str.substring(0, str.indexOf(mark)).trim()
      : str;
    cleaned = cleaned.replace(/\[.*?\]/g, "");
    // Return whatever we have (even empty string), exactly like original behavior
    return cleaned;
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return ""; // fallback to empty string on error, like original
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
