import * as recommendationRepository from '../repositories/recommendationRepository.js';
import IsCreatedError from '../errors/IsCreatedError.js';
import BadRequestError from '../errors/BadRerequestError.js';
import EmptyDBError from '../errors/EmptyDBError.js';

async function newRecommendation({ name, youtubeLink }) {
  const findOnRepository =
    await recommendationRepository.findRecommendationByLink({ youtubeLink });

  if (findOnRepository > 0) {
    throw new IsCreatedError('Esta recomendação já foi feita.');
  }

  const recommendation = await recommendationRepository.createRecommendation({
    name,
    youtubeLink,
  });

  if (!recommendation) {
    throw new BadRequestError(
      'Ocorreu um erro, verifique se os campos nome e link estão preenchidos corretamente.',
    );
  }

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

  const generateRandom = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomLetter = biasedList[generateRandom(0, biasedList.length - 1)];

  const recommendationHigherThenTenScore =
    await recommendationRepository.getRecommendationHigherThenTenScore();

  const recommendationLowerThenOrEqualToTenScore =
    await recommendationRepository.getRecommendationLowerThenOrEqualToTenScore();

  const randomRecommendation =
    await recommendationRepository.getRandomRecommendation();

  const findAnyRecommendation =
    await recommendationRepository.findAnyRecommendation();

  if (!findAnyRecommendation) {
    throw new EmptyDBError('Não foi encontrada nenhuma recomendação.');
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

async function getRecommendations({ amount }) {
  const scores = await recommendationRepository.validScores();
  const recommendations = await recommendationRepository.validRecommendations();

  if (!scores && !recommendations) {
    throw new EmptyDBError('Não foi encontrada nenhuma recomendação.');
  }

  const scoresList = (rec) =>
    scores.find(({ rec_id }) => rec_id === rec.id)?.score;

  const recommendationsWithScoreList = recommendations
    .map((rec) => ({
      ...rec,
      score: scoresList(rec) ? scoresList(rec) : '0',
    }))
    .sort((a, b) => {
      if (+a.score < +b.score) return 1;
      if (+a.score > +b.score) return -1;
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    })
    .slice(0, amount);

  return recommendationsWithScoreList;
}

export {
  newRecommendation,
  removeRecommendation,
  isDeleted,
  getRecommendation,
  getRecommendations,
};
