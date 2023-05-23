import express from 'express';
const router = express.Router();

import { profileController } from '../controllers';

router.get('/', profileController.index);
router.patch('/me', profileController.patchMe);

router.put('/cart', profileController.updateCart);

router.get('/change-password', profileController.getChangePassword);
router.patch('/change-password', profileController.patchChangePassword);

router.get('/purchases', profileController.getPurchases);

export default router;
