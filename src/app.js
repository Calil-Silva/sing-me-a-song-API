import express from 'express';
import * as recommendationController from './controllers/recommendationController.js';
import * as voteController from './controllers/voteController.js';

const app = express();

app.use(express.json());

app.post('/recommendations', recommendationController.addNewRecommendation);
app.post('/recommendations/:id/downvote', voteController.addDownVote);
app.post('/recommendations/:id/upvote', voteController.addUpVote);
app.get('/recommendations/random', recommendationController.getRecommendation);
app.get(
  '/recommendations/top/:amount',
  recommendationController.getOrderedRecommendations,
);

export default app;
