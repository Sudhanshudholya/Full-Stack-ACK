const productController = require("./controller.product");
const validate = require("../../middleWare/validation");
const { productSchema } = require("../validation/products.validation");
// const
const middleWare = require("../../middleWare/authToken");
const { upload, handleMulterError } = require("../../middleWare/upload");
const router = require("express").Router();

router.post(
  "/addProduct",
  middleWare,
  validate(productSchema),
  productController.addProduct
);
router.get("/getproduct", middleWare, productController.getproduct);
router.get(
  "/getSingleProduct/:productId",
  middleWare,
  productController.getSingleProductById
);
// router.put(
//   "/updateProduct/:id",
//   middleWare,
//   validate(productSchema),
//   productController.updateProductDetails
// );
router.put(
  "/updateProduct/:productId",
  middleWare,
  validate(productSchema),
  productController.updateProductDetails
);
router.delete(
  "/deleteProduct/:id",
  middleWare,
  productController.deleteProduct
);
module.exports = router;
