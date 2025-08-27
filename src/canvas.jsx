import { useState } from "react";
import YouTube from "react-youtube";

const Canvas = () => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ"); // default video
  const [text, setText] = useState(""); // disguises as "notes"

  const API_KEY = "AIzaSyDUNbDCna7vsa-xIqQTlWi8RecMwsmW1O8";
  // AIzaSyDUNbDCna7vsa-xIqQTlWi8RecMwsmW1O8 AIzaSyD667DTs39IEYgy9HVVhkifif9EzPH7FQ8
  const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&maxResults=1&key=${API_KEY}`
      );

      const data = await response.json();
      console.log(data.items[0].snippet.title);
      if (data.items && data.items.length > 0) {
        const firstVideoId = data.items[0].id.videoId;
        setVideoId(firstVideoId);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Hidden YouTube Player */}
      <YouTube
        videoId={videoId}
        opts={{
          height: "0", // hidden
          width: "0", // hidden
          playerVars: { autoplay: 1 },
        }}
        onReady={onReady}
      />

      {/* Fake "Notes" area (actually video search) */}
      <textarea
        className="border-2 border-gray-800"
        value={text}
        onChange={handleTextChange}
        placeholder="Write your notes here..."
        rows={5}
        cols={40}
      />

      <div className="mt-2">
        <button
          className="px-4 py-2 rounded-full bg-lime-500 text-white font-medium shadow 
               hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 
               transition"
          onClick={() => handleSearch(text)}
        >
          Search Notes
        </button>

        <button
          className="px-4 py-2 rounded-full bg-red-500 text-white font-medium shadow 
               hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 
               transition"
          onClick={() => player && player.pauseVideo()}
        >
          Submit Notes
        </button>

        <button
          className="px-4 py-2 rounded-full bg-orange-500 text-white font-medium shadow 
               hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 
               transition"
          onClick={() => player && player.playVideo()}
        >
          Get Notes
        </button>
      </div>
    </div>
  );
};

export default Canvas;
