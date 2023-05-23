import express from 'express';
const router = express.Router();

import { authMiddleware } from '../middlewares';
import { authController } from '../controllers';

router.get(
  '/register',
  authMiddleware.notRequiredLogin,
  authController.getRegister
);
router.post(
  '/register',
  authMiddleware.notRequiredLogin,
  authController.postRegister
);

router.get('/login', authMiddleware.notRequiredLogin, authController.getLogin);
router.post(
  '/login',
  authMiddleware.notRequiredLogin,
  authController.postLogin
);

router.get('/logout', authMiddleware.requiredLogin, authController.getLogout);

router.post(
  '/send-verify-email',
  authMiddleware.requiredLoginWithBoom,
  authController.postSendVerifyEmail
);
router.get('/verify-email', authController.getVerifyEmail);

router.get('/forgot-password', authController.getForgotPassword);
router.post('/forgot-password', authController.postForgotPassword);

router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);

router.post('/check-email', authController.checkEmail);

export default router;
