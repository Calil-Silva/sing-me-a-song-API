import * as voteRepository from '../repositories/voteRepository.js';
import * as recommendationService from './recommendationService.js';

async function addUpVote({ recommendationId }) {
  const vote = await voteRepository.createVote({
    recommendationId,
    type: 'upvote',
  });
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
