import YouTube from "react-youtube";

const youtubePlayer = ({ videoId, onReady }) => {
  return (
    <YouTube
      videoId={videoId}
      opts={{ height: "250", width: "250", playerVars: { autoplay: 1 } }}
      onReady={onReady}
    />
  );
};

export default youtubePlayer;
