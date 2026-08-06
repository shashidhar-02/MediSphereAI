'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Metadata } from 'next'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Demo: Accept any of the mock credentials
    const validUsers: Record<string, string> = {
      admin: 'admin123', doctor: 'doctor123', nurse: 'nurse123'
    }
    await new Promise(r => setTimeout(r, 800))

    if (validUsers[username] === password) {
      localStorage.setItem('medisphere_user', JSON.stringify({ username, role: username }))
      router.push('/dashboard')
    } else {
      setError('Invalid credentials. Try admin / admin123')
    }
    setLoading(false)
  }

  const demoAccounts = [
    { label: 'Administrator', username: 'admin',  password: 'admin123', color: '#6366f1' },
    { label: 'Doctor',        username: 'doctor', password: 'doctor123',color: '#10b981' },
    { label: 'Nurse',         username: 'nurse',  password: 'nurse123', color: '#f59e0b' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
         style={{ background: 'linear-gradient(135deg, #0f0f18 0%, #13131e 50%, #0f0f18 100%)' }}>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
             style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="w-full max-w-md px-4 animate-fade-in-up relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
               style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M16 4V28M4 10L28 22M28 10L4 22" stroke="white" strokeWidth="1" opacity="0.5"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text">MediSphere AI</h1>
          <p className="text-sm mt-2" style={{ color: '#64748b' }}>
            Autonomous Hospital Operations Intelligence
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold mb-1" style={{ color: '#e2e8f0' }}>Sign In</h2>
          <p className="text-sm mb-6" style={{ color: '#64748b' }}>Access your hospital operations dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#e2e8f0',
                }}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#94a3b8' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#e2e8f0',
                }}
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="text-xs px-3 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10"/>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="mt-4 glass-card p-4">
          <p className="text-xs font-medium mb-3 text-center" style={{ color: '#64748b' }}>
            🔑 Demo Accounts
          </p>
          <div className="grid grid-cols-3 gap-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.username}
                id={`demo-${acc.username}`}
                onClick={() => { setUsername(acc.username); setPassword(acc.password) }}
                className="p-2.5 rounded-xl text-center transition-all text-xs"
                style={{ background: `${acc.color}15`, border: `1px solid ${acc.color}30`, color: acc.color }}
              >
                <div className="font-semibold">{acc.label}</div>
                <div className="opacity-60 mt-0.5">{acc.username}</div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: '#334155' }}>
          MediSphere AI v1.0 · Final Year CSE Project
        </p>
      </div>
    </div>
  )
}
