const Joi = require("joi");
const moment = require("moment");

const invoiceValidationSchema = Joi.object({
  // invoiceNo: Joi.string().required().messages({
  //   'any.required': 'Invoice number is required'
  // }),
  // date: Joi.date().required().messages({
  //   'any.required': 'Date is required'
  // }),
  date: Joi.string()
    .trim()
    .regex(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .custom((value, helpers) => {
      const date = moment(value, "DD-MM-YYYY", true); // Validate the date format strictly
      if (!date.isValid()) {
        return helpers.message("Date must be in DD-MM-YYYY format.");
      }
      if (date.isAfter(moment(), "day")) {
        return helpers.message("Date cannot be in the future.");
      }
      return value;
    })
    .messages({
      "string.empty": "Date cannot be empty.",
      "string.pattern.base": "Date must be in DD-MM-YYYY format.",
    }),

  customerId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": "Customer ID should be a valid MongoDB Object ID",
      "string.empty": "Customer ID cannot be empty",
      "string.pattern.base": "Invalid Customer ID ",
      "any.required": "Customer ID is required",
    }),
  // products: Joi.array()
  //   .items(
  //     Joi.object({
  //       productId: Joi.string()
  //         .trim()
  //         .required()
  //         .empty() // This ensures that an empty string is treated as invalid
  //         .messages({
  //           "any.required": "Product ID is required",
  //           "string.empty": "Product ID cannot be empty", // Handles empty string case
  //         }),
  //       quantity: Joi.number().min(1).required().messages({
  //         "number.base": "Quantity must be a number",
  //         "number.min": "Quantity must be at least 1",
  //         "any.required": "Quantity is required",
  //       }),
  //     })
  //   )
  // .required()
  // .messages({
  //   "array.base": "Products must be an array",
  //   "any.required": "Products array is required",
  // }),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/) // Regex for MongoDB ObjectId validation
          .required()
          .messages({
            "string.base": "Product ID should be a valid MongoDB Object ID",
            "string.empty": "Product ID cannot be empty",
            "string.pattern.base": "Invalid Product ID ",
            "any.required": "Product ID is required",
          }),
        quantity: Joi.number().min(1).required().messages({
          "number.base": "Quantity must be a number",
          "number.min": "Quantity must be at least 1",
          "any.required": "Quantity is required",
        }),
      })
    )
    .required()
    .messages({
      "array.base": "Products must be an array",
      "array.includesRequiredUnknowns":
        "Each product must include a productId and quantity",
      "any.required": "Products are required",
    }),
  amountPaid: Joi.number().min(0).required().messages({
    "number.base": "Amount paid must be a number",
    "number.min": "Amount paid cannot be negative",
    "any.required": "Amount paid is required",
  }),
});

module.exports = invoiceValidationSchema;
