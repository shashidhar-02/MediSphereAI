'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const user = localStorage.getItem('medisphere_user')
    router.push(user ? '/dashboard' : '/login')
  }, [])
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0f18' }}>
      <div className="text-center">
        <div className="text-4xl mb-4">🏥</div>
        <div className="gradient-text text-xl font-bold">MediSphere AI</div>
        <div className="text-sm mt-2" style={{ color: '#475569' }}>Loading...</div>
      </div>
    </div>
  )
}
