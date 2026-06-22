import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const { register } = useAuth()
  const nav = useNavigate()

  const submit = async (e)=>{
    e.preventDefault(); setLoading(true)
    try{ await register(name,email,password); nav('/'); }catch(err){ alert(err.response?.data?.error || err.message) }
    setLoading(false)
  }

  return (
    <div className="centered">
      <div className="card">
        <h2>Create Account</h2>
        <form onSubmit={submit}>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn" disabled={loading}>{loading? 'Creating...' : 'Register'}</button>
        </form>
        <div className="small">Have an account? <Link to="/login">Login</Link></div>
      </div>
    </div>
  )
}
