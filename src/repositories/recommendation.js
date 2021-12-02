import connection from '../database/database.js';

async function createRecommendation({ name, link }) {
  const newRecommendation = await connection.query(
    'INSERT INTO recommendations (name, link) VALUES ($1, $2);',
    [name, link],
  );
  return newRecommendation;
}

export { createRecommendation };
