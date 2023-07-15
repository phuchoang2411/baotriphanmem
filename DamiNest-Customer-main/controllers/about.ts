import { Request, Response } from 'express';
const index = (req: Request, res: Response) => {
  // res.render('about/index')
  res.send('about/index');
};

module.exports = {
  index,
};
