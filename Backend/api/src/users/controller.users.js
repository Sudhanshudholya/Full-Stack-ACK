const usersService = require("./service.users");

const usersController = {};

usersController.addUser = async (req, res) => {
  try {
    const { name, email, contactNumber, role } = req.body;
    const userUxist = await usersService.getExistCustomer(email);

    // const userUxist = await usersService.getUsers(email);
    if (userUxist && !userUxist.isDeleted) {
      return res.send({
        status: "error",
        msg: "email already exist",
        data: null,
      });
    }
    const usrsData = await usersService.addUsers({
      name,
      email,
      contactNumber,
      role,
    });

    return res.send({
      status: "OK",
      msg: "User add successfully ",
      data: usrsData,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: "null",
    });
  }
};
usersController.getUsers = async (req, res) => {
  try {
    const { name, role, page = 1, limit } = req.query;
    const parsedPage = Number(page);
    let parsedLimit = limit ? Number(limit) : 10;
    if (parsedLimit > 50) parsedLimit = 50;
    const filters = {};
    if (name) filters.name = name;
    if (role) filters.role = role;
    const totalUsers = await usersService.getUsersCount(filters);
    const getUsersData = await usersService.getAllUsers(
      filters,
      parsedPage,
      parsedLimit
    );
    if (!getUsersData.length) {
      return res.send({
        status: "Error",
        msg: "Users not found",
        data: "null",
      });
    }
    return res.send({
      status: "OK",
      msg: "Users retrived successfully ",
      length: getUsersData.length,
      total: totalUsers,
      page: parsedPage,
      limit: parsedLimit,
      data: getUsersData,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: "null",
    });
  }
};
usersController.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserDataById = await usersService.getUserById(id);
    console.log(getUserDataById);
    if (!getUserDataById) {
      return res.send({
        status: "Error",
        msg: "User not found",
        data: "null",
      });
    }
    return res.send({
      status: "OK",
      msg: "User data received  successfully ",
      data: getUserDataById,
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
usersController.updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contactNumber, role } = req.body;
    const updateUserDetails = await usersService.getUserById(
      { _id: id },
      { name, email, contactNumber, role },
      { new: true }
    );
    if (!updateUserDetails) {
      return res.send({
        status: "Error",
        msg: "User not found",
        data: null,
      });
    } else {
      return res.send({
        status: "OK",
        msg: "User update successfully",
        data: updateUserDetails,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: "null",
    });
  }
};
usersController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await usersService.deleteUserData(id, {
      $set: { isDeleted: true },
    });
    if (deletedData) {
      return res.send({
        status: "OK",
        msg: "User data deleted successfully",
        data: deletedData,
      });
    } else {
      return res.send({
        status: "Err",
        msg: "Users not found",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: "null",
    });
  }
};
module.exports = usersController;
