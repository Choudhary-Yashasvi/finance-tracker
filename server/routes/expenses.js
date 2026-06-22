const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

// GET /api/expenses - list for current user
router.get('/', auth, async (req,res)=>{
  try{
    const list = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(list);
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}); }
});

// POST /api/expenses - create
router.post('/', auth, async (req,res)=>{
  try{
    const { amount, category, description, date } = req.body;
    if(!amount || !category || !date) return res.status(400).json({error:'Missing fields'});
    const exp = await Expense.create({ userId: req.user._id, amount: Number(amount), category, description: description||'', date: new Date(date) });
    res.json(exp);
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}); }
});

// PUT /api/expenses/:id - update
router.put('/:id', auth, async (req,res)=>{
  try{
    const exp = await Expense.findOne({ _id: req.params.id, userId: req.user._id });
    if(!exp) return res.status(404).json({error:'Not found'});
    const { amount, category, description, date } = req.body;
    if(amount!==undefined) exp.amount = Number(amount);
    if(category) exp.category = category;
    if(description!==undefined) exp.description = description;
    if(date) exp.date = new Date(date);
    await exp.save();
    res.json(exp);
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}); }
});

// DELETE /api/expenses/:id
router.delete('/:id', auth, async (req,res)=>{
  try{
    const exp = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if(!exp) return res.status(404).json({error:'Not found'});
    res.json({ok:true});
  }catch(err){ console.error(err); res.status(500).json({error:'Server error'}); }
});

module.exports = router;
