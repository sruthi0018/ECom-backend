const Product = require("../../models/product");
const Order = require('../../models/order')

exports.getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 5 } });
    const totalOrders = await Order.countDocuments();


    const ordersLastWeek = await Order.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    
    const products = await Product.find({}, "title stock").lean(); 

    res.json({
      totalProducts,
      lowStockProducts,
      totalOrders,
      ordersLastWeek,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};