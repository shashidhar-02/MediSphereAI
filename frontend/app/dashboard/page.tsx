'use client'
import { useState, useEffect } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import {
  Clock, Users, Bed, Activity, ShieldAlert,
  IndianRupee, Heart, Target, Sparkles, AlertCircle,
  Microscope, Pill, CreditCard, FileText, CheckCircle2, Bot
} from 'lucide-react'
import {
  mockKPIs, mockHourlyFlow, mockDailyRevenue,
  mockDepartmentPerformance, mockRecommendations, mockAgents,
  formatCurrency, formatNumber
} from '@/lib/mock-data'

// ─── KPI Card ────────────────────────────────────────────────
function KPICard({ label, value, unit, change, color, icon, id }: any) {
  const isPositive = change > 0
  return (
    <div id={id} className="kpi-card hover:shadow-card-hover group" style={{ '--accent-color': color } as any}>
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl transition-colors duration-300" style={{ background: `${color}15`, color: color }}>
          {icon}
        </div>
        <div className={`text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}
             style={{ background: isPositive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)' }}>
          {isPositive ? '▲' : '▼'} {Math.abs(change)}%
        </div>
      </div>
      <div className="text-3xl font-display font-semibold tracking-tight mb-1" style={{ color: '#e2e8f0' }}>
        {value}<span className="text-sm font-medium ml-1.5" style={{ color: '#64748b' }}>{unit}</span>
      </div>
      <div className="text-xs font-medium uppercase tracking-wider" style={{ color: '#64748b' }}>{label}</div>
      <div className="progress-bar mt-3">
        <div className="progress-fill" style={{ width: `${Math.min(100, parseFloat(value))}%`, background: color }} />
      </div>
    </div>
  )
}

// ─── Agent Status Mini ────────────────────────────────────────
function AgentMini({ agent }: any) {
  const colors: Record<string, string> = { running: '#10b981', idle: '#6b7280', error: '#ef4444' }
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg transition-all"
         style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colors[agent.status] }} />
      <span className="text-xs truncate" style={{ color: '#94a3b8' }}>{agent.name.replace(' Agent', '')}</span>
      <span className="ml-auto text-xs" style={{ color: colors[agent.status] }}>{agent.status}</span>
    </div>
  )
}

// ─── Recommendation Card ──────────────────────────────────────
function RecommendationCard({ rec }: any) {
  const [acknowledged, setAcknowledged] = useState(rec.is_acknowledged)
  const priorityBg: Record<string, string> = {
    critical: 'rgba(239,68,68,0.1)',  high: 'rgba(249,115,22,0.1)',
    medium:   'rgba(245,158,11,0.1)', low:  'rgba(34,197,94,0.1)',
  }
  const priorityColor: Record<string, string> = {
    critical: '#ef4444', high: '#f97316', medium: '#f59e0b', low: '#22c55e',
  }
  return (
    <div className="p-4 rounded-xl transition-all border"
         style={{ background: priorityBg[rec.priority], borderColor: `${priorityColor[rec.priority]}30` }}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: `${priorityColor[rec.priority]}20`, color: priorityColor[rec.priority] }}>
              {rec.priority}
            </span>
            <span className="text-xs" style={{ color: '#64748b' }}>{rec.agent}</span>
          </div>
          <p className="text-sm font-semibold mb-1 leading-tight" style={{ color: '#e2e8f0' }}>{rec.title}</p>
          <p className="text-xs line-clamp-2" style={{ color: '#94a3b8' }}>{rec.description}</p>
          {rec.impact && (
            <div className="mt-2 text-xs font-medium" style={{ color: priorityColor[rec.priority] }}>
              Impact: {rec.impact}
            </div>
          )}
        </div>
        <button
          onClick={() => setAcknowledged(!acknowledged)}
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105"
          style={{ background: acknowledged ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)', color: acknowledged ? '#10b981' : '#64748b' }}
          title={acknowledged ? 'Acknowledged' : 'Mark as acknowledged'}
        >
          <CheckCircle2 size={18} />
        </button>
      </div>
    </div>
  )
}

// ─── Custom Tooltip ───────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="px-3 py-2 rounded-xl text-xs" style={{ background: 'rgba(15,15,24,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="font-medium mb-1" style={{ color: '#94a3b8' }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{typeof p.value === 'number' && p.value > 10000 ? formatCurrency(p.value) : p.value}</strong></p>
      ))}
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────
export default function ExecutiveDashboard() {
  const [kpis, setKpis] = useState(mockKPIs)
  const [tick, setTick] = useState(0)

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(prev => ({
        ...prev,
        patients_today: prev.patients_today + Math.floor(Math.random() * 2),
        active_emergencies: Math.max(5, prev.active_emergencies + (Math.random() > 0.5 ? 1 : -1)),
        average_waiting_time: +(prev.average_waiting_time + (Math.random() - 0.5) * 0.5).toFixed(1),
      }))
      setTick(t => t + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const KPI_CARDS = [
    { id: 'kpi-waiting',       label: 'Avg Wait Time',        value: kpis.average_waiting_time, unit: 'min', change: -8.2,  color: '#6366f1', icon: <Clock size={22} /> },
    { id: 'kpi-throughput',    label: 'Patient Throughput',   value: kpis.patients_today,        unit: '/day',change: +12.4, color: '#10b981', icon: <Users size={22} /> },
    { id: 'kpi-bed',           label: 'Bed Occupancy',        value: kpis.bed_occupancy_rate,    unit: '%',   change: +3.1,  color: '#8b5cf6', icon: <Bed size={22} /> },
    { id: 'kpi-icu',           label: 'ICU Utilization',      value: kpis.icu_utilization,       unit: '%',   change: +5.8,  color: '#f43f5e', icon: <Activity size={22} /> },
    { id: 'kpi-emergency',     label: 'Emergency Response',   value: kpis.emergency_response_time,unit:'min', change: -14.2, color: '#ef4444', icon: <ShieldAlert size={22} /> },
    { id: 'kpi-revenue',       label: 'Daily Revenue',        value: '₹7.4L',                    unit: '',    change: +6.8,  color: '#f59e0b', icon: <IndianRupee size={22} /> },
    { id: 'kpi-satisfaction',  label: 'Patient Satisfaction', value: kpis.patient_satisfaction,  unit: '%',   change: +2.1,  color: '#22c55e', icon: <Heart size={22} /> },
    { id: 'kpi-score',         label: 'Performance Score',    value: kpis.hospital_performance_score, unit: '%', change: +1.4, color: '#0ea5e9', icon: <Target size={22} /> },
  ]

  const pieData = [
    { name: 'ICU',       value: 18, fill: '#8b5cf6' },
    { name: 'Emergency', value: 32, fill: '#ef4444' },
    { name: 'General',   value: 98, fill: '#3b82f6' },
    { name: 'Private',   value: 38, fill: '#f59e0b' },
    { name: 'Pediatric', value: 18, fill: '#10b981' },
    { name: 'Available', value: 57, fill: '#1e293b' },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* ─── Alert Banner ─────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-4 rounded-xl shadow-[0_4px_24px_rgba(239,68,68,0.15)]"
           style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', backdropFilter: 'blur(12px)' }}>
        <AlertCircle className="text-red-500 animate-pulse-slow" size={20} />
        <p className="text-sm font-medium tracking-wide" style={{ color: '#fca5a5' }}>
          <span className="font-bold text-white mr-2">Critical Alert:</span> 
          ICU at 91.2% capacity · Emergency queue has {kpis.active_emergencies} active cases · 4 medicines critically low
        </p>
        <button className="ml-auto text-xs underline flex-shrink-0" style={{ color: '#f87171' }}>View all</button>
      </div>

      {/* ─── KPI Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        {KPI_CARDS.map(card => (
          <KPICard key={card.id} {...card} />
        ))}
      </div>

      {/* ─── Charts Row ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Patient Flow Chart */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Patient Flow — Today</h3>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Hourly registrations, consultations & discharges</p>
            </div>
            <div className="flex gap-3 text-xs" style={{ color: '#475569' }}>
              {[{ color: '#6366f1', label: 'Registrations' }, { color: '#10b981', label: 'Consultations' }, { color: '#f59e0b', label: 'Discharges' }].map(l => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockHourlyFlow}>
              <defs>
                <linearGradient id="reg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="con" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} interval={3}/>
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} axisLine={false}/>
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="registrations" stroke="#6366f1" fill="url(#reg)" strokeWidth={2} name="Registrations"/>
              <Area type="monotone" dataKey="consultations" stroke="#10b981" fill="url(#con)" strokeWidth={2} name="Consultations"/>
              <Line type="monotone" dataKey="discharges"    stroke="#f59e0b" strokeWidth={2} dot={false} name="Discharges"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bed Occupancy Pie */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold mb-1" style={{ color: '#e2e8f0' }}>Bed Occupancy</h3>
          <p className="text-xs mb-4" style={{ color: '#475569' }}>218 / 275 beds occupied (84.7%)</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v} beds`]} contentStyle={{ background: '#0f0f18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {pieData.slice(0, 5).map(d => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.fill }} />
                <span style={{ color: '#64748b' }}>{d.name}</span>
                <span className="ml-auto font-medium" style={{ color: '#94a3b8' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Revenue + Dept Performance ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Revenue Trend */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Revenue vs Cost — 30 Days</h3>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Daily financial performance</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold" style={{ color: '#10b981' }}>
                {formatCurrency(mockDailyRevenue.slice(-7).reduce((s, d) => s + d.profit, 0))}
              </div>
              <div className="text-xs" style={{ color: '#475569' }}>7-day profit</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockDailyRevenue.slice(-14)} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} interval={2}/>
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`}/>
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4,4,0,0]} name="Revenue" opacity={0.9}/>
              <Bar dataKey="cost"    fill="#ef4444" radius={[4,4,0,0]} name="Cost"    opacity={0.7}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#e2e8f0' }}>Department Performance</h3>
          <div className="space-y-3">
            {mockDepartmentPerformance.map(dept => (
              <div key={dept.department}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: dept.color }} />
                    <span className="text-xs" style={{ color: '#94a3b8' }}>{dept.department}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: dept.color }}>{dept.efficiency_score}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${dept.efficiency_score}%`, background: dept.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Recommendations + Agents ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* AI Recommendations */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#e2e8f0' }}>
              <Sparkles size={16} className="text-indigo-400" />
              AI Recommendations
            </h3>
            <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
              {mockRecommendations.filter(r => !r.is_acknowledged).length} pending
            </span>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {mockRecommendations.map(rec => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        </div>

        {/* Agent Status */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#e2e8f0' }}>
              <Bot size={16} className="text-indigo-400" />
              AI Agent Status
            </h3>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                {mockAgents.filter(a => a.status === 'running').length} running
              </span>
            </div>
          </div>
          <div className="space-y-1.5 max-h-80 overflow-y-auto">
            {mockAgents.map(agent => (
              <AgentMini key={agent.key} agent={agent} />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Quick Stats Row ──────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Lab Tests Pending',       value: kpis.lab_tests_pending,      icon: <Microscope size={28} />, color: '#3b82f6' },
          { label: 'Prescriptions Pending',   value: kpis.prescriptions_pending,  icon: <Pill size={28} />,       color: '#10b981' },
          { label: 'Pending Bills',           value: kpis.pending_bills,          icon: <IndianRupee size={28} />,color: '#f59e0b' },
          { label: 'Insurance Claims',        value: kpis.insurance_claims_pending,icon: <FileText size={28} />, color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 flex items-center gap-4 hover:shadow-card-hover group cursor-default">
            <div className="p-3 rounded-2xl transition-colors" style={{ background: `${s.color}15`, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-display font-semibold" style={{ color: '#e2e8f0' }}>{s.value}</div>
              <div className="text-xs font-medium uppercase tracking-wider mt-0.5" style={{ color: '#64748b' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
