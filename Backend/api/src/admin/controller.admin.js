// const { hash } = require("bcryptjs");
const adminService = require("./service.admin");

const adminController = {};
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
adminController.adminCreate = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.send({
        status: "Erorr",
        msg: "Username and Password are required",
        data: null,
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    const adminData = await adminService.adminCreate({
      username,
      password: hash,
    });
    res.send({
      status: "OK",
      msg: "Admin Created Successfully",
      data: adminData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};
adminController.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.send({
        status: "Error",
        msg: "Username and Password are required",
        data: null,
      });
    }

    const adminLoginData = await adminService.getAdminByUserNameAndPassword({
      username,
    });

    if (adminLoginData.length > 0 && adminLoginData[0].username === username) {
      const { password: hash } = adminLoginData[0];

      const isMatch = bcrypt.compareSync(password, hash);
      if (isMatch) {
        let token = Jwt.sign(
          { _id: adminLoginData[0]?._id },
          process.env.TOKEN_SECRET
        );
        console.log(token);

        return res.send({
          status: "OK",
          msg: "Admin Login Successfully",
          data: {
            token: token,
            adminId: adminLoginData[0]?._id,
            name: adminLoginData[0].username,
          },
        });
      } else {
        // Password is incorrect
        return res.send({
          status: "Error",
          msg: "Invalid Username and Password",
        });
      }
    } else {
      // User not found
      return res.send({
        status: "Error",
        msg: "Access restricted to admin only",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error", // Fix typo
      msg: "Something went wrong",
      data: null,
    });
  }
};

module.exports = adminController;
