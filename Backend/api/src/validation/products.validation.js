const Joi = require("joi");

const productSchema = Joi.object({
  // image: Joi.string().uri().required().messages({
  //   "string.empty": "Image URL cannot be empty",
  //   "string.uri": "Image must be a valid URL",
  //   "any.required": "Image is required",
  // }),
  image: Joi.string().allow("").optional().messages({
    "string.empty": "Image cannot be empty",
  }),
  product_Name: Joi.string().min(3).max(50).trim().required().messages({
    "string.empty": " Product name cannot be empty",
    "string.min": "Product name  should have at least 3 characters",
    "string.max": "Product name cannot exceed 50 characters",
    "any.required": "Product name is required",
  }),

  // category: Joi.string().min(3).max(30).trim().required().messages({
  //   "string.empty": "Category cannot be empty",
  //   "string.min": "Category should have at least 3 characters",
  //   "string.max": "Category cannot exceed 30 characters",
  //   "any.required": "Category is required",
  // }),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // For MongoDB ObjectId validation
    .required()
    .messages({
      "string.base": "Category ID should be a valid MongoDB Object ID",
      "string.empty": "Category ID cannot be empty",
      "string.pattern.base": "Invalid Category ID",
      "any.required": "Category ID is required",
    }),
  // quantity: Joi.number()
  //   .integer()
  //   .min(1)
  //   .strict() // Ensure only numbers are allowed
  //   .required()
  //   .messages({
  //     "number.base": "Quantity must be a number",
  //     "number.min": "Quantity must be at least 1",
  //     "any.required": "Quantity is required",
  //   }),

  mrp: Joi.number()
    .precision(2)
    .positive()
    .strict() // Ensure only numbers are allowed
    .required()
    .messages({
      "number.base": "MRP must be a number",
      "number.positive": "MRP must be a positive number",
      "any.required": "MRP is required",
    }),

  rate: Joi.number()
    .precision(2)
    .positive()
    .strict() // Ensure only numbers are allowed
    .required()
    .messages({
      "number.base": "Rate must be a number",
      "number.positive": "Rate must be a positive number",
      "any.required": "Rate is required",
    }),
});
module.exports = { productSchema };
