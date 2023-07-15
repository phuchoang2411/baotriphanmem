import queryString from 'query-string';
import { Response, NextFunction } from 'express';
import {} from 'express-boom';

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

const notRequiredLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
};

const requiredLoginWithBoom = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.boom.unauthorized();
};

export { requiredLogin, notRequiredLogin, requiredLoginWithBoom };
