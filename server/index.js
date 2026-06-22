require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/api/ping', (req,res)=>res.json({ok:true}));

app.use((err, req, res, next)=>{
  console.error(err);
  res.status(err.status || 500).json({error: err.message || 'Server error'});
});

async function start(){
  try{
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/finance_tracker');
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>console.log('Server listening on', PORT));
  }catch(err){
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
