const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: 'FlexGlow' },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  mrp: { type: Number, required: true },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  description: { type: String, required: true },
  ingredients: { type: String },
  benefits: { type: String },
  directions: { type: String },
  skinType: { type: String },
  weight: { type: String },
  availability: { type: String, enum: ['In Stock', 'Out of Stock'], default: 'In Stock' },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
