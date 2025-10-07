const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const generateSongTitle = (faker, rng) => {
  const patterns = [
    () =>
      `${capitalize(faker.word.adjective())} ${capitalize(faker.word.noun())}`,
    () => `${capitalize(faker.word.verb())} ${capitalize(faker.word.noun())}`,
    () =>
      `${capitalize(faker.word.noun())} ${capitalize(
        faker.word.preposition()
      )} ${capitalize(faker.word.noun())}`,
    () =>
      `The ${capitalize(faker.word.adjective())} ${capitalize(
        faker.word.noun()
      )}`,
    () => `${capitalize(faker.color.human())} ${capitalize(faker.word.noun())}`,
    () =>
      `${faker.number.int({ min: 1, max: 100 })} ${capitalize(
        faker.word.noun()
      )}`,
    () => faker.music.songName(),
  ];
  return patterns[Math.floor(rng() * patterns.length)]();
};

export const generateArtistName = (faker, rng) => {
  const rand = rng();
  if (rand < 0.4)
    return `${faker.person.firstName()} ${faker.person.lastName()}`;
  if (rand < 0.6) {
    const titles = ["Dr.", "Sgt.", "Mr.", "Ms.", "DJ", "MC"];
    return `${
      titles[Math.floor(rng() * titles.length)]
    } ${faker.person.lastName()}`;
  }
  if (rand < 0.8)
    return `${faker.person.firstName()} ${faker.word.conjunction()} ${faker.person.firstName()}`;

  const patterns = [
    () =>
      `The ${capitalize(faker.word.adjective())} ${capitalize(
        faker.word.noun()
      )}s`,
    () =>
      `${faker.person.firstName()} ${faker.person.lastName()} and The ${capitalize(
        faker.word.noun()
      )}s`,
    () =>
      `The ${capitalize(faker.word.noun())} ${capitalize(faker.word.noun())}s`,
    () => `${capitalize(faker.color.human())} ${capitalize(faker.word.noun())}`,
  ];
  return patterns[Math.floor(rng() * patterns.length)]();
};

export const generateAlbumName = (faker, rng) => {
  if (rng() < 0.3) return "Single";

  const patterns = [
    () =>
      `${capitalize(faker.word.adjective())} ${capitalize(faker.word.noun())}`,
    () => `${capitalize(faker.word.noun())}s`,
    () => `${faker.number.int({ min: 1, max: 100 })}`,
    () => faker.music.genre(),
    () =>
      `The ${capitalize(faker.word.adjective())} ${capitalize(
        faker.word.noun()
      )}`,
    () => `${capitalize(faker.color.human())} ${capitalize(faker.word.noun())}`,
  ];
  return patterns[Math.floor(rng() * patterns.length)]();
};

export const generateGenre = (faker) => faker.music.genre();
