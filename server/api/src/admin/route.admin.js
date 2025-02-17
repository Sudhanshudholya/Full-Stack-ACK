const router=require("express").Router()
const adminController = require("./controller.admin")

router.post("/adminCreate",adminController.adminCreate)
router.post("/adminLogin",adminController.adminLogin)
module.exports=router