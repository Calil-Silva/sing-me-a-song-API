import * as recommendationServices from '../src/services/recommendationService.js';
import * as recommendationRepository from '../src/repositories/recommendationRepository.js';
import IsCreatedError from '../src/errors/IsCreatedError.js';
import BadRequestError from '../src/errors/BadRerequestError.js';
import EmptyDBError from '../src/errors/EmptyDBError.js';

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

    const result = recommendationServices.newRecommendation({
      name: 'teste',
      youtubeLink: 'teste',
    });
    await expect(result).rejects.toThrowError(IsCreatedError);
  });

  it('Should return an empty array if the response is undefined', async () => {
    jest
      .spyOn(recommendationRepository, 'findRecommendationByLink')
      .mockImplementationOnce(() => 0);

    jest
      .spyOn(recommendationRepository, 'createRecommendation')
      .mockImplementationOnce(() => undefined);

    const result = recommendationServices.newRecommendation({
      name: 'teste',
      youtubeLink: 'teste',
    });
    await expect(result).rejects.toThrowError(BadRequestError);
  });

  it('Should return a no biased random recommendation if all recs have not been voted yet;', async () => {
    jest
      .spyOn(recommendationRepository, 'getRecommendationHigherThenTenScore')
      .mockImplementationOnce(() => false);

    jest
      .spyOn(
        recommendationRepository,
        'getRecommendationLowerThenOrEqualToTenScore',
      )
      .mockImplementationOnce(() => false);

    jest
      .spyOn(recommendationRepository, 'getRandomRecommendation')
      .mockImplementationOnce(() => ({}));

    jest
      .spyOn(recommendationRepository, 'findAnyRecommendation')
      .mockImplementationOnce(() => true);

    const result = await recommendationServices.getRecommendation();
    expect(result).toBeTruthy();
  });

  it('Should return a no biased random recommendation if all recs are above ten score;', async () => {
    jest
      .spyOn(recommendationRepository, 'getRecommendationHigherThenTenScore')
      .mockImplementationOnce(() => true);

    jest
      .spyOn(
        recommendationRepository,
        'getRecommendationLowerThenOrEqualToTenScore',
      )
      .mockImplementationOnce(() => false);

    jest
      .spyOn(recommendationRepository, 'getRandomRecommendation')
      .mockImplementationOnce(() => ({}));

    jest
      .spyOn(recommendationRepository, 'findAnyRecommendation')
      .mockImplementationOnce(() => true);

    const result = await recommendationServices.getRecommendation();
    expect(result).toBeTruthy();
  });

  it('Should return a no biased random recommendation if all recs are below ten score;', async () => {
    jest
      .spyOn(recommendationRepository, 'getRecommendationHigherThenTenScore')
      .mockImplementationOnce(() => false);

    jest
      .spyOn(
        recommendationRepository,
        'getRecommendationLowerThenOrEqualToTenScore',
      )
      .mockImplementationOnce(() => true);

    jest
      .spyOn(recommendationRepository, 'getRandomRecommendation')
      .mockImplementationOnce(() => ({}));

    jest
      .spyOn(recommendationRepository, 'findAnyRecommendation')
      .mockImplementationOnce(() => true);

    const result = await recommendationServices.getRecommendation();
    expect(result).toBeTruthy();
  });

  it('Should an empty array', async () => {
    jest
      .spyOn(recommendationRepository, 'getRecommendationHigherThenTenScore')
      .mockImplementationOnce(() => false);

    jest
      .spyOn(
        recommendationRepository,
        'getRecommendationLowerThenOrEqualToTenScore',
      )
      .mockImplementationOnce(() => false);

    jest
      .spyOn(recommendationRepository, 'getRandomRecommendation')
      .mockImplementationOnce(() => false);

    jest
      .spyOn(recommendationRepository, 'findAnyRecommendation')
      .mockImplementationOnce(() => false);

    const result = recommendationServices.getRecommendation();

    await expect(result).rejects.toThrowError(EmptyDBError);
  });

  it('Should return a recommendation with more then ten score', async () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;

    jest
      .spyOn(recommendationRepository, 'getRecommendationHigherThenTenScore')
      .mockImplementationOnce(() => ({ score: 11 }));

    jest
      .spyOn(
        recommendationRepository,
        'getRecommendationLowerThenOrEqualToTenScore',
      )
      .mockImplementationOnce(() => true);

    jest
      .spyOn(recommendationRepository, 'getRandomRecommendation')
      .mockImplementationOnce(() => true);

    jest
      .spyOn(recommendationRepository, 'findAnyRecommendation')
      .mockImplementationOnce(() => true);

    const result = await recommendationServices.getRecommendation();
    expect(result).toEqual({ score: 11 });
  });

  it('Should return a recommendation with a score equal to 10', async () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 7;
    global.Math = mockMath;

    jest
      .spyOn(recommendationRepository, 'getRecommendationHigherThenTenScore')
      .mockImplementationOnce(() => true);

    jest
      .spyOn(
        recommendationRepository,
        'getRecommendationLowerThenOrEqualToTenScore',
      )
      .mockImplementationOnce(() => ({ score: 10 }));

    jest
      .spyOn(recommendationRepository, 'getRandomRecommendation')
      .mockImplementationOnce(() => true);

    jest
      .spyOn(recommendationRepository, 'findAnyRecommendation')
      .mockImplementationOnce(() => true);

    const result = await recommendationServices.getRecommendation();
    expect(result).toEqual({ score: 10 });
  });

  it('Should return a list of recommendations based on an given amount', async () => {
    const amount = 4;

    jest
      .spyOn(recommendationRepository, 'validScores')
      .mockImplementationOnce(() => [
        { rec_id: 1, score: '4' },
        { rec_id: 2, score: '10' },
        { rec_id: 5, score: '0' },
        { rec_id: 4, score: '0' },
        { rec_id: 3, score: '0' },
      ]);

    jest
      .spyOn(recommendationRepository, 'validRecommendations')
      .mockImplementationOnce(() => [
        { id: 1, name: 'teste 1', youtubeLink: 'http...' },
        { id: 2, name: 'teste 2', youtubeLink: 'http...' },
        { id: 5, name: 'teste 5', youtubeLink: 'http...' },
        { id: 4, name: 'teste 4', youtubeLink: 'http...' },
        { id: 3, name: 'teste 3', youtubeLink: 'http...' },
      ]);

    const result = await recommendationServices.getRecommendations({ amount });

    expect(result).toEqual([
      {
        id: 2,
        name: 'teste 2',
        youtubeLink: 'http...',
        score: '10',
      },
      {
        id: 1,
        name: 'teste 1',
        youtubeLink: 'http...',
        score: '4',
      },
      {
        id: 3,
        name: 'teste 3',
        youtubeLink: 'http...',
        score: '0',
      },
      {
        id: 4,
        name: 'teste 4',
        youtubeLink: 'http...',
        score: '0',
      },
    ]);
  });

  it('Should advise user that none recommendations was found', async () => {
    const amount = 1;
    jest
      .spyOn(recommendationRepository, 'validScores')
      .mockImplementationOnce(() => null);

    jest
      .spyOn(recommendationRepository, 'validRecommendations')
      .mockImplementationOnce(() => null);

    const result = recommendationServices.getRecommendations({ amount });
    await expect(result).rejects.toThrowError(EmptyDBError);
  });
});
