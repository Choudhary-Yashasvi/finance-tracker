import React from 'react'

const EMOJIS = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍️',
  Bills: '📄',
  Health: '🏥',
  Entertainment: '🎬',
  Other: '💎'
}

export default function ExpenseList({ items, onDelete }){
  if(!items || items.length===0) return <div className="empty">No expenses yet. Add one to get started!</div>

  return (
    <div className="list">
      {items.map(item => (
        <div key={item._id} className="expense">
          <div className="cat-pill">{EMOJIS[item.category] || '💰'}</div>
          <div className="desc">
            <strong>{item.description || item.category}</strong>
            <div className="small">{new Date(item.date).toLocaleDateString()}</div>
          </div>
          <div className="amount">${Number(item.amount).toFixed(2)}</div>
          <button className="delete" onClick={()=>onDelete(item._id)}>🗑️</button>
        </div>
      ))}
    </div>
  )
}
