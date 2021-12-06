import IsDeletedError from '../src/errors/IsdeletedError.js';
import * as voteRepository from '../src/repositories/voteRepository.js';
import * as recommendationService from '../src/services/recommendationService.js';
import * as voteService from '../src/services/voteService.js';

describe('UPVOTE', () => {
  test('Should return null if recommendation is not found', async () => {
    jest
      .spyOn(recommendationService, 'isDeleted')
      .mockImplementationOnce(() => true);

    const result = voteService.addUpVote({ recommendationId: 1 });

    await expect(result).rejects.toThrowError(IsDeletedError);
  });

  test('Should return the upvote', async () => {
    jest
      .spyOn(recommendationService, 'isDeleted')
      .mockImplementationOnce(() => false);

    jest.spyOn(voteRepository, 'createVote').mockImplementationOnce(() => [{}]);

    const result = await voteService.addUpVote({ recommendationId: 1 });

    expect(result.length).toBe(1);
  });
});
