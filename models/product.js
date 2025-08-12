const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, text: true },
  description: { type: String, text: true },
  price: { type: Number, required: true, index: true },
  category:  { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  images: [String],
  stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
