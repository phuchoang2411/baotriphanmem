import { ProductModel } from '../models';
import { Request, Response } from 'express';

const index = async (req: Request, res: Response) => {
  const { docs } = await ProductModel.PaginateModel(
    {},
    {
      page: 1,
      limit: 6,
      populate: {
        path: 'categoryId ownerId',
        select: '-password',
      },
    }
  );

  res.render('home/index', { products: docs });
};

export { index };
