const PayBillModel = require("./model.payBill");
const Invoice = require("../invoice/model.invoice");

const payBillService = {};

payBillService.addPayment = async (payBillData) => {
  const invoice = await Invoice.findById(payBillData.invoiceId);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  const dueAmount = invoice.totalAmount - invoice.paidAmount;

  if (payBillData.amountPaid > dueAmount) {
    throw new Error("Payment amount exceeds due amount");
  }

  const updatedPaidAmount = invoice.paidAmount + payBillData.amountPaid;
  const updatedDueAmount = dueAmount - payBillData.amountPaid;

  invoice.paidAmount = updatedPaidAmount;
  invoice.dueAmount = updatedDueAmount;

  if (invoice.dueAmount === 0) {
    invoice.status = "Paid";
  }

  await invoice.save();

  const payment = await PayBillModel.create({
    invoiceId: payBillData.invoiceId,
    amountPaid: payBillData.amountPaid,
    payBill: invoice.totalAmount,
  });

  return payment;
};

module.exports = payBillService;
