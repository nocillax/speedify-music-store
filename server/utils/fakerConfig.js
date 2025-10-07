import { fakerDE, fakerEN_US } from "@faker-js/faker";

let currentFaker = fakerEN_US;

export const setFakerLocale = (language) => {
  currentFaker = language === "de" ? fakerDE : fakerEN_US;
};

export const getFaker = (seed) => {
  currentFaker.seed(seed);
  return currentFaker;
};
