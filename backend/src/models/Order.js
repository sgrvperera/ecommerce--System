const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  items: [
    { product: { type: mongoose.Schema.Types.ObjectId, ref:'Product' }, qty: Number, price: Number }
  ],
  total: Number,
  status: { type: String, enum:['pending','processing','shipped','delivered','cancelled'], default: 'pending' }
}, { timestamps:true });

module.exports = mongoose.model('Order', orderSchema);
