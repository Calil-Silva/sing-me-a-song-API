import connection from '../database/database.js';

async function createVote({ recommendationId, type }) {
  const upvote = await connection.query(
    'INSERT INTO score_board (rec_id, type) VALUES ($1, $2) RETURNING *;',
    [recommendationId, type],
  );

  return upvote.rows;
}

async function findDownVotes({ recommendationId }) {
  const downVotesList = await connection.query(
    'SELECT * FROM score_board WHERE type = $1 AND rec_id = $2;',
    ['downvote', recommendationId],
  );

  return downVotesList.rowCount;
}

export { createVote, findDownVotes };
