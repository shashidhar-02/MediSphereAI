'use client'
import { Pill } from 'lucide-react'

export default function PharmacyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Pharmacy Intelligence</h2>
        <p className="text-xs text-slate-400">Emergency medication inventory and expiry tracking</p>
      </div>
      <div className="glass-card p-6 text-slate-300">
        <p>Real-time Pharmacy Stock: 1,420 Items Tracked. 4 Emergency Alerts Active.</p>
      </div>
    </div>
  )
}
