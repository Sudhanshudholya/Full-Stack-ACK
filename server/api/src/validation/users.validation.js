const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string()
    .trim()
    .email()
    .pattern(/^[^\s@]+@[^\s@]+\.com$/)
    .required()
    .messages({
      "string.empty": "Email cannot be empty.",
      "string.email": "Email must be a valid email address.",
      "string.pattern.base": "Email must end with .com",
    }),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{10,}$/)
    .required()
    .messages({
      "string.empty": "Contact number is required",
      "string.pattern.base":
        "Contact number must be numeric and at least 10 digits",
    }),

  role: Joi.string().valid("dealer", "contractor").required().messages({
    "any.only": "Role must be either dealer or contractor",
    "string.empty": "Role is required",
  }),
});

module.exports = { userSchema };
