import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const apiKey = process.env.API_KEY;
const query = "hello";

app.get("/search", (req, res) => {
  res
    .status(200)
    .send(
      `${BASE_URL}?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=1&key=${apiKey}`
    );
});

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
