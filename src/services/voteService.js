import * as voteRepository from '../repositories/voteRepository.js';
import * as recommendationService from './recommendationService.js';

async function addUpVote({ recommendationId }) {
  const checkUnavailability = await recommendationService.isDeleted({
    recommendationId,
  });

  if (checkUnavailability) {
    return null;
  }

  const vote = await voteRepository.createVote({
    recommendationId,
    type: 'upvote',
  });

  return vote;
}

async function addDownVote({ recommendationId }) {
  const downVotesAmount = await voteRepository.findDownVotes({
    recommendationId,
  });

  if (downVotesAmount === 5) {
    await recommendationService.removeRecommendation({
      recommendationId,
    });
    return [];
  }

  const vote = await voteRepository.createVote({
    recommendationId,
    type: 'downvote',
  });

  return vote;
}

export { addUpVote, addDownVote };
