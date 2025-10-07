export const randomLikes = (avg, rng) => {
  const floor = Math.floor(avg);
  return rng() < avg - floor ? floor + 1 : floor;
};
