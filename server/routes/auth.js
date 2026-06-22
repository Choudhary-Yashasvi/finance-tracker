const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({error:'Email and password required'});
  try{
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({error:'Email already in use'});
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ name: name||'', email, passwordHash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  }catch(err){
    console.error(err);
    res.status(500).json({error:'Server error'});
  }
});

// POST /api/auth/login
router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({error:'Email and password required'});
  try{
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({error:'Invalid credentials'});
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(400).json({error:'Invalid credentials'});
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  }catch(err){
    console.error(err);
    res.status(500).json({error:'Server error'});
  }
});

module.exports = router;
