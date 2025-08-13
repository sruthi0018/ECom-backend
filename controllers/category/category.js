
const Category = require("../../models/category");

exports.createCategory = async (req, res,next) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.status(201).json(category);
  }  catch (e) { next(e); }
};

exports.getCategories = async (req, res,next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (e) { next(e); }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (e) { next(e); }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Deleted' });
  } catch (e) { next(e); }
};