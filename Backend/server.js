import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { searchYoutube } from "./controller/searchController.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/search", searchYoutube);

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
