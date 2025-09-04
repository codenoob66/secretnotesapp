export const handleSearch = async (text, setVideoId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/search?q=${encodeURIComponent(text)}`
    );
    if (!response.ok) throw new Error("Failed to fetch from backend");

    const data = await response.json();

    // Pick the first video ID
    if (data.results && data.results.length > 0) {
      setVideoId(data.results[0]); // 👈 or choose randomly
    } else {
      console.warn("No video IDs returned");
    }
  } catch (error) {
    console.error("Error fetching video ID:", error);
  }
};
