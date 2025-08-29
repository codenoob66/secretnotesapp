// export default Canvas;
import { useState, useRef } from "react";
import YouTube from "react-youtube";

const Canvas = () => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [text, setText] = useState("");
  const [maskedTitle, setMaskedTitle] = useState("");
  // const [searchItems, setSearchItems] = useState([]);

  const API_KEY = "AIzaSyAn6Q2dzVO6B-cN5N4TlUga5YEQIr394yY";
  const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

  const keys = [API_KEY];

  // useRef to keep track of the current key index across renders
  const keyIndexRef = useRef(0);

  const getNextKey = () => {
    const key = keys[keyIndexRef.current];
    keyIndexRef.current = (keyIndexRef.current + 1) % keys.length; // cycle to next key
    return key;
  };

  const onReady = (event) => setPlayer(event.target);
  const handleTextChange = (e) => setText(e.target.value);

  // Fetch single video
  const handleSearch = async (query) => {
    let attempts = 0;
    while (attempts < keys.length) {
      const key = getNextKey();
      console.log("using key", key);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            query
          )}&type=video&maxResults=1&key=${key}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setMaskedTitle(data.items[0].snippet.title);
          console.log(data.items);
          setVideoId(data.items[0].id.videoId);
          return;
        }
        if (data.error && data.error.code === 403) {
          // quota exceeded, try next key
          attempts++;
          continue;
        }
      } catch (err) {
        console.error("Error fetching video:", err);
        attempts++;
      }
    }
    console.log("No results found or all keys exhausted");
  };

  const maskTitleOfSong = (title) => {
    let result = title.replace(/\s+/g, "").slice(0, 10);
    let charToAdd = "$";
    let finalString = "";
    for (let i = 0; i < result.length; i++) {
      finalString += result[i] + charToAdd;
    }

    return finalString;
  };

  // Fetch multiple videos base on search

  // const handleListVideos = async (query) => {
  //   let attempts = 0;
  //   while (attempts < keys.length) {
  //     const key = getNextKey();
  //     console.log("using key", key);
  //     try {
  //       const response = await fetch(
  //         `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
  //           query
  //         )}&type=video&maxResults=5&key=${key}`
  //       );
  //       const data = await response.json();
  //       if (data.items && data.items.length > 0) {
  //         setSearchItems(data.items);
  //         return;
  //       }
  //       if (data.error && data.error.code === 403) {
  //         attempts++;
  //         continue;
  //       }
  //     } catch (err) {
  //       console.error("Error fetching videos:", err);
  //       attempts++;
  //     }
  //   }
  //   console.log("No results found or all keys exhausted");
  // };

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-900 min-h-screen p-6">
      <YouTube
        videoId={videoId}
        opts={{ height: "0", width: "0", playerVars: { autoplay: 1 } }}
        onReady={onReady}
      />

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

      <textarea
        className="w-full max-w-xs text-white border-2 border-gray-600 rounded-lg p-4 text-lg shadow focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none bg-gray-800"
        value={text}
        onChange={handleTextChange}
        placeholder="Write your notes here..."
        rows={6}
      />

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          className="px-6 py-2 rounded-lg bg-lime-500 text-white font-medium shadow hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
          onClick={() => {
            handleSearch(text);
            // handleListVideos(text);
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

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-6">
        {/* {searchItems.map((item) => (
          // <div key={item.id.videoId}>
          //   <h3 className="text-white font-xs">{item.snippet.title}</h3>
          // </div>
        ))} */}
        <h3 className="text-white">{maskTitleOfSong(maskedTitle)}</h3>
      </div>
    </div>
  );
};

export default Canvas;
