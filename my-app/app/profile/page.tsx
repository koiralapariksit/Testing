"use client"

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseclient' // <-- changed to match file
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/auth')
      else setUser(data.session.user)
    })
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (!user) return <p>Loading...</p>

  return (
    <main style={{ textAlign: 'center', marginTop: 100 }}>
      <h1>Welcome, {user.email}</h1>
      <button onClick={logout}>Logout</button>
    </main>
  )
}
