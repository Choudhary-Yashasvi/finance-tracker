import React, { useEffect, useState, useRef } from 'react'
import api from '../api'
import ExpenseList from '../components/ExpenseList'
import ExpenseForm from '../components/ExpenseForm'
import Chart from 'chart.js/auto'

export default function Dashboard(){
  const user = null
  const token = null
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const demoKey = 'ft_demo_expenses'
  const isDemo = !token

  async function load(){
    try{
      if(isDemo){
        const raw = localStorage.getItem(demoKey)
        const list = raw ? JSON.parse(raw) : []
        setExpenses(list)
      }else{
        const res = await api.get('/expenses')
        setExpenses(res.data)
      }
    }catch(err){ 
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  const add = async (payload)=>{
    if(isDemo){
      const obj = { _id: Date.now().toString(36), ...payload, createdAt: new Date().toISOString() }
      const next = [obj, ...expenses]
      setExpenses(next)
      localStorage.setItem(demoKey, JSON.stringify(next))
      return
    }
    const res = await api.post('/expenses', payload)
    setExpenses(prev=>[res.data,...prev])
  }

  const remove = async (id)=>{
    if(isDemo){
      const next = expenses.filter(e=>e._id!==id)
      setExpenses(next)
      localStorage.setItem(demoKey, JSON.stringify(next))
      return
    }
    await api.delete(`/expenses/${id}`)
    setExpenses(prev=>prev.filter(e=>e._id!==id))
  }

  const totalRef = useRef(null)
  const [displayTotal, setDisplayTotal] = useState(0)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(()=>{
    const target = expenses.reduce((s,e)=>s+Number(e.amount),0)
    const start = displayTotal
    const duration = 600
    let raf
    const t0 = performance.now()
    function frame(t){
      const p = Math.min(1,(t-t0)/duration)
      const ease = p<.5 ? 2*p*p : -1 + (4-2*p)*p
      const cur = start + (target-start)*ease
      setDisplayTotal(Math.round(cur*100)/100)
      if(p<1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return ()=> cancelAnimationFrame(raf)
  }, [expenses])

  useEffect(()=>{
    const categories = ['Food','Transport','Shopping','Bills','Health','Entertainment','Other']
    const agg = categories.map(cat => {
      return expenses.filter(e=>String(e.category).toLowerCase()===cat.toLowerCase()).reduce((s,e)=>s+Math.abs(Number(e.amount)),0)
    })

    const colors = [
      'rgba(0, 212, 255, 0.8)',
      'rgba(0, 153, 255, 0.8)',
      'rgba(124, 58, 237, 0.8)',
      'rgba(255, 107, 53, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(168, 85, 247, 0.8)'
    ]

    const data = {
      labels: categories,
      datasets: [{
        data: agg,
        backgroundColor: colors,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
        hoverOffset: 12
      }]
    }

    if(chartRef.current){
      if(chartInstance.current){
        chartInstance.current.data = data
        chartInstance.current.update()
      }else{
        chartInstance.current = new Chart(chartRef.current, {
          type: 'doughnut',
          data,
          options: {
            animation: { duration: 700, easing: 'easeOutCubic' },
            responsive: true,
            maintainAspectRatio: true,
            plugins: { 
              legend: { 
                position: 'bottom',
                labels: { 
                  color: '#f1f5f9',
                  font: { family: "'Plus Jakarta Sans', sans-serif", size: 13, weight: '500' },
                  padding: 16,
                  usePointStyle: true
                } 
              }
            }
          }
        })
      }
    }

    return ()=>{ if(chartInstance.current){ chartInstance.current.destroy(); chartInstance.current = null } }
  }, [expenses])

  const totalExpenses = expenses.reduce((s,e)=>s+Number(e.amount),0)
  const avgExpense = expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : 0
  const categoryCount = expenses.length

  return (
    <div className="container page-animate">
      <header className="top">
        <div>
          <h1 className="title">💼 Finance Tracker</h1>
          <div className="subtitle">✨ Track expenses • Visualize spending • Perfect budget control</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="stat">
            <div className="small">Total Balance</div>
            <div className="num glow" ref={totalRef}>{'$' + (displayTotal.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))}</div>
          </div>
          {isDemo && <span className="small" style={{marginRight:8,opacity:0.7}}>📱 Demo Mode</span>}
        </div>
      </header>

      <main>
        <section className="left">
          <ExpenseForm onAdd={add} />
          <div className="card">
            <h3>📊 Recent Expenses ({categoryCount})</h3>
            {loading? <div className="empty">Loading...</div> : <ExpenseList items={expenses} onDelete={remove} />}
          </div>
        </section>
        <aside className="right">
          <div className="card">
            <h3>💹 Spending by Category</h3>
            <canvas ref={chartRef} style={{width:'100%',height:220}} />
          </div>
          <div className="card">
            <h3>📈 Quick Stats</h3>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span className="small">Total Spent</span>
                <span className="amount">${totalExpenses.toFixed(2)}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span className="small">Average Expense</span>
                <span className="amount">${avgExpense}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span className="small">Total Entries</span>
                <span style={{fontWeight:700,color:'var(--accent-primary)'}}>{categoryCount}</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}
