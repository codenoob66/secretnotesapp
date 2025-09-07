export const both = async (req, res) => {
  const query = req.query.q;
  if (!query)
    return res.status(400).json({ error: "Missing query parameter ?q=" });

  try {
    const searchRes = await fetch(
      `http://localhost:5000/search?q=${encodeURIComponent(query)}`
    );
    const lyricsRes = await fetch(
      `http://localhost:5000/song/lyrics?q=${encodeURIComponent(query)}`
    );

    const searchResult = await searchRes.json();
    const lyricsResult = await lyricsRes.json();

    res.json({ searchResult, lyricsResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
