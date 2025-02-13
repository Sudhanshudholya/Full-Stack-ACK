const invoiceService = require("./service.invoice");
const invoiceController = {};
const customerService = require("../users/service.users");
const productservice = require("../product/service.product");
// invoiceController.addInvoice = async (req, res) => {
//   try {
//     const { date, invoiceNo, customerId, products, amountPaid } = req.body;
//     const customerData = await customerService.getUserById(customerId);

//     const productDataArray = await Promise.all(
//       products.map(async (product) => {
//         const productData = await productservice.getSingleProductById(
//           product.productId
//         );
//         return productData;
//       })
//     );
//     const customerName = customerData?.name;
//     const invoiceData = await invoiceService.addInvoice({
//       date,
//       invoiceNo,
//       customerId,
//       products,
//       amountPaid,
//     });
//     const responseData = {
//       ...invoiceData.toObject(),
//       customerId: {
//         _id: customerId,
//         name: customerName,
//       },
//       products: productDataArray,
//     };
//     res.send({
//       status: "OK",
//       msg: "Invoice added successfully",
//       data: responseData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       status: "OK",
//       msg: "Something went wrong",
//       data: null,
//     });
//   }
// };
invoiceController.addInvoice = async (req, res) => {
  try {
    const { date, invoiceNo, customerId, products, amountPaid } = req.body;
    const customerData = await customerService.getUserById(customerId);

    // Fetch product data and calculate total amount
    const productDataArray = await Promise.all(
      products.map(async (product) => {
        const productData = await productservice.getSingleProductById(
          product.productId
        );
        return productData;
      })
    );

    // Calculate total amount from products
    const totalAmount = productDataArray.reduce((acc, product, index) => {
      return acc + productDataArray[index].rate * products[index].quantity;
    }, 0);

    // Calculate due amount
    const dueAmount = totalAmount - amountPaid;

    // Check if dueAmount is valid
    if (dueAmount < 0) {
      return res.status(400).send({
        status: "Error",
        msg: "Due amount cannot exceed total amount.",
        data: null,
      });
    }

    const customerName = customerData?.name;
    const invoiceData = await invoiceService.addInvoice({
      date,
      invoiceNo,
      customerId,
      products,
      amountPaid,
    });

    const responseData = {
      ...invoiceData.toObject(),
      customerId: {
        _id: customerId,
        name: customerName,
      },
      products: productDataArray,
      totalAmount: totalAmount, // Include total amount in the response
      dueAmount: dueAmount, // Include due amount in the response
    };

    res.send({
      status: "OK",
      msg: "Invoice added successfully",
      data: responseData,
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

invoiceController.getAllInvoice = async (req, res) => {
  try {
    const invoices = await invoiceService.getInvoice();

    if (!invoices.length) {
      return res.status(404).send({
        status: "Error",
        msg: "No invoices found",
        data: [],
      });
    }

    // Fetch customer and product data for each invoice
    const invoiceDetails = await Promise.all(
      invoices.map(async (invoice) => {
        // Fetch customer data, handle potential errors
        let customerData = {};
        try {
          customerData = await customerService.getUserById(invoice.customerId);
        } catch (err) {
          console.warn(`Customer fetch failed for ID: ${invoice.customerId}`);
        }

        // Fetch products with additional product details
        const productDataArray = await Promise.all(
          invoice.products.map(async (product) => {
            let productData = {};
            try {
              productData = await productservice.getSingleProductById(
                product.productId
              );
            } catch (err) {
              console.warn(`Product fetch failed for ID: ${product.productId}`);
            }

            // Return product with its additional data
            return {
              productId: product.productId,
              quantity: product.quantity,
              productData: {
                _id: productData._id,
                productName: productData.product_Name || "Unknown Product",
                category: productData.category
                  ? productData.category.categoryname
                  : "Unknown Category",
                mrp: productData.mrp || 0,
                rate: productData.rate || 0,
              },
            };
          })
        );

        // Calculate total amount from products
        const totalAmount = productDataArray.reduce((acc, product) => {
          return acc + product.productData.rate * product.quantity;
        }, 0);

        // Calculate due amount
        const dueAmount = totalAmount - invoice.amountPaid;
        const status = dueAmount > 0 ? "Pending" : "Paid";
        // Return structured invoice data
        return {
          _id: invoice._id,
          date: invoice.date,
          invoiceNo: invoice.invoiceNo,
          customer: {
            _id: invoice.customerId,
            name: customerData ? customerData.name : "Unknown Customer",
          },
          products: productDataArray,
          amountPaid: invoice.amountPaid,
          totalAmount: totalAmount, // Add total amount to the response
          dueAmount: dueAmount,
          status: status, // Add due amount to the response
          createdAt: invoice.createdAt,
          updatedAt: invoice.updatedAt,
        };
      })
    );

    res.send({
      status: "OK",
      msg: "Invoices retrieved successfully",
      length: invoiceDetails.length,
      data: invoiceDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Error",
      msg: error.message || "Something went wrong",
      data: null,
    });
  }
};

// invoiceController.getAllInvoice = async (req, res) => {
//   try {
//     const invoices = await invoiceService.getInvoice();

//     if (!invoices.length) {
//       return res.status(404).send({
//         status: "Error",
//         msg: "No invoices found",
//         data: [],
//       });
//     }

//     // Fetch customer and product data for each invoice
//     const invoiceDetails = await Promise.all(
//       invoices.map(async (invoice) => {
//         // Fetch customer data, handle potential errors
//         let customerData = {};
//         try {
//           customerData = await customerService.getUserById(invoice.customerId);
//         } catch (err) {
//           console.warn(`Customer fetch failed for ID: ${invoice.customerId}`);
//         }

//         // Fetch products with additional product details
//         const productDataArray = await Promise.all(
//           invoice.products.map(async (product) => {
//             let productData = {};
//             try {
//               productData = await productservice.getSingleProductById(
//                 product.productId
//               );
//             } catch (err) {
//               console.warn(`Product fetch failed for ID: ${product.productId}`);
//             }

//             // Return product with its additional data
//             return {
//               productId: product.productId,
//               quantity: product.quantity,
//               productData: {
//                 _id: productData._id,
//                 productName: productData.product_Name || "Unknown Product",
//                 category: productData.category
//                   ? productData.category.categoryname
//                   : "Unknown Category",
//                 mrp: productData.mrp || 0,
//                 rate: productData.rate || 0,
//               },
//             };
//           })
//         );

//         // Return structured invoice data
//         return {
//           _id: invoice._id,
//           date: invoice.date,
//           invoiceNo: invoice.invoiceNo,
//           customer: {
//             _id: invoice.customerId,
//             name: customerData ? customerData.name : "Unknown Customer",
//           },
//           products: productDataArray,
//           amountPaid: invoice.amountPaid,
//           createdAt: invoice.createdAt,
//           updatedAt: invoice.updatedAt,
//         };
//       })
//     );

//     res.send({
//       status: "OK",
//       msg: "Invoices retrieved successfully",
//       length: invoiceDetails.length,
//       data: invoiceDetails,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       status: "Error",
//       msg: error.message || "Something went wrong",
//       data: null,
//     });
//   }
// };
// invoiceController.getSingleInvoice = async (req, res) => {
//   try {
//     const { InvoiceId } = req?.params
//     console.log(InvoiceId)
//     const getSingleData = await invoiceService.getSingleInvoice(InvoiceId);

//     return res.send({
//       status: "OK",
//       msg: "Invoice recieved successfully",
//       data: getSingleData,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send({
//       status: "Error",
//       msg: error.message || "Something went wrong",
//       data: null,
//     });
//   }
// };
invoiceController.getSingleInvoice = async (req, res) => {
  try {
    const { InvoiceId } = req.params;

    // Fetch the invoice by ID
    const invoice = await invoiceService.getSingleInvoice(InvoiceId);

    if (!invoice) {
      return res.status(404).send({
        status: "Error",
        msg: "Invoice not found",
        data: null,
      });
    }

    // Fetch customer data, handle potential errors
    let customerData = {};
    try {
      customerData = await customerService.getUserById(invoice.customerId);
    } catch (err) {
      console.warn(`Customer fetch failed for ID: ${invoice.customerId}`);
    }

    // Fetch products with additional product details
    const productDataArray = await Promise.all(
      invoice.products.map(async (product) => {
        let productData = {};
        try {
          productData = await productservice.getSingleProductById(
            product.productId
          );
        } catch (err) {
          console.warn(`Product fetch failed for ID: ${product.productId}`);
        }

        // Return product with its additional data
        return {
          productId: product.productId,
          quantity: product.quantity,
          productData: {
            _id: productData._id,
            productName: productData.product_Name || "Unknown Product",
            category: productData.category
              ? productData.category.categoryname
              : "Unknown Category",
            mrp: productData.mrp || 0,
            rate: productData.rate || 0,
          },
        };
      })
    );

    // Calculate total amount from products
    const totalAmount = productDataArray.reduce((acc, product) => {
      return acc + product.productData.rate * product.quantity;
    }, 0);

    // Calculate due amount
    const dueAmount = totalAmount - invoice.amountPaid;
    const status = dueAmount > 0 ? "Pending" : "Paid";

    // Structure response data similar to getAllInvoice
    const responseData = {
      _id: invoice._id,
      date: invoice.date,
      invoiceNo: invoice.invoiceNo,
      customer: {
        _id: invoice.customerId,
        name: customerData ? customerData.name : "Unknown Customer",
      },
      products: productDataArray,
      amountPaid: invoice.amountPaid,
      totalAmount: totalAmount, // Add total amount to the response
      dueAmount: dueAmount, // Add due amount to the response
      status: status, // Add status (Pending/Paid)
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };

    // Send the response
    return res.send({
      status: "OK",
      msg: "Invoice received successfully",
      data: responseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "Error",
      msg: error.message || "Something went wrong",
      data: null,
    });
  }
};

module.exports = invoiceController;
