import IsDeletedError from '../errors/IsdeletedError.js';
import * as voteService from '../services/voteService.js';

async function addDownVote(req, res, next) {
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
    return next(error);
  }
}

async function addUpVote(req, res, next) {
  const { id } = req.params;

  try {
    const upvote = await voteService.addUpVote({ recommendationId: id });

    return res.status(201).send(upvote);
  } catch (error) {
    if (error instanceof IsDeletedError) {
      return res.status(404).send(error.message);
    }
    return next(error);
  }
}

export { addDownVote, addUpVote };
