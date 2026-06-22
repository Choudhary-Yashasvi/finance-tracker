import React, { createContext, useContext, useState, useEffect } from 'react'
import api, { setAuthToken } from './api'

const AuthContext = createContext()
export function useAuth(){ return useContext(AuthContext) }

export function AuthProvider({ children }){
  const [token, setToken] = useState(localStorage.getItem('ft_token') || null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('ft_user')||'null'))

  useEffect(()=>{ setAuthToken(token) }, [token])

  const login = async (email,password)=>{
    const res = await api.post('/auth/login',{email,password})
    const { token, user } = res.data
    setToken(token); setUser(user)
    localStorage.setItem('ft_token', token)
    localStorage.setItem('ft_user', JSON.stringify(user))
  }
  const register = async (name,email,password)=>{
    const res = await api.post('/auth/register',{name,email,password})
    const { token, user } = res.data
    setToken(token); setUser(user)
    localStorage.setItem('ft_token', token)
    localStorage.setItem('ft_user', JSON.stringify(user))
  }
  const logout = ()=>{
    setToken(null); setUser(null); localStorage.removeItem('ft_token'); localStorage.removeItem('ft_user'); setAuthToken(null)
  }

  return <AuthContext.Provider value={{token,user,login,register,logout}}>{children}</AuthContext.Provider>
}
