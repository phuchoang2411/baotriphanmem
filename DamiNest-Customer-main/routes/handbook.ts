import express from 'express';
import { handbookController } from '../controllers';
const router = express.Router();

router.get('/', handbookController.index);
router.get('/view', handbookController.view);

export default router;
