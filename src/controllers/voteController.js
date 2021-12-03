import * as voteService from '../services/voteService.js';

async function addDownVote(req, res) {
  const { id } = req.params;

  try {
    const downVote = await voteService.addDownVote({
      recommendationId: id,
    });

    if (downVote.length === 0) {
      return res.status(200).send('Esta recomendação foi removida');
    }

    return res.sendStatus(201);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente mais tarde.' });
  }
}

export { addDownVote };
