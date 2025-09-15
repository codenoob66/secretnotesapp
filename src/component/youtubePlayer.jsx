import YouTube from "react-youtube";

const YoutubePlayer = ({ videoId, onReady, opts }) => {
  // provide default opts but allow overrides
  const defaultOpts = {
    width: "100%",
    height: "500",
    playerVars: { autoplay: 1 },
  };

  return (
    <YouTube
      videoId={videoId}
      opts={{ ...defaultOpts, ...opts }} // 👈 merge default with incoming
      onReady={onReady}
    />
  );
};

export default YoutubePlayer;
