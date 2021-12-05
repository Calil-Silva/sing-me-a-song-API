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

    const result = await recommendationServices.getRecommendation();
    expect(result.length).toBe(0);
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
});
