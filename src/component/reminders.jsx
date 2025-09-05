import Marquee from "react-fast-marquee";

const Reminders = () => {
  return (
    <Marquee
      gradient={false}
      speed={45}
      style={{
        backgroundColor: "#1a1a1a", // dark background
        color: "#fff", // text color
        fontSize: "18px", // text size
        fontWeight: "bold",
        whiteSpace: "nowrap",
        letterSpacing: "1px",
      }}
    >
      Unlimited Searches, Please allow a few seconds for it to load after
      searching your notes.
    </Marquee>
  );
};

export default Reminders;
