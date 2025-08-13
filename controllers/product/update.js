const Product = require("../../models/product");

exports.updateProduct = async (req, res,next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (typeof updates.variants === 'string') updates.variants = JSON.parse(updates.variants);

    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(file => `/uploads/products/${file.filename}`);
    }
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!p) return res.status(404).json({ message: 'Product not found' });

    req.io?.emit('stock:change', { productId: p._id, stock: p.stock });
    res.json({ message: 'Product updated', product });
  } catch (e) { next(e); }
};