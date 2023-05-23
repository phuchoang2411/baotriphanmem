import express from 'express';
const router = express.Router();

import { productReviewController } from '../controllers';
import { authMiddleware } from '../middlewares';

router.post(
  '/',
  authMiddleware.requiredLoginWithBoom,
  productReviewController.postReview
);
router.post('/check-can-review', productReviewController.postCheckCanReview);
// router.patch('/:reviewId/publish', productReviewController.patchPublishReview)

export default router;
