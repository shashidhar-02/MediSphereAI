'use client'
import { Cog } from 'lucide-react'

export default function EquipmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Medical Asset Intelligence</h2>
        <p className="text-xs text-slate-400">Predictive maintenance and asset telemetry</p>
      </div>
      <div className="glass-card p-6 text-slate-300">
        <p>Asset Telemetry: 124 Medical Devices (Ventilators, MRI, Dialysis) Monitored. Operational Rate: 98.4%.</p>
      </div>
    </div>
  )
}
