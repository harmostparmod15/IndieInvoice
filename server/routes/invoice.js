const express = require("express");
const Invoice = require("../model/invoice");
const protectFromCookie = require("../middleware/cookieChecker");
const generateInvoicePDF = require("../utils/generateInvoicePDF");
const mongoose = require("mongoose");

const Client = require("../model/client");

const router = express.Router();

//  create invoice
router.post("/create", protectFromCookie, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      clientId,
      services,
      taxRate = 0,
      discount = { type: "flat", value: 0 },
      status = "Unpaid",
      invoiceDate = new Date(),
      dueDate,
      notes,
    } = req.body;

    // ✅ Sanitize service values
    const cleanedServices = services.map((service) => ({
      name: service.name,
      quantity: Number(service.quantity) || 0,
      price: Number(service.price) || 0,
    }));

    // 1. Auto-generate invoice number
    let invoiceNumber = "#1001";
    const lastInvoice = await Invoice.findOne({ userId }).sort({
      createdAt: -1,
    });

    console.log("last invoice", lastInvoice);

    if (lastInvoice && lastInvoice.invoiceNumber?.startsWith("#")) {
      const lastNum = parseInt(lastInvoice.invoiceNumber.replace("#", ""));
      if (!isNaN(lastNum)) {
        invoiceNumber = `#${lastNum + 1}`;
      }
    }

    // 2. Calculate subtotal
    const subtotal = cleanedServices.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // 3. Apply discount
    let discountedSubtotal = subtotal;
    if (discount.type === "percent") {
      discountedSubtotal -= (subtotal * discount.value) / 100;
    } else {
      discountedSubtotal -= discount.value;
    }

    // 4. Apply tax
    const taxAmount = (discountedSubtotal * taxRate) / 100;

    // 5. Final total
    const totalAmount = Math.round(discountedSubtotal + taxAmount);

    // 6. Save invoice
    const newInvoice = new Invoice({
      userId,
      clientId: new mongoose.Types.ObjectId(clientId),
      invoiceNumber,
      services: cleanedServices, // ✅ use sanitized data
      taxRate,
      discount,
      status,
      invoiceDate,
      dueDate,
      totalAmount,
      notes,
    });

    const savedInvoice = await newInvoice.save();

    res.status(201).json({
      status: 201,
      msg: "Invoice created successfully",
      data: savedInvoice,
      breakdown: {
        subtotal,
        discount: {
          type: discount.type,
          value: discount.value,
          discountedSubtotal: Math.round(discountedSubtotal),
        },
        tax: {
          rate: taxRate,
          taxAmount: Math.round(taxAmount),
        },
        total: Math.round(totalAmount),
      },
      error: "",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Failed to create invoice",
      error: error.message,
      data: {},
    });
  }
});

// get all invocies
router.get("/get-all", protectFromCookie, async (req, res) => {
  try {
    const userId = req.user.id;
    const inv = await Invoice.find().populate("userId");
    console.log(inv);
    const invoices = await Invoice.find({ userId }).populate("clientId");
    res.status(200).json({ status: 200, data: invoices, error: "" });
  } catch (error) {
    res.status(400).json({ status: 400, data: [], error: error.message });
  }
});

//  get a invoice with id
router.get("/:id", protectFromCookie, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("clientId");
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    res.status(200).json({ data: invoice, error: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get the pdf of invoice with invoice id

// GET: Generate Invoice PDF
router.get("/:id/pdf", protectFromCookie, async (req, res) => {
  try {
    // 1. Find invoice and populate clientId
    // const invoice = await Invoice.findById(req.params.id).populate("clientId");
    console.log(req.params.id);
    const invoice = await Invoice.findById(req.params.id).populate("clientId");

    console.log(invoice);

    // 2. Check if invoice or client is missing
    if (!invoice || !invoice.clientId) {
      return res.status(404).json({ error: "Invoice or client not found" });
    }

    const client = invoice.clientId;

    // 3. Generate PDF buffer
    const pdfBuffer = await generateInvoicePDF(invoice, client);

    // 4. Stream PDF to browser
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=invoice_${invoice.invoiceNumber}.pdf`
    );

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation failed:", err.message);

    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to generate invoice PDF" });
    }
  }
});

module.exports = router;
