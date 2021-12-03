import * as recommendationServices from '../src/services/recommendationService.js';
import * as recommendationRepository from '../src/repositories/recommendationRepository.js';

describe('RECOMMENDATION', () => {
  it('Should return the recommendation as a body if it was successfully inserted into repository', async () => {
    jest
      .spyOn(recommendationRepository, 'createRecommendation')
      .mockImplementationOnce(() => [{ a: 1 }]);

    jest
      .spyOn(recommendationRepository, 'findRecommendationByLink')
      .mockImplementationOnce(() => 0);

    const result = await recommendationServices.newRecommendation({
      name: 'teste',
      youtubeLink: 'teste',
    });
    expect(result.length).toBe(1);
  });

  it('Should return null if recommendation has already been recommended', async () => {
    jest
      .spyOn(recommendationRepository, 'findRecommendationByLink')
      .mockImplementationOnce(() => 1);

    const result = await recommendationServices.newRecommendation({
      name: 'teste',
      youtubeLink: 'teste',
    });
    expect(result).toBe(null);
  });

  it('Should return an empty array if the response is undefined', async () => {
    jest
      .spyOn(recommendationRepository, 'findRecommendationByLink')
      .mockImplementationOnce(() => 0);

    jest
      .spyOn(recommendationRepository, 'createRecommendation')
      .mockImplementationOnce(() => undefined);

    const result = await recommendationServices.newRecommendation({
      name: 'teste',
      youtubeLink: 'teste',
    });
    expect(result).toEqual([]);
  });
});
