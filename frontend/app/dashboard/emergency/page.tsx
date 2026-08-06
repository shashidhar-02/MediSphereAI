'use client'
import { ShieldAlert, Heart, Activity, AlertCircle } from 'lucide-react'

export default function EmergencyPage() {
  const triageQueue = [
    { id: 'ER-101', name: 'Sophia Chen', complaint: 'Acute Chest Pain', esi: 1, pulse: 125, bp: '150/95', spo2: 89, time: '3 mins ago' },
    { id: 'ER-102', name: 'Robert Paulson', complaint: 'Laceration & Bleeding', esi: 2, pulse: 98, bp: '130/85', spo2: 96, time: '12 mins ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Emergency Department Response</h2>
        <p className="text-xs text-slate-400">Live ER triage matrix and vital sign anomaly detection</p>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Chief Complaint</th>
              <th>ESI Score</th>
              <th>Heart Rate</th>
              <th>Blood Pressure</th>
              <th>SpO2</th>
              <th>Wait Time</th>
            </tr>
          </thead>
          <tbody>
            {triageQueue.map(q => (
              <tr key={q.id}>
                <td className="font-mono text-rose-400">{q.id}</td>
                <td className="font-medium text-slate-200">{q.name}</td>
                <td>{q.complaint}</td>
                <td>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    ESI-{q.esi} CRITICAL
                  </span>
                </td>
                <td className="text-rose-400 font-semibold">{q.pulse} bpm</td>
                <td>{q.bp}</td>
                <td className={q.spo2 < 90 ? 'text-red-400 font-bold' : 'text-slate-300'}>{q.spo2}%</td>
                <td className="text-slate-400">{q.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
