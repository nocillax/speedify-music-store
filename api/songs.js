import { generateSongsForPage } from "../server/generators/songGenerator.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
}
