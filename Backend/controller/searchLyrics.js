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

    let str = lyrics.substring(lyrics.indexOf("[Verse 1]"));
    let mark = "[Music Video]";
    let cleaned = lyrics.includes(mark)
      ? str.substring(0, str.indexOf(mark)).trim()
      : str;

    cleaned = cleaned.replace(/\[.*?\]/g, "").trim();

    return cleaned; // return instead of res.json
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    throw new Error("Failed to fetch lyrics");
  }
};

// Express wrapper for direct endpoint
export const searchLyricsHandler = async (req, res) => {
  try {
    const lyrics = await searchLyrics({ q: req.query.q });
    res.json(lyrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
