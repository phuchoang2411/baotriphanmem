const { ProductModel } = require('../models');

const index = async (req, res) => {
  const { docs } = await ProductModel.paginate(
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

  res.send({ products: docs });
  //res.render('home/index', { products: docs });
};

module.exports = {
  index,
};
