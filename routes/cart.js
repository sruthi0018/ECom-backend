const { addToCart, getCart, removeFromCart, updateCartQty }= require("../controllers/cart/cart");
const { auth } =require("../middleware/auth");
const express = require('express');
const router = express.Router();


router.get("/", auth, getCart);

router.post("/add", auth, addToCart);

router.delete("/remove/:productId", auth, removeFromCart);

router.put("/update", auth, updateCartQty);

module.exports = router;

