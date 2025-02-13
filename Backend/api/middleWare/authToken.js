const Jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .send({ status: "Err", msg: "No token provided", data: null });
  }
  try {
    const tokenData = Jwt.verify(token, process.env.TOKEN_SECRET);
    req._id = tokenData._id;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      status: "Erorr",
      msg: "Unauthorised access",
    });
  }
};
