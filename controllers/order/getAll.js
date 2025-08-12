const order = require("../../models/order");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await order.find().sort({ createdAt: -1 }).populate('user','name email').populate('items.product');
    res.json(orders);
  } catch (err) { next(err); }
};