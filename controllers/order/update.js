const Order = require("../../models/order");

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (req.app && req.app.locals.io) req.app.locals.io.emit('orderUpdated', order);
    res.json(order);
  } catch (err) { next(err); }
}