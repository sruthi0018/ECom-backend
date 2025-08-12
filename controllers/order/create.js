const Order = require("../../models/order");
const product = require("../../models/product");


exports.createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: 'No items' });

    let total = 0;
    const built = [];
    for (const it of items) {
      const p = await product.findById(it.productId);
      if (!p) return res.status(404).json({ message: 'Product not found' });
      if (p.stock < it.quantity) return res.status(400).json({ message: `Insufficient stock ${p.title}`});
      built.push({ product: p._id, name: p.title, price: p.price, quantity: it.quantity });
      total += p.price * it.quantity;
    }

    for (const it of items) {
      await product.findByIdAndUpdate(it.productId, { $inc: { stock: -it.quantity } });
    }

    const order = await Order.create({ user: req.user._id, items: built, totalPrice: total });
    if (req.app && req.app.locals.io) req.app.locals.io.emit('newOrder', order);
    res.status(201).json(order);
  } catch (err) { next(err); }
};