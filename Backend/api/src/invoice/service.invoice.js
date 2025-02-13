const Invoice = require("./model.invoice");
const InvoiceNumber = require("./invoiceNumber.model");
const invoiceService = {};
const generateNextInvoiceNumber = async () => {
  let invoiceNumberDoc = await InvoiceNumber.findOne();

  if (!invoiceNumberDoc) {
    invoiceNumberDoc = new InvoiceNumber({ currentInvoiceNo: 1 });
  } else {
    invoiceNumberDoc.currentInvoiceNo += 1;
  }
  // Save the updated invoice number
  await invoiceNumberDoc.save();
  return `INV${invoiceNumberDoc.currentInvoiceNo}`;
};

invoiceService.addInvoice = async (invoiceData) => {
  const invoiceNo = await generateNextInvoiceNumber();

  invoiceData.invoiceNo = invoiceNo;

  return await Invoice.create(invoiceData);
};

invoiceService.getInvoice = async () => {
  return await Invoice.find({}).sort({});
};
invoiceService.getSingleInvoice=async (InvoiceId) => {
  return await Invoice.findById(InvoiceId)
}

module.exports = invoiceService;
