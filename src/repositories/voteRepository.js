import connection from '../database/database';

async function createVote({ recommendationId, type }) {
  const upvote = await connection.query(
    'INSERT INTO score_board (rec_id, type) VALUES ($1, $2) RETURNING *;',
    [recommendationId, type],
  );

  return upvote.rows;
}

async function findDownVotes({ recommendationId }) {
  const downVotesList = await connection.query(
    'SELECT * FROM score_board WHERE type = downvote AND rec_id = $1;',
    [recommendationId],
  );

  return downVotesList.rowCount;
}

export { createVote, findDownVotes };
