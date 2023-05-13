const mongoose = require('mongoose');
const {
  ProductModel,
  ProductCategoryModel,
  ProductReviewModel,
} = require('../models');
const config = require('../config');
const { commonUtil } = require('../utils');

const getProducts = async ({ page, categoryId, sort } = {}) => {
  const query = {};
  let _sort = {};

  if (categoryId) {
    query.categoryId = categoryId;
  }

  if (sort) {
    _sort = commonUtil.convertSortQueryStringToMongooseSort(sort);
  }

  const data = await ProductModel.paginate(query, {
    page: page || 1,
    limit: config.PAGE_LIMIT,
    populate: {
      path: 'categoryId ownerId',
      select: '-password',
    },
    sort: _sort,
  });

  return data;
};

const index = async (req, res) => {
  const { page, categoryId, sort } = req.query;

  const [categoriesRes, productsRes] = await Promise.all([
    ProductCategoryModel.find(),
    getProducts({ page, categoryId, sort }),
  ]);

  const { docs, page: currentPage, totalPages } = productsRes;

  // res.render('products/index', {
  //   categoryId,
  //   categories: categoriesRes,

  //   products: docs,
  //   page: currentPage,
  //   totalPages,

  //   pageUrl: req.originalUrl
  // })

  res.send({
    categoryId,
    categories: categoriesRes,

    products: docs,
    page: currentPage,
    totalPages,

    pageUrl: req.originalUrl,
  });
};

const search = async (req, res) => {
  const query = {};
  let sort = {};

  // Keyword
  if (req.query?.keyword) {
    query.$text = {
      $search: req.query?.keyword,
    };
  }

  // Category
  if (req.query?.categoryId) {
    if (Array.isArray(req.query.categoryId)) {
      query.categoryId = {
        $in: req.query.categoryId,
      };
    } else {
      query.categoryId = req.query.categoryId;
    }
  }

  // Price
  if (req.query?.priceMin || req.query?.priceMax) {
    query.price = {};

    if (req.query?.priceMin) {
      query.price.$gte = parseInt(req.query.priceMin);
    }

    if (req.query?.priceMax) {
      query.price.$lte = parseInt(req.query.priceMax);
    }
  }

  // Rating
  if (req.query?.ratingMin) {
    query.ratingAvg = {
      $gte: parseInt(req.query.ratingMin),
    };
  }

  // Sort
  if (req.query?.sort) {
    sort = commonUtil.convertSortQueryStringToMongooseSort(req.query.sort);
  }

  const result = await ProductModel.paginate(query, {
    page: req.query?.page || 1,
    limit: config.PAGE_LIMIT,
    sort,
    populate: {
      path: 'categoryId ownerId',
      select: '-password',
    },
  });

  console.log('result', result.docs);

  const categories = await ProductCategoryModel.find({}).exec();

  res.render('products/search', {
    categories,

    products: result.docs,
    page: result.page,
    totalPages: result.totalPages,

    pageUrl: req.originalUrl,

    formValues: {
      keyword: req.query?.keyword,
      categoryId: req.query?.categoryId,
      priceMin: req.query?.priceMin,
      priceMax: req.query?.priceMax,
      sort: req.query?.sort,
    },
  });
  // res.send({
  //   categories,

  //   products: result.docs,
  //   page: result.page,
  //   totalPages: result.totalPages,

  //   pageUrl: req.originalUrl,

  //   formValues: {
  //     keyword: req.query?.keyword,
  //     categoryId: req.query?.categoryId,
  //     priceMin: req.query?.priceMin,
  //     priceMax: req.query?.priceMax,
  //     sort: req.query?.sort,
  //   },
  // });
};

const getView = async (req, res, next) => {
  const { productId } = req.params;

  const isValid = mongoose.isValidObjectId(productId);
  if (!isValid) {
    return next(new Error('Mã sản phẩm không hợp lệ!'));
  }

  const product = await ProductModel.findById(productId).exec();
  if (!product) {
    return next(new Error('Không tìm thấy sản phẩm!'));
  }

  const [relatedProducts] = await Promise.all([
    ProductModel.find({ categoryId: product.categoryId }).limit(3).exec(),
    ProductModel.findByIdAndUpdate(productId, {
      $inc: { totalViews: 1 },
    }).exec(),
  ]);

  res.render('products/view', { product, relatedProducts });
};

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      res.boom.badRequest();
      return;
    }

    const data = await ProductReviewModel.paginate(
      {
        productId,
        published: true,
      },
      {
        page: req.query?.page || 1,
        limit: req.query?.limit,
        populate: {
          path: 'ownerId',
          select:
            '-password -cart -emailId -resetPasswordId -phoneNumber -address',
        },
        sort: {
          updatedAt: 'desc',
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.boom.badRequest(error.message);
  }
};

module.exports = {
  index,
  search,
  getView,
  getReviews,
};
