const router = require("express").Router();
const usersController = require("./controller.users");
const midlleWare = require("../../middleWare/authToken");
const validate = require("../../middleWare/validation");
const { userSchema } = require("../validation/users.validation");
router.post(
  "/addUser",
  midlleWare,
  validate(userSchema),
  usersController.addUser
);
router.get("/getAllUsers", midlleWare, usersController.getUsers);
router.put(
  "/updateUserDetails/:id",
  midlleWare,
  validate(userSchema),
  usersController.updateUserDetails
);
router.delete("/deleteUser/:id", midlleWare, usersController.deleteUser);
//this for only user
router.get("/getUserById/:id", midlleWare, usersController.getUserById);
module.exports = router;
