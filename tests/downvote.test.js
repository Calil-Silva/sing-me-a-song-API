import * as voteRepository from '../src/repositories/voteRepository.js';
import * as recommendationService from '../src/services/recommendationService.js';
import * as voteService from '../src/services/voteService.js';

describe('DOWNVOTE', () => {
  test('Should return an empty array if the recommendation has 5 downvotes', async () => {
    jest
      .spyOn(recommendationService, 'isDeleted')
      .mockImplementationOnce(() => false);
    jest.spyOn(voteRepository, 'findDownVotes').mockImplementationOnce(() => 5);
    jest
      .spyOn(recommendationService, 'removeRecommendation')
      .mockImplementationOnce(() => true);
    const result = await voteService.addDownVote({ recommendationId: 1 });
    expect(result.length).toBe(0);
  });
  test('Should return the downvote if recommendation has fewer than 5 downvotes', async () => {
    jest
      .spyOn(recommendationService, 'isDeleted')
      .mockImplementationOnce(() => false);
    jest.spyOn(voteRepository, 'findDownVotes').mockImplementationOnce(() => 4);
    jest.spyOn(voteRepository, 'createVote').mockImplementationOnce(() => [{}]);
    const result = await voteService.addDownVote({ recommendationId: 1 });
    expect(result.length).toBe(1);
  });
  test('Should return null if the recommendation has already been removed', async () => {
    jest
      .spyOn(recommendationService, 'isDeleted')
      .mockImplementationOnce(() => true);
    const result = await voteService.addDownVote({ recommendationId: 1 });
    expect(result).toBe(null);
  });
});
