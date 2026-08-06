'use client'
import { CreditCard } from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Billing & Revenue Cycle</h2>
        <p className="text-xs text-slate-400">Real-time charge capture and billing dispatch</p>
      </div>
      <div className="glass-card p-6 text-slate-300">
        <p>RCM Dashboard: Total Daily Revenue Captured ₹4.25L. Unbilled Claims Scrubber Active.</p>
      </div>
    </div>
  )
}
