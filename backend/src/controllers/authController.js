const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.register = async (req,res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if(existing) return res.status(400).json({ message:'Email in use' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash: hash });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn:'7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.login = async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message:'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if(!ok) return res.status(400).json({ message:'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn:'7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
