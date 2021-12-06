import BadRequestError from '../errors/BadRerequestError.js';
import EmptyDBError from '../errors/EmptyDBError.js';
import IsCreatedError from '../errors/IsCreatedError.js';
import * as recommendationService from '../services/recommendationService.js';

async function addNewRecommendation(req, res, next) {
  const { name, youtubeLink } = req.body;

  try {
    const addedRecommendation = await recommendationService.newRecommendation({
      name,
      youtubeLink,
    });

    return res.status(201).send({
      message: 'Recomendação criada com sucesso!',
      recommendation: addedRecommendation,
    });
  } catch (error) {
    if (error instanceof IsCreatedError) {
      return res.status(409).send(error.message);
    }
    if (error instanceof BadRequestError) {
      return res.status(400).send(error.message);
    }
    return next(error);
  }
}

async function getRecommendation(_, res, next) {
  try {
    const recommendation = await recommendationService.getRecommendation();

    return res.status(200).send(recommendation);
  } catch (error) {
    if (error instanceof EmptyDBError) {
      return res.status(404).send(error.message);
    }
    return next(error);
  }
}

async function getOrderedRecommendations(req, res, next) {
  const { amount } = req.params;
  try {
    const recommendations = await recommendationService.getRecommendations({
      amount,
    });

    return res.status(200).send(recommendations);
  } catch (error) {
    if (error instanceof EmptyDBError) {
      return res.status(404).send(error.message);
    }
    return next(error);
  }
}

export { addNewRecommendation, getRecommendation, getOrderedRecommendations };
