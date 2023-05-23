import express from 'express';
import {
  checkoutController,
  cartController,
  orderController,
} from '../controllers';
const router = express.Router();

import { authMiddleware } from '../middlewares';

router.get('/cart', cartController.index);
router.get('/cart/get', cartController.getCart);
router.put('/cart/add', cartController.addProductToCart);
router.delete('/cart/delete', cartController.deleteProductFromCart);
router.delete('/cart/delete-all', cartController.deleteAllProductFromCart);

router.get(
  '/shipping',
  authMiddleware.requiredLogin,
  checkoutController.shipping
);
router.get(
  '/payment',
  authMiddleware.requiredLogin,
  checkoutController.payment
);
router.get('/result', authMiddleware.requiredLogin, checkoutController.result);

router.post(
  '/create-order',
  authMiddleware.requiredLogin,
  orderController.createOrder
);

export default router;
