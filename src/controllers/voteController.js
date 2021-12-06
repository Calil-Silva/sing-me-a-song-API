import IsDeletedError from '../errors/IsdeletedError.js';
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

    return res.status(201).send(downVote);
  } catch (error) {
    if (error instanceof IsDeletedError) {
      return res.status(404).send(error.message);
    }
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente mais tarde.' });
  }
}

async function addUpVote(req, res) {
  const { id } = req.params;

  try {
    const upvote = await voteService.addUpVote({ recommendationId: id });

    return res.status(201).send(upvote);
  } catch (error) {
    if (error instanceof IsDeletedError) {
      return res.status(404).send(error.message);
    }
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente mais tarde.' });
  }
}

export { addDownVote, addUpVote };
