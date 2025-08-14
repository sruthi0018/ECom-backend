
const { getDashboardStats } = require("../controllers/dashboard/overview");
const { auth } =require("../middleware/auth");
const express = require('express');
const router = express.Router();


router.get("/", getDashboardStats);


module.exports = router;

