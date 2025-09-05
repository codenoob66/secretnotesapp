import { useState } from "react";
import { handleSearch } from "./utils/searchUtils.js";
import YouTube from "react-youtube";
import RealNotePad from "./component/realnotepad.jsx";
import ReusableDrawer from "./component/drawer.jsx";

const Canvas = () => {
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [text, setText] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const primaryItems = [
    "Pando",
    "Cops Monitoring",
    "SecureNet",
    "Alula Dealer Portal",
  ];

  const onReady = (event) => setPlayer(event.target);
  const handleTextChange = (e) => setText(e.target.value);

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-900 min-h-screen p-6">
      <YouTube
        videoId={videoId}
        opts={{ height: "0", width: "0", playerVars: { autoplay: 1 } }}
        onReady={onReady}
      />

      <div className="flex flex-wrap gap-3 justify-center">
        <RealNotePad />
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
          onClick={() => handleSearch(text, setVideoId)}
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
      <ReusableDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        primaryItems={primaryItems}
        width={300}
      />
      <button
        className="text-white px-6 py-2 rounded-lg bg-violet-500 font-medium shadow hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
        onClick={() => setDrawerOpen(true)}
      >
        itot
      </button>
    </div>
  );
};

export default Canvas;
