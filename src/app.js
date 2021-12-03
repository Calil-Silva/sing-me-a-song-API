import express from 'express';
import * as recommendationController from './controllers/recommendationController.js';

const app = express();

app.use(express.json());

app.post('/recommendation', recommendationController.addNewRecommendation);

export default app;
