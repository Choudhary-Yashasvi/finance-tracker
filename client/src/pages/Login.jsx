import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = async (e)=>{
    e.preventDefault(); setLoading(true)
    try{ await login(email,password); nav('/'); }catch(err){ alert(err.response?.data?.error || err.message) }
    setLoading(false)
  }

  return (
    <div className="centered">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn" disabled={loading}>{loading? 'Signing...' : 'Sign in'}</button>
        </form>
        <div className="small">No account? <Link to="/register">Register</Link></div>
      </div>
    </div>
  )
}
