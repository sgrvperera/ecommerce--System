const Product = require('../models/Product');

exports.createProduct = async (req,res) => {
  const p = await Product.create(req.body);
  res.json(p);
};

exports.listProducts = async (req,res) => {
  const products = await Product.find().limit(100);
  res.json(products);
};

exports.getProduct = async (req,res) => {
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({ message:'Not found' });
  res.json(p);
};

exports.updateProduct = async (req,res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(p);
};

exports.deleteProduct = async (req,res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok:true });
};
