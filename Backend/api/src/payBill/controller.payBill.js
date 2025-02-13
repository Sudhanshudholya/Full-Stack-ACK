const payBillService = require("./service.payBill");

const payBillController = {};

payBillController.payBill = async (req, res) => {
  try {
    // Destructure necessary fields from the request body and params
    const { amountPaid } = req.body; // Amount paid by the customer
    const { invoiceId } = req.params; // Invoice ID from URL params

    // Validate required fields
    if (!amountPaid || !invoiceId) {
      return res.status(400).send({
        status: false,
        msg: "InvoiceId and amountPaid are required",
        data: null,
      });
    }

    // Prepare payment data to be passed to the service
    const paymentData = {
      amountPaid, // Amount paid by the customer
      invoiceId, // Invoice ID to which payment is being added
    };

    // Call the service method to process the payment and update the invoice
    const payment = await payBillService.addPayment(paymentData);

    // Return a success response
    return res.status(200).send({
      status: true,
      msg: "Payment added and invoice updated successfully",
      data: payment,
    });
  } catch (error) {
    console.log(error, "error");
    // Return error response with proper error message
    return res.status(500).send({
      status: false,
      msg: error.message || "Something went wrong while processing the payment",
      data: null,
    });
  }
};

module.exports = payBillController;
