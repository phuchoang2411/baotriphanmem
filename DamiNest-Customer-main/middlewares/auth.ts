import queryString from 'query-string';
import { Response, NextFunction } from 'express';

interface Request {
  isAuthenticated(): boolean | undefined;
  originalUrl: string;
}

const requiredLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  const redirectUrl = queryString.stringifyUrl({
    url: '/auth/login',
    query: {
      nextUrl: req.originalUrl,
    },
  });

  res.redirect(redirectUrl);
};

const notRequiredLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
};

const requiredLoginWithBoom = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.boom.unauthorized();
};

export { requiredLogin, notRequiredLogin, requiredLoginWithBoom };
