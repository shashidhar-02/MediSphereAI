'use client'
import { useState } from 'react'
import { Bed, Activity, CheckCircle, AlertTriangle } from 'lucide-react'

export default function BedsPage() {
  const wards = [
    { name: 'ICU-A', total: 20, occupied: 18, cleaning: 1, available: 1 },
    { name: 'Surgical-B', total: 40, occupied: 32, cleaning: 4, available: 4 },
    { name: 'General-C', total: 60, occupied: 48, cleaning: 2, available: 10 },
    { name: 'Pediatrics-D', total: 30, occupied: 22, cleaning: 3, available: 5 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Bed Intelligence & Capacity</h2>
        <p className="text-xs text-slate-400">Real-time ward capacity mapping and bed turnover analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {wards.map(w => {
          const occPct = Math.round((w.occupied / w.total) * 100)
          return (
            <div key={w.name} className="glass-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{w.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${occPct > 88 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {occPct}% Occupied
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${occPct}%`, background: occPct > 88 ? '#ef4444' : '#10b981' }} />
              </div>
              <div className="grid grid-cols-3 gap-1 text-center text-xs pt-1 border-t border-white/5">
                <div><div className="font-bold text-slate-200">{w.occupied}</div><div className="text-slate-400">Occupied</div></div>
                <div><div className="font-bold text-amber-400">{w.cleaning}</div><div className="text-slate-400">Cleaning</div></div>
                <div><div className="font-bold text-emerald-400">{w.available}</div><div className="text-slate-400">Available</div></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
