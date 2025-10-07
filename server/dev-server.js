import express from "express";
import cors from "cors";
import { generateSongsForPage } from "./generators/songGenerator.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/songs", (req, res) => {
  try {
    const { seed, page, songsPerPage, avgLikes, language } = req.query;

    const parsedSeed = parseInt(seed) || 58933423;
    const parsedPage = parseInt(page) || 1;
    const parsedSongsPerPage = parseInt(songsPerPage) || 10;
    const parsedAvgLikes = parseFloat(avgLikes) || 2.12;
    const parsedLanguage = language || "en";

    const songs = generateSongsForPage(
      parsedSeed,
      parsedPage,
      parsedSongsPerPage,
      parsedAvgLikes,
      parsedLanguage
    );

    res.json({ songs });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate songs" });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 API Server running on http://localhost:${PORT}`);
});
