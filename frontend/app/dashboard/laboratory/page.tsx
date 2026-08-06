'use client'
import { TestTube2 } from 'lucide-react'

export default function LaboratoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Laboratory Diagnostics</h2>
        <p className="text-xs text-slate-400">STAT specimen processing and turnaround telemetry</p>
      </div>
      <div className="glass-card p-6 text-slate-300">
        <p>Active Lab Orders: 42 STAT Specimen Diagnostics in Progress. Avg TAT: 18 mins.</p>
      </div>
    </div>
  )
}
