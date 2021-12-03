import * as voteRepository from '../repositories/voteRepository.js';
import * as recommendationService from '../services/recommendationService.js';

async function addNewVote({ recommendationId, type }) {
  if (type === 'downvote') {
    const downVotesAmount = await voteRepository.findDownVotes(
      recommendationId,
    );

    if (downVotesAmount === 4) {
      await recommendationService.removeRecommendation({
        recommendationId,
      });
    }
  }

  const vote = await voteRepository.createVote({ recommendationId, type });
}
