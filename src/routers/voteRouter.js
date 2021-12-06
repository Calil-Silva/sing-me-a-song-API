import { Router } from 'express';
import * as voteController from '../controllers/voteController.js';

const router = new Router();

router.post('/recommendations/:id/upvote', voteController.addUpVote);
router.post('/recommendations/:id/downvote', voteController.addDownVote);

export default router;
