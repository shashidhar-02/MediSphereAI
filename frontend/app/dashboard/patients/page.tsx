'use client'
import { useState } from 'react'
import { Users, Search, Plus, UserCheck, Activity } from 'lucide-react'

export default function PatientsPage() {
  const [search, setSearch] = useState('')
  const patients = [
    { id: 'PAT-8841', name: 'Eleanor Vance', age: 42, gender: 'Female', status: 'Admitted', ward: 'ICU-A', bed: 'BED-ICU-04', esi: 2 },
    { id: 'PAT-8842', name: 'Marcus Brody', age: 58, gender: 'Male', status: 'Admitted', ward: 'General-B', bed: 'BED-GEN-12', esi: 3 },
    { id: 'PAT-8843', name: 'Sophia Chen', age: 29, gender: 'Female', status: 'In Triage', ward: 'ER', bed: 'BED-ER-01', esi: 1 },
  ]

  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Patient Flow & Census</h2>
          <p className="text-xs text-slate-400">Real-time patient telemetry and ward placement</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search patient or MRN..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/20">
            <Plus size={16} /> Admit Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400"><Users size={24} /></div>
          <div>
            <div className="text-2xl font-bold">342</div>
            <div className="text-xs text-slate-400">Total Inpatients</div>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400"><UserCheck size={24} /></div>
          <div>
            <div className="text-2xl font-bold">28</div>
            <div className="text-xs text-slate-400">Discharges Scheduled</div>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400"><Activity size={24} /></div>
          <div>
            <div className="text-2xl font-bold">14</div>
            <div className="text-xs text-slate-400">Active ER Transfers</div>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full data-table">
          <thead>
            <tr>
              <th>MRN</th>
              <th>Patient Name</th>
              <th>Age / Gender</th>
              <th>ESI Level</th>
              <th>Assigned Ward</th>
              <th>Bed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td className="font-mono text-indigo-400">{p.id}</td>
                <td className="font-medium text-slate-200">{p.name}</td>
                <td>{p.age} y/o ({p.gender})</td>
                <td>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${p.esi === 1 ? 'bg-red-500/20 text-red-400' : p.esi === 2 ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    ESI-{p.esi}
                  </span>
                </td>
                <td>{p.ward}</td>
                <td>{p.bed}</td>
                <td>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
