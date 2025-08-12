const Product = require("../../models/product");

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (typeof updates.variants === 'string') updates.variants = JSON.parse(updates.variants);

    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(file => `/uploads/products/${file.filename}`);
    }
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};