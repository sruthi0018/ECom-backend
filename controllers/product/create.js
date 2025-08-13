const Product = require("../../models/product");

exports.createProduct = async (req, res,next) => {
  try {
    const data = req.body;

    console.log("Files uploaded:", req.files);
    console.log("Body:", req.body);

    if (typeof data.variants === "string") {
      data.variants = JSON.parse(data.variants);
    }

    if (req.files && req.files.length > 0) {
      data.images = req.files.map(
        (file) => `/uploads/products/${file.filename}`
      );
    }

 const product = await Product.create({
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category, 
      images: data.images || [],
      stock: data.stock ?? 0
    });
    // emit stock change
    req.io?.emit('stock:change', { productId: product._id, stock: product.stock });
    console.log("Created Product:", product);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (e) { next(e); }
};
