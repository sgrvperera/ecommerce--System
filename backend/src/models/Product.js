const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: String,
  price: {type:Number, required:true},
  stock: {type:Number, default:0},
  imageUrl: String,
  category: String
}, { timestamps:true });

module.exports = mongoose.model('Product', productSchema);
