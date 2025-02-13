const Users = require("./model.users");
const usersService = {};
usersService.addUsers = async (userData) => {
  return await Users.create(userData);
};
usersService.getUsers = async (email) => {
  return await Users.find({ email });
};
usersService.getAllUsers = async (filters, page, limit) => {
  try {
    const query = { isDeleted: false };

    if (filters.name) {
      query.name = new RegExp(filters.name, "i");
    }
    if (filters.role) {
      query.role = filters.role;
    }

    const skip = (page - 1) * limit;

    return await Users.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to retrieve users");
  }
};
usersService.getUsersCount = async (filters) => {
  try {
    const query = { isDeleted: false };

    if (filters.name) {
      query.name = new RegExp(filters.name, "i");
    }
    if (filters.role) {
      query.role = filters.role;
    }

    return await Users.countDocuments(query); // Use countDocuments for accurate counts
  } catch (error) {
    console.log(error);
    throw new Error("Failed to count users");
  }
};
usersService.getExistCustomer = async (email) => {
  return await Users.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
    isDeleted: { $ne: true },
  });
};
usersService.getUserById = async (id, updateData) => {
  return await Users.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
};
usersService.deleteUserData = async (id, updateDeleteData) => {
  return await Users.findByIdAndUpdate(
    { _id: id },
    { ...updateDeleteData },
    { new: true }
  );
};
module.exports = usersService;
