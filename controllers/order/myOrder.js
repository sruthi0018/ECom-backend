const order = require("../../models/order");

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('items.product');
    res.json(orders);
  } catch (err) { next(err); }
};
