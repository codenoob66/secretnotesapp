import { useState } from "react";
import YouTube from "react-youtube";

const Canvas = () => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [text, setText] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  const API_KEY = "AIzaSyDUNbDCna7vsa-xIqQTlWi8RecMwsmW1O8";
  const API_KEY2 = "AIzaSyD667DTs39IEYgy9HVVhkifif9EzPH7FQ8";
  const API_KEY3 = "AIzaSyDGPL3To9IFuZJaRAczatVglGX6QbPemy0";
  const API_KEY4 = "AIzaSyASJoWw9F4Ye3p1uNJPIduu4NwuRi3M8WE";
  const API_KEY5 = "AIzaSyCJATAHesBkBBD42jTw7TrZdUebELnaLz4";
  const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
  const keys = [API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5];

  const onReady = (event) => setPlayer(event.target);

  const handleTextChange = (e) => setText(e.target.value);

  const handleSearch = async (query) => {
    for (let key of keys) {
      console.log("Using API key:", key);
      try {
        const response = await fetch(
          `${BASE_URL}?part=snippet&q=${encodeURIComponent(
            query
          )}&type=video&maxResults=1&key=${key}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideoId(data.items[0].id.videoId);
          return;
        } else if (data.error) {
          console.warn(`API key failed: ${data.error.message}`);
        }
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    }
    console.log("No results found with available API keys");
  };

  const handleListVideos = async (query) => {
    for (let key of keys) {
      try {
        const response = await fetch(
          `${BASE_URL}?part=snippet&q=${encodeURIComponent(
            query
          )}&type=video&maxResults=10&key=${key}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          console.log(data.items);
          setSearchItems(data.items);
          return;
        } else if (data.error) {
          console.warn(`API key failed: ${data.error.message}`);
        }
      } catch (error) {
        console.error("Error getting results:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-900 min-h-screen p-6">
      {/* Hidden YouTube Player */}
      <YouTube
        videoId={videoId}
        opts={{ height: "0", width: "0", playerVars: { autoplay: 1 } }}
        onReady={onReady}
      />

      {/* Header Links */}
      <div className="flex flex-wrap gap-3 justify-center">
        {["Pando", "Cops Monitoring", "SecureNet", "Alula Dealer Portal"].map(
          (item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
            >
              {item}
            </span>
          )
        )}
      </div>

      {/* Notes & Search Results */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {/* Video Titles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {searchItems.map((item) => (
            <div
              key={item.id.videoId}
              className="bg-gray-800 p-3 rounded-lg shadow hover:bg-gray-700 transition"
            >
              <h3 className="text-white font-medium">{item.snippet.title}</h3>
            </div>
          ))}
        </div>

        {/* Notes textarea */}
        <textarea
          className="w-full text-white border-2 border-gray-600 rounded-lg p-4 text-lg shadow focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none bg-gray-800"
          value={text}
          onChange={handleTextChange}
          placeholder="Write your notes here..."
          rows={6}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <button
          className="px-6 py-2 rounded-lg bg-lime-500 text-white font-medium shadow hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
          onClick={() => {
            handleSearch(text);
            handleListVideos(text);
          }}
        >
          Search Notes
        </button>

        <button
          className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          onClick={() => player && player.pauseVideo()}
        >
          Submit Notes
        </button>

        <button
          className="px-6 py-2 rounded-lg bg-orange-500 text-white font-medium shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          onClick={() => player && player.playVideo()}
        >
          Get Notes
        </button>
      </div>
    </div>
  );
};

export default Canvas;
