import connection from '../database/database.js';

async function findRecommendationByLink({ youtubeLink }) {
  const recommendation = await connection.query(
    'SELECT * FROM recommendations WHERE link = $1;',
    [youtubeLink],
  );

  return recommendation.rowCount;
}

async function createRecommendation({ name, youtubeLink }) {
  const newRecommendation = await connection.query(
    'INSERT INTO recommendations (name, link) VALUES ($1, $2) RETURNING *;',
    [name, youtubeLink],
  );

  return newRecommendation.rows;
}

async function removeRecommendation({ recommendationId }) {
  return connection.query(
    'UPDATE recommendations SET removed_date = NOW() WHERE id = $1;',
    [recommendationId],
  );
}

async function findDeletedRecommendation({ recommendationId }) {
  const deletedRecommendation = await connection.query(
    'SELECT * FROM recommendations WHERE id = $1 AND removed_date is NOT NULL;',
    [recommendationId],
  );

  return deletedRecommendation.rows[0];
}

async function getRecommendationHigherThenTenScore() {
  const recommendation = await connection.query(
    `
    SELECT score_board.rec_id, count(*) as score, recommendations.name, recommendations.link
        FROM recommendations
    JOIN score_board ON score_board.rec_id = recommendations.id
        WHERE score_board.type = 'upvote' AND recommendations.removed_date IS NULL
        GROUP BY score_board.rec_id, recommendations.name, recommendations.link
        HAVING count(*) > 10
        ORDER BY RANDOM()
        LIMIT 1;
    `,
  );

  return recommendation.rows[0];
}

async function getRecommendationLowerThenOrEqualToTenScore() {
  const recommendation = await connection.query(
    `
    SELECT score_board.rec_id, count(*) as score, recommendations.name, recommendations.link
        FROM recommendations
    JOIN score_board ON score_board.rec_id = recommendations.id
        WHERE score_board.type = 'upvote' AND recommendations.removed_date IS NULL
        GROUP BY score_board.rec_id, recommendations.name, recommendations.link
        HAVING count(*) <= 10
        ORDER BY RANDOM()
        LIMIT 1;
    `,
  );

  return recommendation.rows[0];
}

async function getRandomRecommendation() {
  const recommendation = await connection.query(`
    SELECT id, name, link
        FROM recommendations
        WHERE removed_date IS NULL
        ORDER BY RANDOM()
        LIMIT 1;
  `);

  const score = await connection.query(
    `
    SELECT count(*) as score FROM score_board where rec_id = $1;
  `,
    [recommendation.rows[0].id],
  );

  return { ...recommendation.rows[0], ...score.rows[0] };
}

async function findAnyRecommendation() {
  const recommendation = await connection.query(
    'SELECT * FROM recommendations LIMIT 1;',
  );

  return recommendation.rows[0];
}

export {
  createRecommendation,
  findRecommendationByLink,
  removeRecommendation,
  findDeletedRecommendation,
  getRecommendationHigherThenTenScore,
  getRecommendationLowerThenOrEqualToTenScore,
  getRandomRecommendation,
  findAnyRecommendation,
};
