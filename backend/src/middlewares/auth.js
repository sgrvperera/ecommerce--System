const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

async function authMiddleware(req,res,next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message:'No token' });
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(payload.id).select('-passwordHash');
    next();
  }catch(e){
    res.status(401).json({message:'Invalid token'});
  }
}

function adminOnly(req,res,next){
  if(!req.user || req.user.role !== 'admin') return res.status(403).json({ message:'Require admin' });
  next();
}

module.exports = { authMiddleware, adminOnly };
