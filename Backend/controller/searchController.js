// controller/searchController.js
import ytSearch from "yt-search";

// Refactored: function returns data instead of sending res.json
export const searchYoutube = async ({ q }) => {
  if (!q) throw new Error("Missing query parameter 'q'");

  try {
    const results = await ytSearch(q);
    const videoIds = results.videos.slice(0, 5).map((v) => v.videoId);
    return videoIds; // return the array instead of sending res.json
  } catch (err) {
    console.error("Error searching YouTube:", err);
    throw new Error("Failed to fetch videos");
  }
};

// Optional: keep an Express handler for direct endpoint usage
export const searchYoutubeHandler = async (req, res) => {
  try {
    const videoIds = await searchYoutube({ q: req.query.q });
    res.json(videoIds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
