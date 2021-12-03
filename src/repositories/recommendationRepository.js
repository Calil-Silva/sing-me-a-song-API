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

export { createRecommendation, findRecommendationByLink, removeRecommendation };
