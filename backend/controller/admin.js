const productCollection = require("../models/Product");
const queryCollection = require("../models/Query");
const nodemailer = require("nodemailer");

const addAdminProductController = async (req, res) => {
  try {
    const Pimage = req.file.filename;
    const { Pname, Price, Cat } = req.body;
    if (!Pname || !Price || !Cat) {
      return res.status(400).json({ message: "All fields are required 😓" });
    }
    const record = new productCollection({
      productName: Pname,
      productPrice: Price,
      productCategory: Cat,
      productImage: Pimage,
    });
    await record.save();
    res.status(200).json({ message: "Successfully Insert Product..😍" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const record = await productCollection.find();
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    await productCollection.findByIdAndDelete(id);
    res.status(200).json({ message: "Successsfully Delete 👍" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

const editValueDataController = async (req, res) => {
  try {
    const id = req.params.abc;
    const record = await productCollection.findById(id);
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { Pname, Pprice, Cat, Pstatus } = req.body;
    const id = req.params.abc;

    await productCollection.findByIdAndUpdate(id, {
      productName: Pname,
      productPrice: Pprice,
      productCategory: Cat,
      productStatus: Pstatus,
    });
    res.status(200).json({ message: "Successsfully Update 👍" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

const userAllQueryController = async (req, res) => {
  try {
    const record = await queryCollection.find();
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

const deleteQueryController = async (req, res) => {
  try {
    const id = req.params.abc;
    await queryCollection.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully Delete 🤪" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

const singleQueryController = async (req, res) => {
  try {
    const id = req.params.abc;
    const record = await queryCollection.findById(id);
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

const MailReplyController = async (req, res) => {
  try {
    const { to, sub, body } = req.body;
    const id = req.params.abc;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "dkexpress06@gmail.com",
        pass: "isrluqaunwephlts",
      },
    });

    const info = transporter.sendMail({
      from: '"QuickZY" <dkexpress06@gmail.com>',
      to: to,
      subject: sub,
      text: body, // plain‑text body
      html: body, // HTML body
    });
    await queryCollection.findByIdAndUpdate(id, {
      QueryStatus: "Read",
    });
    res.status(200).json({ message: "Successfully Reply 🤪" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error..😓" });
  }
};

module.exports = {
  addAdminProductController,
  getAllProductsController,
  deleteProductController,
  editValueDataController,
  updateProductController,
  userAllQueryController,
  deleteQueryController,
  singleQueryController,
  MailReplyController,
};
