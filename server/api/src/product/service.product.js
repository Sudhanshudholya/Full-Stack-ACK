const Product = require("./model.product");

const productService = {};

productService.addProduct = async (productData) => {
  return await Product.create(productData);
};
// productService.getProduct = async () => {
//   return await Product.find();
// };
productService.getProduct = async (
  filters,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = -1
) => {
  try {
    // Build the query object
    const query = { isDeleted: { $ne: true } };
    if (filters.product_Name) {
      // Use a regular expression for partial matches and case-insensitive search
      query.product_Name = new RegExp(filters.product_Name, "i");
    }
    if (filters.category) {
      query.category = filters.category;
    }
    // if (filters.quantity) {
    //   query.quantity = filters.quantity;
    // }
    if (filters.mrp) {
      query.mrp = filters.mrp;
    }
    if (filters.rate) {
      query.rate = filters.rate;
    }
    // Calculate pagination parameters
    const skip = (page - 1) * limit;
    // Fetch filtered and searched products
    const products = await Product.find(query)
      // .sort({ createAt: -1 })
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .populate("category", "categoryname");

    const totalProducts = await Product.countDocuments(query);
    return {
      products,
      total: totalProducts,
      page,
      pages: Math.ceil(totalProducts / limit),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching products");
  }
};
productService.getSingleProductById = async (productId, updateData) => {
  return await Product.findOneAndUpdate(
    { _id: productId, isDeleted: { $ne: true } },
    updateData,
    {
      new: true,
    }
  ).populate("category", "categoryname");
};
// productService.updateProductDetalis = async (id, updateData) => {
//   return await Product.findOneAndUpdate({ _id: id }, updateData, { new: true });
// };

productService.deleteProduct = async (id, updateFeild) => {
  return await Product.findOneAndUpdate(
    { _id: id },
    { ...updateFeild },
    { new: true }
  );
};
module.exports = productService;
