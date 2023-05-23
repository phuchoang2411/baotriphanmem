import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface ProductAttrs {
  name: String;
  categoryId: mongoose.Schema.Types.ObjectId;
  featuredImage: String;

  description: String;

  maxQuantity: Number;

  ratingAvg: Number;

  ratingStat: {
    1: Number;
    2: Number;
    3: Number;
    4: Number;
    5: Number;
  };
  totalRatings: Number;

  totalViews: Number;

  totalPurchases: Number;

  price: Number;

  discount: Number;

  ingredient: String;

  mass: String;

  uses: String;

  preservation: String;

  expiryDate: String;

  origin: String;

  ownerId: mongoose.Schema.Types.ObjectId;
}

interface ProductDoc extends mongoose.Document {
  name: String;
  categoryId: mongoose.Schema.Types.ObjectId;
  featuredImage: String;

  description: String;

  maxQuantity: Number;

  ratingAvg: Number;

  ratingStat: {
    1: Number;
    2: Number;
    3: Number;
    4: Number;
    5: Number;
  };
  totalRatings: Number;

  totalViews: Number;

  totalPurchases: Number;

  price: Number;

  discount: Number;

  ingredient: String;

  mass: String;

  uses: String;

  preservation: String;

  expiryDate: String;

  origin: String;

  ownerId: mongoose.Schema.Types.ObjectId;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    featuredImage: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    maxQuantity: {
      type: Number,
      default: 0,
    },
    ratingAvg: {
      type: Number,
      default: 0,
    },
    ratingStat: {
      1: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    totalPurchases: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    ingredient: {
      type: String,
      default: '',
    },
    mass: {
      type: String,
      default: '',
    },
    uses: {
      type: String,
      default: '',
    },
    preservation: {
      type: String,
      default: '',
    },
    expiryDate: {
      type: String,
      default: '',
    },
    origin: {
      type: String,
      default: '',
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

interface PaginateAttrs {
  {};
  page: Number;
  limit: Number;
  populate: {
    path: String;
    select: String;
  };
}

interface PaginateDoc extends mongoose.Document, PaginateAttrs {}

productSchema.index({
  name: 'text',
  description: 'text',
  price: 1,
});

const Product = mongoose.model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);

const PaginateModel = mongoose.model<
  PaginateDoc,
  mongoose.PaginateModel<PaginateDoc>
>('Paginates', productSchema, 'paginates');

export { Product, PaginateModel };
