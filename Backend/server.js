import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { searchYoutube } from "./controller/searchController.js";
import { getSongs } from "./controller/songController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/songs", getSongs);

app.get("/", (req, res) => {
  res.send("you're reached the backend");
});
app.get("/search", searchYoutube);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
