'use client'
import { TrendingUp } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Predictive Analytics & Forecasting</h2>
        <p className="text-xs text-slate-400">AI-driven length-of-stay and capacity bottleneck forecasts</p>
      </div>
      <div className="glass-card p-6 text-slate-300">
        <p>Forecast Horizon: Occupancy predicted to peak at 92% tomorrow at 14:00. Actionable recommendations generated.</p>
      </div>
    </div>
  )
}
