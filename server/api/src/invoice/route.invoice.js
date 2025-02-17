const router = require("express").Router();
const invoiceController = require("./controller.invoice");
const validate = require("../../middleWare/validation");
const invoiceValidationSchema = require("../validation/invoice.validation");
const middleWare = require("../../middleWare/authToken");
router.post(
  "/createInvoice",
  middleWare,
  validate(invoiceValidationSchema),
  invoiceController.addInvoice
);
router.get("/getAllInvoice", middleWare, invoiceController.getAllInvoice);
router.get(
  "/getSingleInvoice/:InvoiceId",
  middleWare,
  invoiceController.getSingleInvoice
);
module.exports = router;
