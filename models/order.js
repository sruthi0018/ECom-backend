const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalPrice: Number,
  status: { type: String, enum: ['placed','processing','shipped','delivered','cancelled'], default: 'placed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
