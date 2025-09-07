// controller/searchController.js
import ytSearch from "yt-search";

export const searchYoutube = async (req, res) => {
  const query = req.query.q;
  if (!query)
    return res.status(400).json({ error: "Missing query parameter ?q=" });

  try {
    const results = await ytSearch(query);
    const videoIds = results.videos.slice(0, 5).map((v) => v.videoId);
    res.json(videoIds);
  } catch (err) {
    console.error("Error searching YouTube:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};
