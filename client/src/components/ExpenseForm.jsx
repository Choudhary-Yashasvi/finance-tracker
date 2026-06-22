import React, { useState } from 'react'

const DEFAULT_CATS = ['Food','Transport','Shopping','Bills','Health','Entertainment','Other']

export default function ExpenseForm({ onAdd }){
  const [amount,setAmount] = useState('')
  const [date,setDate] = useState(new Date().toISOString().substring(0,10))
  const [desc,setDesc] = useState('')
  const [category,setCategory] = useState('Food')

  const submit = async (e)=>{
    e.preventDefault()
    if(!amount) return alert('Please enter amount')
    await onAdd({ amount: Number(amount), date, description: desc, category })
    setAmount(''); setDesc(''); setCategory('Food')
  }

  return (
    <div className="card">
      <h3>💰 Add Expense</h3>
      <form onSubmit={submit}>
        <input placeholder="Amount ($)" type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          {DEFAULT_CATS.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <input placeholder="Description (optional)" value={desc} onChange={e=>setDesc(e.target.value)} />
        <div style={{display:'flex',justifyContent:'flex-end'}}><button className="btn" type="submit">Add Expense</button></div>
      </form>
    </div>
  )
}
