import express from 'express';
import { mailController } from '../controllers';
const router = express.Router();

router.get('/orders/:orderId', mailController.sendOrderEmail);
router.get('/product-review/:reviewId', mailController.sendProductReviewEmail);

router.get('/auth/:userId/verify-email', mailController.sendVerifyEmail);
router.get('/auth/:userId/reset-password', mailController.resetPassword);

export default router;
