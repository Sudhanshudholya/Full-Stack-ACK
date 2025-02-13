const productService = require("./service.product");
const categoryService = require("../category/sevice.category");
const productController = {};

// productController.addProduct = async (req, res) => {
//   try {
//     const { image, product_Name, category, quantity, mrp, rate } = req.body;
//     console.log(category, "8");

//     const checkExistCategory = await categoryService.getAllCategory();
//     const categoryData = await categoryService.getCategoryById(category);
//     // Check if category exists
//     console.log(categoryData._id.toString(), "cat");
//     console.log(categoryData, "catggggggg");
//     if (categoryData._id.toString() !== category) {
//       return res.send({
//         status: "Error",
//         msg: "Category not found ",
//         data: null,
//       });
//     }
//     const categoryName = categoryData?.categoryname;
//     // console.log(categoryName, "category");
//     const productData = await productService.addProduct({
//       image,
//       product_Name,
//       category,
//       quantity,
//       mrp,
//       rate,
//     });
//     const responseData = {
//       ...productData.toObject(),
//       category: {
//         _id: category, // The original expenseCategory ID
//         categoryname: categoryName, // The fetched category name
//       },
//     };
//     if (!responseData) {
//       return res.send({
//         status: "Error",
//         msg: "Product not found",
//         data: null,
//       });
//     } else {
//       return res.send({
//         status: "OK",
//         msg: "Product add successfully",
//         data: responseData,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.send({
//       status: "Error",
//       msg: "Somethig went wrong",
//       data: null,
//     });
//   }
// };
productController.addProduct = async (req, res) => {
  try {
    const { image, product_Name, category, mrp, rate } = req.body;
    console.log(category, "8");

    // Fetch all categories (if necessary for other logic)
    // const checkExistCategory = await categoryService.getAllCategory();

    // Fetch the specific category by ID
    const categoryData = await categoryService.getCategoryById(category);

    // Check if the category exists
    // if (!categoryData) {
    //   return res.send({
    //     status: "Error",
    //     msg: "Category not found",
    //     data: null,
    //   });
    // }

    // // Category exists, now check if the IDs match
    // console.log(categoryData._id.toString(), "cat");
    // if (categoryData._id.toString() !== category) {
    //   return res.send({
    //     status: "Error",
    //     msg: "Category ID mismatch",
    //     data: null,
    //   });
    // }

    const categoryName = categoryData.categoryname;

    // Add the product
    const productData = await productService.addProduct({
      image,
      product_Name,
      category,
      // quantity,
      mrp,
      rate,
    });

    // Prepare the response
    const responseData = {
      ...productData.toObject(),
      category: {
        _id: category, // The original category ID
        categoryname: categoryName, // The fetched category name
      },
    };

    // Return success response
    return res.send({
      status: "OK",
      msg: "Product added successfully",
      data: responseData,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

productController.getproduct = async (req, res) => {
  try {
    // Extract filters from query parameters
    const {
      product_Name,
      category,
      // quantity,
      mrp,
      rate,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = -1,
    } = req.query;

    // Prepare filter object
    const filters = {};
    if (product_Name) filters.product_Name = product_Name;
    if (category) filters.category = category;
    // if (quantity) filters.quantity = parseInt(quantity, 10);
    if (mrp) filters.mrp = parseFloat(mrp);
    if (rate) filters.rate = parseFloat(rate);
    const { products, total, pages } = await productService.getProduct(
      filters,
      parseInt(page, 20),
      parseInt(limit, 20),
      sortBy,
      parseInt(order, 20)
    );
    const formattedProducts = products.map((product) => ({
      ...product.toObject(), // Convert mongoose object to plain object
      category: product?.category?.categoryname,
      createdAt: convertDateTime(product.createdAt), // Format createdAt
      updatedAt: convertDateTime(product.updatedAt),
    }));

    if (!formattedProducts.length) {
      return res.send({
        status: "Error",
        msg: "Product not found",
        data: [],
      });
    } else {
      return res.send({
        status: "OK",
        msg: "Product details retrived successfully",
        length: formattedProducts.length,
        data: formattedProducts,
        pagination: {
          total,
          page: parseInt(page, 10),
          pages,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Somethig went wrong",
      data: null,
    });
  }
};
productController.getSingleProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const getSingleProductData = await productService.getSingleProductById(
      productId
    );
    if (!getSingleProductData) {
      return res.send({
        status: "Error",
        msg: "Product not found",
        data: "null",
      });
    }
    const formattedProductData = {
      ...getSingleProductData.toObject(),
      category: getSingleProductData.category.categoryname, // Only categoryname
    };
    return res.send({
      status: "OK",
      msg: "Product retrived successfully ",
      data: formattedProductData,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};
const convertDateTime = (timestamp) => {
  const date = new Date(timestamp);

  // Date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  // Time in 12-hour format
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format, replace 0 with 12

  return `${day}-${month}-${year} ${String(hours).padStart(
    2,
    "0"
  )}:${minutes}:${seconds}${ampm}`;
};

productController.updateProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const { image, product_Name, category, mrp, rate } = req.body;

    const updateData = await productService.getSingleProductById(
      { _id: productId },
      { image, product_Name, category, mrp, rate },
      { new: true }
    );

    if (!updateData) {
      return res.send({
        status: "Erorr",
        msg: "Product not found",
        data: null,
      });
    } else {
      return res.send({
        status: "Ok",
        msg: "Product updated successfully",
        data: updateData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Somethig went wrong",
      data: null,
    });
  }
};
productController.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDataDelete = await productService.deleteProduct(id, {
      $set: { isDeleted: true },
    });
    if (!productDataDelete) {
      return res.send({
        status: "Erorr",
        msg: "Product not found",
      });
    }
    return res.send({
      status: "Ok",
      msg: "Product delete successfully",
      data: productDataDelete,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Something went wrong",
    });
  }
};
module.exports = productController;
