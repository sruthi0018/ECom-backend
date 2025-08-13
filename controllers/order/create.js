const Order = require("../../models/order");
const product = require("../../models/product");

exports.createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'No items' });

    // validate stock + compute total
    let total = 0;
    for (const it of items) {
      const p = await product.findById(it.product);
      if (!p) return res.status(400).json({ message: `Invalid product ${it.product}` });
      if (p.stock < it.quantity)
        return res.status(400).json({ message: `Insufficient stock for ${p.title}` });
      total += (it.price ?? p.price) * it.quantity;
    }

    // decrement stock
    for (const it of items) {
      await product``.findByIdAndUpdate(it.product, { $inc: { stock: -it.quantity } });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice: total,
      shippingAddress,
      status: 'placed'
    });

    // real-time: notify new order and stock changes
    req.io?.emit('order:new', { orderId: order._id, userId: req.user._id });
    // low stock notifications
    for (const it of items) {
      const p = await product.findById(it.product);
      req.io?.emit('stock:change', { productId: p._id, stock: p.stock });
      if (p.stock <= 5) {
        req.io?.emit('stock:low', { productId: p._id, stock: p.stock });
      }
    }

    res.status(201).json(order);
  } catch (e) { next(e); }
};
