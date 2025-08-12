const express = require("express");
const { createCategory, getCategories } = require("../controllers/category/category");


const router = express.Router();


router.post('/', createCategory);
router.get('/',getCategories)


module.exports = router;
