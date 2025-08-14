const Product = require("../../models/product");
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/products/${file.filename}`);
      updates.images = [...(product.images || []), ...newImages];
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

   req.io?.emit('stock:change', { 
  productId: updatedProduct._id, 
  title: updatedProduct.title,
  stock: updatedProduct.stock 
});

    res.json({ message: 'Product updated', product: updatedProduct });
  } catch (e) {
    next(e);
  }
};
