'use client'
import { Bot } from 'lucide-react'

export default function AgentsPage() {
  const agents = [
    { name: 'Executive Decision Agent', status: 'running', cycle: '30s', confidence: '98%' },
    { name: 'Bed Intelligence Agent', status: 'running', cycle: '30s', confidence: '96%' },
    { name: 'Emergency Response Agent', status: 'running', cycle: '30s', confidence: '99%' },
    { name: 'Patient Flow Agent', status: 'running', cycle: '60s', confidence: '94%' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">AI Multi-Agent Monitor Mesh</h2>
        <p className="text-xs text-slate-400">Autonomous evaluation loops across 15 domain agents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map(a => (
          <div key={a.name} className="glass-card p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400"><Bot size={22} /></div>
              <div>
                <div className="font-bold text-slate-200">{a.name}</div>
                <div className="text-xs text-slate-400">Eval Loop: {a.cycle} | Confidence: {a.confidence}</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
