'use client'
import { Users2, UserCheck, Shield } from 'lucide-react'

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Staff Allocation & Rostering</h2>
        <p className="text-xs text-slate-400">Nurse-to-patient ratio optimization and shift balancing</p>
      </div>
      <div className="glass-card p-6 text-slate-300">
        <p>Active Staff Roster: 84 Clinical Personnel on Duty (32 RNs, 18 Physicians, 34 Support Staff).</p>
      </div>
    </div>
  )
}
