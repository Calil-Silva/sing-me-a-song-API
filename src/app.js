import express from 'express';
import recommendationRouter from './routers/recommendationRouter.js';
import voteRouter from './routers/voteRouter.js';
import serverMiddlewareErro from './middlewares/serverMiddlewareErro.js';

const app = express();

app.use(express.json());

app.use(recommendationRouter);
app.use(voteRouter);

app.use(serverMiddlewareErro);

export default app;
