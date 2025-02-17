const payBillController =require('./controller.payBill')
const validate = require("../../middleWare/validation");
// const categorySchema = require("../validation/category.validation");
const router = require("express").Router();
const middleWare = require("../../middleWare/authToken");
router.post("/paybill/:invoiceId", payBillController.payBill);

module.exports = router;
