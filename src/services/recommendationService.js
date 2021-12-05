import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function newRecommendation({ name, youtubeLink }) {
  const findOnRepository =
    await recommendationRepository.findRecommendationByLink({ youtubeLink });

  if (findOnRepository > 0) return null;

  const recommendation = await recommendationRepository.createRecommendation({
    name,
    youtubeLink,
  });

  if (!recommendation) return [];

  return recommendation;
}

async function removeRecommendation({ recommendationId }) {
  return recommendationRepository.removeRecommendation({ recommendationId });
}

async function isDeleted({ recommendationId }) {
  const checkDeleted = await recommendationRepository.findDeletedRecommendation(
    { recommendationId },
  );

  return checkDeleted;
}

async function getRecommendation() {
  const biasedList = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B'];

  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomLetter =
    biasedList[generateRandomNumber(0, biasedList.length - 1)];

  const recommendationHigherThenTenScore =
    await recommendationRepository.getRecommendationHigherThenTenScore();
  const recommendationLowerThenOrEqualToTenScore =
    await recommendationRepository.getRecommendationLowerThenOrEqualToTenScore();
  const randomRecommendation =
    await recommendationRepository.getRandomRecommendation();
  const findAnyRecommendation =
    await recommendationRepository.findAnyRecommendation();

  if (!findAnyRecommendation) {
    return [];
  }

  if (
    (recommendationHigherThenTenScore &&
      !recommendationLowerThenOrEqualToTenScore) ||
    (!recommendationHigherThenTenScore &&
      recommendationLowerThenOrEqualToTenScore) ||
    (!recommendationHigherThenTenScore &&
      !recommendationLowerThenOrEqualToTenScore)
  ) {
    return randomRecommendation;
  }

  if (randomLetter === 'A') {
    return recommendationHigherThenTenScore;
  }
  return recommendationLowerThenOrEqualToTenScore;
}

export {
  newRecommendation,
  removeRecommendation,
  isDeleted,
  getRecommendation,
};
