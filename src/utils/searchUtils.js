const API_URL = import.meta.env.VITE_API_URL;

export const handleSearch = async (text, setVideoId, setLyrics) => {
  try {
    const response = await fetch(
      `${API_URL}/songwithlyrics?q=${encodeURIComponent(text)}`
    );
    if (!response.ok) throw new Error("Failed to fetch from backend");
    const data = await response.json(); // data is already an array
    console.log(data);
    if (data && data.searchResult.length > 0) {
      setVideoId(data.searchResult[0]); // pick the first video ID
      setLyrics(data.lyricsResult);
    } else {
      console.warn("No video IDs returned");
    }
  } catch (error) {
    console.error("Error fetching video ID:", error);
  }
};
