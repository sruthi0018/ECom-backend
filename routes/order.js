const express = require('express');
const { auth, adminOnly } = require('../middleware/auth');
const { createOrder } = require('../controllers/order/create');
const { getMyOrders } = require('../controllers/order/myOrder');
const { getAllOrders } = require('../controllers/order/getAll');
const { updateOrderStatus } = require('../controllers/order/update');
const router = express.Router();

router.post('/', auth, createOrder);
router.get('/my', auth, getMyOrders);

router.get('/', auth, adminOnly, getAllOrders);
router.put('/:id/status', auth, adminOnly, updateOrderStatus);

module.exports = router;
