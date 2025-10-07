import { createRNG } from "../utils/rng";

const adjectives = [
  "amazing",
  "brilliant",
  "stunning",
  "incredible",
  "fantastic",
  "wonderful",
  "excellent",
  "outstanding",
  "remarkable",
  "exceptional",
  "phenomenal",
  "spectacular",
  "magnificent",
  "impressive",
  "powerful",
  "beautiful",
  "captivating",
  "mesmerizing",
  "enchanting",
  "delightful",
  "sublime",
  "superb",
];

export const generateReview = (seed, language) => {
  const rng = createRNG(seed.toString());
  const getAdj = () => adjectives[Math.floor(rng() * adjectives.length)];
  const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Review templates in English (15 templates for more variety)
  const reviewTemplatesEN = [
    `This track is absolutely ${getAdj()}! The ${getAdj()} melody combined with ${getAdj()} vocals creates an unforgettable experience. A must-listen for any music lover.`,
    `An ${getAdj()} masterpiece that showcases ${getAdj()} production quality. The artist's ${getAdj()} performance really shines through, making this one of the standout tracks of the year.`,
    `${cap(
      getAdj()
    )} and ${getAdj()}, this song captures the essence of modern music. The ${getAdj()} beat keeps you hooked from start to finish.`,
    `A ${getAdj()} blend of ${getAdj()} sounds that demonstrates real artistry. Every note feels intentional and ${getAdj()}, making this a truly ${getAdj()} listening experience.`,
    `This ${getAdj()} track delivers ${getAdj()} energy throughout. The ${getAdj()} arrangement and ${getAdj()} lyrics make it an instant classic.`,
    `The production on this is ${getAdj()}! Every element from the ${getAdj()} instrumentation to the ${getAdj()} mixing creates a ${getAdj()} sonic landscape.`,
    `What a ${getAdj()} performance! The artist brings ${getAdj()} emotion and ${getAdj()} technique to every moment of this ${getAdj()} composition.`,
    `This song is a ${getAdj()} journey through ${getAdj()} soundscapes. The ${getAdj()} progression keeps things fresh and ${getAdj()} from start to finish.`,
    `Simply ${getAdj()}! The way the ${getAdj()} verses build into the ${getAdj()} chorus is nothing short of ${getAdj()}. A true gem.`,
    `A ${getAdj()} addition to any playlist. The ${getAdj()} rhythm section combined with ${getAdj()} melodies creates something truly ${getAdj()}.`,
    `The songwriting here is ${getAdj()}. Each lyric feels ${getAdj()} and the ${getAdj()} delivery makes it even more ${getAdj()}.`,
    `This is what ${getAdj()} music sounds like. The ${getAdj()} production and ${getAdj()} performance combine to create a ${getAdj()} experience.`,
    `From the ${getAdj()} intro to the ${getAdj()} outro, this track maintains a ${getAdj()} energy that's both ${getAdj()} and captivating.`,
    `The artist's ${getAdj()} vision really comes through here. Every ${getAdj()} detail and ${getAdj()} choice feels perfectly ${getAdj()}.`,
    `A ${getAdj()} track that showcases ${getAdj()} musicality. The ${getAdj()} arrangement builds beautifully into a ${getAdj()} climax.`,
  ];

  // Review templates in German (15 templates)
  const reviewTemplatesDE = [
    `Dieser Track ist absolut ${getAdj()}! Die ${getAdj()} Melodie kombiniert mit ${getAdj()} Gesang schafft ein unvergessliches Erlebnis. Ein Muss für jeden Musikliebhaber.`,
    `Ein ${getAdj()} Meisterwerk, das ${getAdj()} Produktionsqualität zeigt. Die ${getAdj()} Performance des Künstlers glänzt wirklich und macht dies zu einem der herausragenden Tracks des Jahres.`,
    `${cap(
      getAdj()
    )} und ${getAdj()}, dieses Lied erfasst die Essenz moderner Musik. Der ${getAdj()} Beat hält dich von Anfang bis Ende gefesselt.`,
    `Eine ${getAdj()} Mischung aus ${getAdj()} Klängen, die echte Kunstfertigkeit demonstriert. Jede Note fühlt sich beabsichtigt und ${getAdj()} an.`,
    `Dieser ${getAdj()} Track liefert ${getAdj()} Energie durchgehend. Das ${getAdj()} Arrangement macht es zu einem sofortigen Klassiker.`,
    `Die Produktion ist ${getAdj()}! Jedes Element von der ${getAdj()} Instrumentierung bis zum ${getAdj()} Mixing kreiert eine ${getAdj()} Klanglandschaft.`,
    `Was für eine ${getAdj()} Darbietung! Der Künstler bringt ${getAdj()} Emotion und ${getAdj()} Technik in jeden Moment dieser ${getAdj()} Komposition.`,
    `Dieses Lied ist eine ${getAdj()} Reise durch ${getAdj()} Klangwelten. Die ${getAdj()} Entwicklung hält alles frisch und ${getAdj()} von Anfang bis Ende.`,
    `Einfach ${getAdj()}! Die Art, wie die ${getAdj()} Strophen in den ${getAdj()} Refrain übergehen, ist nicht weniger als ${getAdj()}. Ein wahres Juwel.`,
    `Eine ${getAdj()} Ergänzung für jede Playlist. Die ${getAdj()} Rhythmusgruppe kombiniert mit ${getAdj()} Melodien schafft etwas wirklich ${getAdj()}.`,
    `Das Songwriting hier ist ${getAdj()}. Jeder Text fühlt sich ${getAdj()} an und die ${getAdj()} Darbietung macht es noch ${getAdj()}.`,
    `So klingt ${getAdj()} Musik. Die ${getAdj()} Produktion und ${getAdj()} Performance vereinen sich zu einem ${getAdj()} Erlebnis.`,
    `Vom ${getAdj()} Intro bis zum ${getAdj()} Outro behält dieser Track eine ${getAdj()} Energie, die sowohl ${getAdj()} als auch fesselnd ist.`,
    `Die ${getAdj()} Vision des Künstlers kommt hier wirklich durch. Jedes ${getAdj()} Detail und jede ${getAdj()} Wahl fühlt sich perfekt ${getAdj()} an.`,
    `Ein ${getAdj()} Track, der ${getAdj()} Musikalität zeigt. Das ${getAdj()} Arrangement baut sich wunderschön zu einem ${getAdj()} Höhepunkt auf.`,
  ];

  const templates = language === "de" ? reviewTemplatesDE : reviewTemplatesEN;
  const index = Math.floor(rng() * templates.length);

  return templates[index];
};
