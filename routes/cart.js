const { addToCart, getCart, removeFromCart, updateCartQty, clearCart }= require("../controllers/cart/cart");
const { auth } =require("../middleware/auth");
const express = require('express');
const router = express.Router();


router.get("/", auth, getCart);

router.post("/add", auth, addToCart);
router.delete("/clear", auth, clearCart);

router.delete("/remove/:productId", auth, removeFromCart);

router.put("/update", auth, updateCartQty);

module.exports = router;

