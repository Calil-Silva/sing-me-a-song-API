import * as recommendationRepository from '../repositories/recommendation.js';

async function newRecommendation({ name, link }) {
  const recommendation = await recommendationRepository.createRecommendation({
    name,
    link,
  });

  if (recommendation.rowCount === 0) {
    return [];
  }

  return recommendation;
}

export { newRecommendation };
