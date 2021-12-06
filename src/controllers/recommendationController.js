import * as recommendationService from '../services/recommendationService.js';

async function addNewRecommendation(req, res) {
  const { name, youtubeLink } = req.body;

  try {
    const addedRecommendation = await recommendationService.newRecommendation({
      name,
      youtubeLink,
    });

    if (!addedRecommendation) {
      return res
        .status(409)
        .send({ message: 'Esta recomendação já foi feita.' });
    }

    if (addedRecommendation.length === 0) {
      return res.status(400).send({
        message:
          'Ocorreu um erro, verifique se os campos nome e link estão preenchidos corretamente.',
      });
    }
    return res.status(201).send({
      message: 'Recomendação criada com sucesso!',
      recommendation: addedRecommendation,
    });
  } catch (error) {
    return res
      .status(500)
      .send('Ocorreu um erro inesperado, tente mais tarde.');
  }
}

async function getRecommendation(_, res) {
  try {
    const recommendation = await recommendationService.getRecommendation();

    if (recommendation.length === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).send(recommendation);
  } catch (error) {
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
    return res.sendStatus(500);
  }
}

export { addNewRecommendation, getRecommendation, getOrderedRecommendations };
