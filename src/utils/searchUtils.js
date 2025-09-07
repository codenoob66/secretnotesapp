const API_URL = import.meta.env.VITE_API_URL;

export const handleSearch = async (text, setVideoId) => {
  try {
    const response = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(text)}`
    );
    if (!response.ok) throw new Error("Failed to fetch from backend");
    const data = await response.json(); // data is already an array

    if (data && data.length > 0) {
      setVideoId(data[0]); // pick the first video ID
    } else {
      console.warn("No video IDs returned");
    }
  } catch (error) {
    console.error("Error fetching video ID:", error);
  }
};
