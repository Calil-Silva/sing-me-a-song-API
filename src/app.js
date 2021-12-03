import express from 'express';
import * as recommendationController from './controllers/recommendationController.js';
import * as voteController from './controllers/voteController.js';

const app = express();

app.use(express.json());

app.post('/recommendation', recommendationController.addNewRecommendation);
app.post('/recommendation/:id/downvote', voteController.addDownVote);

export default app;
