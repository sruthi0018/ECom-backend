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
      query.catId = { $in: idsArray };
    }


    const total = await product.countDocuments(query);
   const products = await product.find(query)
      .populate("category", "name") 
      .limit(parseInt(limit));

    res.json({ products, total });
  }catch (e) { next(e); }
};
