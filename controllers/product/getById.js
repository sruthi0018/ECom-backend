
const Product = require('../../models/product');

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
    .populate("category", "name")
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
