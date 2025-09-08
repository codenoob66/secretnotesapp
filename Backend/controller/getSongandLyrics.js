// controller/getSongandLyrics.js
import { searchYoutube } from "./searchController.js";
import { searchLyrics } from "./searchLyrics.js";

export const both = async (req, res) => {
  const query = req.query.q;
  if (!query)
    return res.status(400).json({ error: "Missing query parameter ?q=" });

  try {
    // Call the refactored functions directly
    const searchResult = await searchYoutube({ q: query });
    const lyricsResult = await searchLyrics({ q: query });
    console.log(searchResult);
    console.log(lyricsResult);
    res.send({ searchResult, lyricsResult });
  } catch (error) {
    console.error("Error in both endpoint:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};
