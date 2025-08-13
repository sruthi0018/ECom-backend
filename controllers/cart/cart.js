const Cart = require("../../models/cart");
const Product = require("../../models/product");


exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    const items = cart
      ? cart.items.map(i => ({
          productId: i.product._id,
          title: i.product.title,
          price: i.product.price,
          image: i.product.images[0],
          quantity: i.quantity
        }))
      : [];

    res.json({ items });
  } catch (e) {
    next(e);
  }
};

// --------------------
// Add to Cart
// --------------------
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existing = cart.items.find(i => i.product.toString() === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart" });
  } catch (e) {
    next(e);
  }
};

// --------------------
// Update Cart Quantity
// --------------------
exports.updateCartQty = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) return res.json({ items: [] });

    const item = cart.items.find(i => i.product._id.toString() === productId);
    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    const items = cart.items.map(i => ({
      productId: i.product._id,
      title: i.product.title,
      price: i.product.price,
      image: i.product.images[0],
      quantity: i.quantity
    }));

    res.status(200).json({ items });
  } catch (e) {
    next(e);
  }
};

// --------------------
// Remove from Cart
// --------------------
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(i => i.product._id.toString() !== productId);
    await cart.save();
    await cart.populate("items.product");

    const items = cart.items.map(i => ({
      productId: i.product._id,
      title: i.product.title,
      price: i.product.price,
      image: i.product.images[0],
      quantity: i.quantity
    }));

    res.status(200).json({ items });
  } catch (e) {
    next(e);
  }
};


