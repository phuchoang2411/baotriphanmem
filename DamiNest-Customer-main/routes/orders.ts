import express from 'express';
import { orderController } from '../controllers';
const router = express.Router();

router.patch('/:orderId/status', orderController.updateOrderStatus);

export default router;
