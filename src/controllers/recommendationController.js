import BadRequestError from '../errors/BadRerequestError.js';
import EmptyDBError from '../errors/EmptyDBError.js';
import IsCreatedError from '../errors/IsCreatedError.js';
import * as recommendationService from '../services/recommendationService.js';

async function addNewRecommendation(req, res) {
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
    return res
      .status(500)
      .send('Ocorreu um erro inesperado, tente mais tarde.');
  }
}

async function getRecommendation(_, res) {
  try {
    const recommendation = await recommendationService.getRecommendation();

    return res.status(200).send(recommendation);
  } catch (error) {
    if (error instanceof EmptyDBError) {
      return res.status(404).send(error.message);
    }
    return res
      .status(500)
      .send('Ocorreu um erro inesperado, tente mais tarde.');
  }
}

async function getOrderedRecommendations(req, res) {
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
    return res.sendStatus(500);
  }
}

export { addNewRecommendation, getRecommendation, getOrderedRecommendations };
