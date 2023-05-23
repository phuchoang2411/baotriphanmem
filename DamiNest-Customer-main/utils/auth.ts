import jwt from 'jsonwebtoken';
import config from '../config';

const getVerifyEmailToken = ({ userId, emailId }) => {
  return jwt.sign(
    {
      userId,
      emailId,
    },
    config.SECRET_KEY!,
    { expiresIn: '24h' }
  );
};

const getResetPasswordToken = ({ userId, resetPasswordId }) => {
  return jwt.sign(
    {
      userId,
      resetPasswordId,
    },
    config.SECRET_KEY!,
    { expiresIn: '24h' }
  );
};

export { getVerifyEmailToken, getResetPasswordToken };
