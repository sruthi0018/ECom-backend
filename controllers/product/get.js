const product = require("../../models/product");


exports.getProducts = async (req, res, next) => {
  try {
    const { search,catId, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.title = new RegExp(search, "i");
    }

     if (catId) {
      const idsArray = catId.split(',');
      query.category = { $in: idsArray };
    }


    const total = await product.countDocuments(query);
   const products = await product.find(query)
      .populate("category", "name") 
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({ products, total });
  }catch (e) { next(e); }
};
