import express from 'express';
import { dataController } from '../controllers';
const router = express.Router();

router.get('/init-customers', dataController.initCustomers);
router.get('/init-products', dataController.initProducts);

export default router;
