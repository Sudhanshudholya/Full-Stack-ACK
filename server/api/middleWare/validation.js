// , { abortEarly: false }  ye req.body ke bad tha
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.send({
      status: "ERR",
      msg: error.details.map((detail) => detail.message).join(", "),
      data: null,
    });
  }
  next();
};

module.exports = validate;
