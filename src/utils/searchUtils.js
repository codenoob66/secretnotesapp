export async function handleSearch(
  query,
  keys,
  getNextKey,
  BASE_URL,
  setMaskedTitle,
  setVideoId
) {
  let attempts = 0;
  while (attempts < keys.length) {
    const key = getNextKey();
    console.log("using key", key);
    try {
      const response = await fetch(
        `${BASE_URL}?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=1&key=${key}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setMaskedTitle(data.items[0].snippet.title);
        setVideoId(data.items[0].id.videoId);
        return;
      }
      if (data.error && data.error.code === 403) {
        attempts++;
        continue;
      }
    } catch (err) {
      console.error("Error fetching video:", err);
      attempts++;
    }
  }
  console.log("No results found or all keys exhausted");
}
