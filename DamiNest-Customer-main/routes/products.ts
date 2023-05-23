import { Router } from 'express';
const router = Router();

import { productController } from '../controllers';

router.get('/', productController.index);
router.get('/search', productController.search);
router.get('/:productId/reviews', productController.getReviews);
router.get('/:productId', productController.getView);

export default router;
