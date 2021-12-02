import * as recommendationService from '../services/recommendation.js';

async function addNewRecommendation(req, res) {
  const { name, youtubeLink } = req.body;

  try {
    const addedRecommendation = await recommendationService.newRecommendation({
      name,
      youtubeLink,
    });

    if (addedRecommendation.length === 0) {
      return res.status(400).send({
        message:
          'Ocorreu um erro, verifique se os campos nome e link estão preenchidos corretamente.',
      });
    }
    return res
      .status(201)
      .send({ message: 'Recomendação criada com sucesso!' });
  } catch (error) {
    return res
      .status(500)
      .send('Ocorreu um erro inesperado, tente mais tarde.');
  }
}

export { addNewRecommendation };
