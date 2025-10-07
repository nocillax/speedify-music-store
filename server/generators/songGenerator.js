import { getFaker, setFakerLocale } from "../utils/fakerConfig.js";
import { createSongRNG } from "../utils/rng.js";
import { randomLikes } from "./likesGenerator.js";
import {
  generateSongTitle,
  generateArtistName,
  generateAlbumName,
  generateGenre,
} from "./nameGenerator.js";

export const generateSong = (userSeed, page, index, avgLikes, language) => {
  setFakerLocale(language);

  const languageOffset = language === "de" ? 1000000 : 0;
  const rng = createSongRNG(userSeed + languageOffset, page, index);
  const fakerSeed = parseInt(
    userSeed.toString() +
      page.toString() +
      index.toString() +
      languageOffset.toString(),
    10
  );
  const faker = getFaker(fakerSeed);

  return {
    id: `${userSeed}-${page}-${index}`,
    number: (page - 1) * 10 + index,
    title: generateSongTitle(faker, rng),
    artist: generateArtistName(faker, rng),
    album: generateAlbumName(faker, rng),
    genre: generateGenre(faker),
    likes: randomLikes(avgLikes, rng),
    seed: `${userSeed}-${page}-${index}`,
  };
};

export const generateSongsForPage = (
  userSeed,
  page,
  songsPerPage,
  avgLikes,
  language
) => {
  const songs = [];
  for (let i = 1; i <= songsPerPage; i++) {
    songs.push(generateSong(userSeed, page, i, avgLikes, language));
  }
  return songs;
};
