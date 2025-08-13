const Product = require("../../models/product");

exports.deleteProduct = async (req, res,next) => {
  try {
  const { id } = req.params;
    const p = await Product.findByIdAndDelete(id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (e) { next(e); }
};