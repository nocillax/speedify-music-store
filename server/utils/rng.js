import seedrandom from "seedrandom";

export const createRNG = (seed) => seedrandom(seed);
export const createSongRNG = (userSeed, page, index) =>
  createRNG(`${userSeed}-${page}-${index}`);
