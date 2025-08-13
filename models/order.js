const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: String,
  price: Number,
  quantity: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
   shippingAddress: { type: String, required: true },
  status: { type: String, enum: ['placed','processing','shipped','delivered','cancelled'], default: 'placed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
