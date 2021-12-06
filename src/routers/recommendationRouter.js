import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('/recommendations', recommendationController.addNewRecommendation);
router.get(
  '/recommendations/random',
  recommendationController.getRecommendation,
);
router.get(
  '/recommendations/top/:amount',
  recommendationController.getOrderedRecommendations,
);

export default router;
