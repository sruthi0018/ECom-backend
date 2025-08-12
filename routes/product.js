// routes/products.js
const express = require('express');
const upload = require('../middleware/upload');
const { adminOnly,auth } = require('../middleware/auth');
const { getProducts } = require('../controllers/product/get');
const { createProduct } = require('../controllers/product/create');
const { updateProduct } = require('../controllers/product/update');
const { getProductById } = require('../controllers/product/getById');
const { deleteProduct } = require('../controllers/product/delete');

const router = express.Router();

router.get('/',getProducts);
router.get('/:id',getProductById);

router.post('/', auth, adminOnly, upload.array('images', 5), createProduct);
router.put('/:id', auth, adminOnly, upload.array('images', 5), updateProduct);
router.delete('/:id', auth, adminOnly, deleteProduct);

module.exports = router;
