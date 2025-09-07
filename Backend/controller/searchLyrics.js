import dotenv from "dotenv";
import * as cheerio from "cheerio";
dotenv.config();

export const searchLyrics = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing ?q=" });

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
      return res.status(404).json({ error: "No songs found" });
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

    res.json(cleaned);
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    res.status(500).json({ error: "Failed to fetch lyrics" });
  }
};
