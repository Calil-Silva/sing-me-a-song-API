import express from 'express';
import recommendationRouter from './routers/recommendationRouter.js';
import voteRouter from './routers/voteRouter.js';

const app = express();

app.use(express.json());

app.use(recommendationRouter);
app.use(voteRouter);

export default app;
