import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { searchYoutube } from "./controller/searchController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("you're reached the backend");
});
app.get("/search", searchYoutube);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
