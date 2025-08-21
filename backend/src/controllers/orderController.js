const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req,res) => {
  const { items } = req.body;
  let total = 0;
  for(const it of items){
    const p = await Product.findById(it.product);
    if(!p) return res.status(400).json({ message:'Product not found' });
    if(p.stock < it.qty) return res.status(400).json({ message:'Insufficient stock' });
    total += p.price * it.qty;
    p.stock -= it.qty;
    await p.save();
  }
  const order = await Order.create({ user: req.user._id, items, total });
  res.json(order);
};

exports.getOrders = async (req,res) => {
  if(req.user.role === 'admin') {
    const all = await Order.find().populate('user').populate('items.product');
    return res.json(all);
  }
  const own = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(own);
};

exports.updateStatus = async (req,res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new:true });
  res.json(order);
};
