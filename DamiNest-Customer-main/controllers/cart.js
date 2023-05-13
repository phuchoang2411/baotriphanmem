const mongoose = require('mongoose');
const { UserModel, ProductModel } = require('../models');

const index = async (req, res) => {
  res.render('checkout/cart/index');
};

const addProductToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const promises = [];

  promises.push(ProductModel.findById(productId).exec());

  if (req.user?._id) {
    let cart = [...req.user.cart];

    const index = cart.findIndex((e) => String(e.productId) === productId);

    if (index !== -1) {
      // Update quantity
      cart[index].quantity += parseInt(quantity);

      if (cart[index].quantity < 1) {
        // Delete product if quantify < 1
        cart = cart.filter((e) => String(e.productId) !== productId);
      }
    } else {
      // Add product
      cart = [
        ...cart,
        {
          productId: new mongoose.Types.ObjectId(productId),
          quantity,
        },
      ];
    }

    promises.push(
      UserModel.findByIdAndUpdate(
        req.user._id,
        { $set: { cart } },
        { new: true }
      ).exec()
    );
  }

  const [product] = await Promise.all(promises);

  const cartItem = {
    id: String(product._id),
    productId: String(product._id),
    name: product.name,

    featuredImage: product.featuredImage,

    _maxQuantity: product.maxQuantity,
    _price: product.price,
    _discount: product.discount,

    price: product.price - product.discount,
    quantity,
  };

  res.json(cartItem);
};

const deleteProductFromCart = async (req, res) => {
  const { productId } = req.body;

  if (!req.user?._id) {
    res.json([]);
    return;
  }

  const cart = [...req.user.cart].filter(
    (e) => String(e.productId) !== productId
  );

  const userUpdated = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $set: { cart } },
    { new: true }
  ).exec();

  res.json(userUpdated.cart);
};

const getCart = async (req, res) => {
  if (!req.user?._id) {
    res.json({
      source: 'localStorage',
      cart: [],
    });
    return;
  }

  const user = await UserModel.findById(req.user._id)
    .populate('cart.productId')
    .exec();

  if (!user) {
    res.json({
      source: 'localStorage',
      cart: [],
    });
    return;
  }

  const cart = user.cart.map((item) => {
    const product = item.productId;

    return {
      id: String(product._id),
      productId: String(product._id),
      name: product.name,
      featuredImage: product.featuredImage,

      _maxQuantity: product.maxQuantity,
      _price: product.price,
      _discount: product.discount,

      price: product.price - product.discount,
      quantity: item.quantity,
    };
  });

  res.json({
    source: 'fromUser',
    cart,
  });
};

const deleteAllProductFromCart = async (req, res) => {
  if (!req.user?._id) {
    res.json(true);
    return;
  }

  await UserModel.findByIdAndUpdate(req.user._id, {
    $set: { cart: [] },
  }).exec();

  res.json(true);
};

module.exports = {
  index,
  getCart,
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductFromCart,
};
