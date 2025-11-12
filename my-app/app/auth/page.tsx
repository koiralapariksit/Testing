'use client';
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseclient' // <-- changed to match file
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert('Check your email for verification link!')
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/profile')
    setLoading(false)
  }

  return (
    <main style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:100 }}>
      <h1>Login / Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ margin:8, padding:8 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ margin:8, padding:8 }}
      />
      <button onClick={handleLogin} disabled={loading}>Login</button>
      <button onClick={handleSignup} disabled={loading}>Sign Up</button>
    </main>
  )
}
