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

export { newRecommendation, removeRecommendation, isDeleted };
