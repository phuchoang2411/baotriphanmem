import express from 'express';
const router = express.Router();

import { homeController } from '../controllers';

router.get('/', homeController.index);

export default router;
