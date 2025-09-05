export const getSongs = (req, res) => {
  try {
    // Example list of songs
    const songs = [
      { videoId: "abc123", songTitle: "Hello by Adele" },
      { videoId: "def456", songTitle: "Sparks Fly by Taylor Swift" },
      { videoId: "ghi789", songTitle: "Cheap Thrills" },
    ];

    // Send the list with a 200 OK status
    res.status(200).send({ songs });
  } catch (error) {
    console.error("Failed to get songs:", error);
    res.status(500).send({ error: "Failed to get songs" });
  }
};
