// MediSphere AI — Mock Data for Frontend (mirrors backend data_generator)
// Used when backend is unavailable (standalone demo mode)

export const mockKPIs = {
  average_waiting_time: 28.4,
  patient_throughput: 342,
  bed_occupancy_rate: 84.7,
  icu_utilization: 91.2,
  doctor_utilization: 82.3,
  nurse_utilization: 87.6,
  medicine_availability: 93.1,
  equipment_utilization: 74.8,
  emergency_response_time: 7.2,
  daily_revenue: 742500,
  operational_cost: 468000,
  insurance_approval_rate: 79.4,
  patient_satisfaction: 86.3,
  hospital_performance_score: 83.7,
  active_emergencies: 11,
  available_beds: 52,
  total_beds: 275,
  patients_today: 342,
  admissions_today: 47,
  discharges_today: 38,
  surgeries_today: 14,
  lab_tests_pending: 82,
  prescriptions_pending: 54,
  pending_bills: 187,
  insurance_claims_pending: 63,
  staff_on_duty: 218,
};

export const mockHourlyFlow = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const isAMPeak = hour >= 8 && hour <= 12;
  const isPMPeak = hour >= 14 && hour <= 18;
  const isNight = hour >= 0 && hour <= 6;
  const multiplier = isAMPeak ? 1.5 : isPMPeak ? 1.3 : isNight ? 0.4 : 1.0;
  return {
    time: `${String(hour).padStart(2, '0')}:00`,
    registrations: Math.floor(14 * multiplier + Math.random() * 8),
    consultations: Math.floor(12 * multiplier + Math.random() * 6),
    discharges: Math.floor(6 * multiplier + Math.random() * 5),
    emergencies: Math.floor(3 * multiplier + Math.random() * 3),
  };
});

export const mockDailyRevenue = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const revenue = (680000 + Math.random() * 260000) * (isWeekend ? 0.75 : 1);
  const cost    = (420000 + Math.random() * 140000) * (isWeekend ? 0.80 : 1);
  return {
    date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    revenue: Math.floor(revenue),
    cost: Math.floor(cost),
    profit: Math.floor(revenue - cost),
  };
});

export const mockBedSummary = {
  icu:       { total: 20,  occupied: 18, available: 2,  occupancy_rate: 91.2 },
  emergency: { total: 40,  occupied: 32, available: 8,  occupancy_rate: 80.0 },
  general:   { total: 120, occupied: 98, available: 22, occupancy_rate: 81.7 },
  private:   { total: 50,  occupied: 38, available: 12, occupancy_rate: 76.0 },
  pediatric: { total: 25,  occupied: 18, available: 7,  occupancy_rate: 72.0 },
  maternity: { total: 20,  occupied: 14, available: 6,  occupancy_rate: 70.0 },
  total:     { total: 275, occupied: 218, available: 57 },
};

export const mockDepartmentPerformance = [
  { department: 'Emergency',       efficiency_score: 78.4, patient_satisfaction: 72.1, bed_utilization: 80.0, avg_wait_time: 22.3, revenue_contribution: 18.5, color: '#ef4444' },
  { department: 'ICU',             efficiency_score: 91.2, patient_satisfaction: 88.4, bed_utilization: 91.2, avg_wait_time: 8.1,  revenue_contribution: 24.2, color: '#8b5cf6' },
  { department: 'General Medicine',efficiency_score: 83.7, patient_satisfaction: 84.6, bed_utilization: 81.7, avg_wait_time: 18.4, revenue_contribution: 14.8, color: '#3b82f6' },
  { department: 'Surgery',         efficiency_score: 94.1, patient_satisfaction: 91.3, bed_utilization: 72.0, avg_wait_time: 12.2, revenue_contribution: 28.6, color: '#f59e0b' },
  { department: 'Cardiology',      efficiency_score: 88.9, patient_satisfaction: 90.1, bed_utilization: 85.0, avg_wait_time: 15.8, revenue_contribution: 21.4, color: '#f43f5e' },
  { department: 'Pediatrics',      efficiency_score: 86.2, patient_satisfaction: 92.7, bed_utilization: 72.0, avg_wait_time: 14.6, revenue_contribution: 9.2,  color: '#10b981' },
];

export const mockRecommendations = [
  {
    id: '1',
    agent: 'Emergency Response Agent',
    category: 'Emergency',
    priority: 'critical',
    title: 'Add extra emergency physician during peak hours (8AM–12PM)',
    description: 'Emergency department wait times have increased 34% over the last 2 hours. Current physician-to-patient ratio is 1:8, above the 1:6 safe threshold.',
    impact: 'Reduce wait time by ~18 minutes',
    is_acknowledged: false,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    agent: 'Bed Intelligence Agent',
    category: 'Bed Management',
    priority: 'high',
    title: 'Initiate discharge planning for 12 long-stay patients',
    description: '12 general ward patients have exceeded the expected Length of Stay (LOS) by >48 hours. Early discharge with home care could free 12 beds.',
    impact: 'Free 12 beds, save ₹1.2L in bed costs',
    is_acknowledged: false,
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    agent: 'Pharmacy Intelligence Agent',
    category: 'Pharmacy',
    priority: 'high',
    title: 'Reorder Ceftriaxone 1g — stock critically low (78 units)',
    description: 'Ceftriaxone injection stock is at 78 units, below the minimum threshold of 100. Estimated stock-out in 5 days.',
    impact: 'Prevent stock-out, avoid treatment delays',
    is_acknowledged: true,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    agent: 'Staff Allocation Agent',
    category: 'Staffing',
    priority: 'high',
    title: 'ICU nurse shortage predicted for tonight (10PM–6AM shift)',
    description: '3 ICU nurses called out sick. Current ICU patient count is 17 with only 4 nurses scheduled. Safe ratio is 1:2.',
    impact: 'Maintain safe nurse:patient ratio',
    is_acknowledged: false,
    created_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    agent: 'Revenue Optimization Agent',
    category: 'Revenue',
    priority: 'medium',
    title: '₹4.2L in insurance claims require immediate documentation',
    description: '12 insurance claims totaling ₹4.2L are at risk of rejection due to missing documentation.',
    impact: 'Recover ₹4.2L in pending claims',
    is_acknowledged: false,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    agent: 'Equipment Agent',
    category: 'Equipment',
    priority: 'high',
    title: 'Endoscopy system maintenance required — failure risk 75%',
    description: 'Predictive maintenance model indicates 75% failure probability for Endoscopy System within 72 hours.',
    impact: 'Prevent unplanned downtime',
    is_acknowledged: false,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockAgents = [
  { name: 'Executive Decision Agent',       key: 'executive',      icon: '🎯', category: 'Intelligence', status: 'running', run_count_today: 142, avg_runtime_ms: 820,  health_score: 98.2, alerts_raised: 2, recommendations_generated: 4 },
  { name: 'Patient Flow Agent',             key: 'patient_flow',   icon: '🚶', category: 'Operations',   status: 'running', run_count_today: 189, avg_runtime_ms: 540,  health_score: 97.8, alerts_raised: 1, recommendations_generated: 3 },
  { name: 'Appointment Optimization Agent', key: 'appointment',    icon: '📅', category: 'Scheduling',   status: 'idle',    run_count_today: 96,  avg_runtime_ms: 430,  health_score: 99.1, alerts_raised: 0, recommendations_generated: 2 },
  { name: 'Bed Intelligence Agent',         key: 'beds',           icon: '🛏️',  category: 'Resources',    status: 'running', run_count_today: 211, avg_runtime_ms: 680,  health_score: 96.4, alerts_raised: 3, recommendations_generated: 5 },
  { name: 'Emergency Response Agent',       key: 'emergency',      icon: '🚨', category: 'Emergency',    status: 'running', run_count_today: 342, avg_runtime_ms: 380,  health_score: 100,  alerts_raised: 4, recommendations_generated: 6 },
  { name: 'Staff Allocation Agent',         key: 'staff',          icon: '👨‍⚕️',  category: 'Staffing',     status: 'running', run_count_today: 124, avg_runtime_ms: 590,  health_score: 95.3, alerts_raised: 2, recommendations_generated: 3 },
  { name: 'Laboratory Intelligence Agent',  key: 'laboratory',     icon: '🔬', category: 'Clinical',     status: 'idle',    run_count_today: 187, avg_runtime_ms: 720,  health_score: 98.7, alerts_raised: 2, recommendations_generated: 4 },
  { name: 'Pharmacy Intelligence Agent',    key: 'pharmacy',       icon: '💊', category: 'Supply',       status: 'running', run_count_today: 78,  avg_runtime_ms: 860,  health_score: 97.2, alerts_raised: 3, recommendations_generated: 4 },
  { name: 'Medical Equipment Agent',        key: 'equipment',      icon: '⚙️',  category: 'Maintenance',  status: 'idle',    run_count_today: 42,  avg_runtime_ms: 940,  health_score: 94.8, alerts_raised: 2, recommendations_generated: 3 },
  { name: 'Billing Intelligence Agent',     key: 'billing',        icon: '💰', category: 'Finance',      status: 'error',   run_count_today: 54,  avg_runtime_ms: 1240, health_score: 42.1, alerts_raised: 1, recommendations_generated: 2 },
  { name: 'Insurance Agent',               key: 'insurance',      icon: '📋', category: 'Finance',      status: 'idle',    run_count_today: 48,  avg_runtime_ms: 980,  health_score: 99.0, alerts_raised: 1, recommendations_generated: 2 },
  { name: 'Revenue Optimization Agent',    key: 'revenue',        icon: '📈', category: 'Finance',      status: 'idle',    run_count_today: 28,  avg_runtime_ms: 1100, health_score: 97.5, alerts_raised: 0, recommendations_generated: 3 },
  { name: 'Predictive Analytics Agent',    key: 'predictive',     icon: '🔮', category: 'Intelligence', status: 'running', run_count_today: 18,  avg_runtime_ms: 2340, health_score: 96.8, alerts_raised: 1, recommendations_generated: 4 },
  { name: 'Root Cause Analysis Agent',     key: 'root_cause',     icon: '🔍', category: 'Intelligence', status: 'idle',    run_count_today: 12,  avg_runtime_ms: 1860, health_score: 98.4, alerts_raised: 0, recommendations_generated: 2 },
  { name: 'Recommendation Agent',          key: 'recommendation', icon: '💡', category: 'Intelligence', status: 'running', run_count_today: 234, avg_runtime_ms: 280,  health_score: 99.3, alerts_raised: 5, recommendations_generated: 10 },
];

export const mockEmergencyCases = [
  { id: '1', case_number: 'ER-02001', patient_name: 'Rajesh Kumar',    age: 62, gender: 'Male',   chief_complaint: 'Chest pain',              triage_level: 1, triage_label: 'Resuscitation', triage_color: '#ef4444', wait_minutes: 2,  status: 'in_treatment', priority: 'critical', arrival_mode: 'Ambulance' },
  { id: '2', case_number: 'ER-02002', patient_name: 'Priya Sharma',    age: 45, gender: 'Female', chief_complaint: 'Stroke symptoms',         triage_level: 1, triage_label: 'Resuscitation', triage_color: '#ef4444', wait_minutes: 1,  status: 'critical',     priority: 'critical', arrival_mode: 'Ambulance' },
  { id: '3', case_number: 'ER-02003', patient_name: 'Mohammed Ali',    age: 34, gender: 'Male',   chief_complaint: 'Shortness of breath',     triage_level: 2, triage_label: 'Emergent',      triage_color: '#f97316', wait_minutes: 8,  status: 'in_triage',    priority: 'critical', arrival_mode: 'Self' },
  { id: '4', case_number: 'ER-02004', patient_name: 'Sunita Patel',    age: 28, gender: 'Female', chief_complaint: 'Severe abdominal pain',   triage_level: 2, triage_label: 'Emergent',      triage_color: '#f97316', wait_minutes: 12, status: 'waiting',      priority: 'high',     arrival_mode: 'Walk-in' },
  { id: '5', case_number: 'ER-02005', patient_name: 'Vikram Singh',    age: 55, gender: 'Male',   chief_complaint: 'Diabetic emergency',      triage_level: 2, triage_label: 'Emergent',      triage_color: '#f97316', wait_minutes: 15, status: 'waiting',      priority: 'high',     arrival_mode: 'Ambulance' },
  { id: '6', case_number: 'ER-02006', patient_name: 'Lakshmi Nair',    age: 41, gender: 'Female', chief_complaint: 'High fever and chills',   triage_level: 3, triage_label: 'Urgent',        triage_color: '#f59e0b', wait_minutes: 28, status: 'waiting',      priority: 'high',     arrival_mode: 'Self' },
  { id: '7', case_number: 'ER-02007', patient_name: 'Arjun Mehta',     age: 72, gender: 'Male',   chief_complaint: 'Fall and head injury',    triage_level: 3, triage_label: 'Urgent',        triage_color: '#f59e0b', wait_minutes: 22, status: 'in_triage',    priority: 'high',     arrival_mode: 'Walk-in' },
  { id: '8', case_number: 'ER-02008', patient_name: 'Deepika Rao',     age: 23, gender: 'Female', chief_complaint: 'Allergic reaction',       triage_level: 3, triage_label: 'Urgent',        triage_color: '#f59e0b', wait_minutes: 35, status: 'waiting',      priority: 'medium',   arrival_mode: 'Walk-in' },
  { id: '9', case_number: 'ER-02009', patient_name: 'Suresh Iyer',     age: 48, gender: 'Male',   chief_complaint: 'Back pain',               triage_level: 4, triage_label: 'Semi-Urgent',   triage_color: '#22c55e', wait_minutes: 54, status: 'waiting',      priority: 'medium',   arrival_mode: 'Self' },
  { id: '10',case_number: 'ER-02010', patient_name: 'Ananya Gupta',    age: 18, gender: 'Female', chief_complaint: 'Sore throat and fever',   triage_level: 5, triage_label: 'Non-Urgent',    triage_color: '#6b7280', wait_minutes: 78, status: 'waiting',      priority: 'low',      arrival_mode: 'Walk-in' },
];

export const mockPharmacyInventory = [
  { code: 'MED-001', name: 'Paracetamol 500mg',        category: 'Analgesic',      current_stock: 2380, min: 500,  status: 'ok',       expiry_days: 420, expiry_status: 'ok',       unit_cost: 2.50,   monthly_consumption: 800  },
  { code: 'MED-002', name: 'Amoxicillin 250mg',        category: 'Antibiotic',     current_stock: 1820, min: 400,  status: 'ok',       expiry_days: 280, expiry_status: 'ok',       unit_cost: 8.00,   monthly_consumption: 600  },
  { code: 'MED-003', name: 'Metformin 500mg',          category: 'Antidiabetic',   current_stock: 910,  min: 300,  status: 'ok',       expiry_days: 365, expiry_status: 'ok',       unit_cost: 5.50,   monthly_consumption: 400  },
  { code: 'MED-004', name: 'Atenolol 50mg',            category: 'Cardiovascular', current_stock: 128,  min: 200,  status: 'low',      expiry_days: 190, expiry_status: 'ok',       unit_cost: 12.00,  monthly_consumption: 250  },
  { code: 'MED-005', name: 'Omeprazole 20mg',          category: 'Antacid',        current_stock: 640,  min: 300,  status: 'ok',       expiry_days: 88,  expiry_status: 'warning',  unit_cost: 7.00,   monthly_consumption: 350  },
  { code: 'MED-006', name: 'Amlodipine 5mg',           category: 'Cardiovascular', current_stock: 445,  min: 200,  status: 'ok',       expiry_days: 520, expiry_status: 'ok',       unit_cost: 15.00,  monthly_consumption: 200  },
  { code: 'MED-007', name: 'Ceftriaxone 1g Injection', category: 'Antibiotic',     current_stock: 78,   min: 100,  status: 'critical', expiry_days: 145, expiry_status: 'ok',       unit_cost: 45.00,  monthly_consumption: 450  },
  { code: 'MED-008', name: 'Morphine 10mg Injection',  category: 'Analgesic',      current_stock: 48,   min: 80,   status: 'critical', expiry_days: 280, expiry_status: 'ok',       unit_cost: 35.00,  monthly_consumption: 120  },
  { code: 'MED-009', name: 'Insulin Regular 100IU',    category: 'Antidiabetic',   current_stock: 62,   min: 150,  status: 'critical', expiry_days: 28,  expiry_status: 'critical', unit_cost: 120.00, monthly_consumption: 180  },
  { code: 'MED-010', name: 'Salbutamol Inhaler',       category: 'Respiratory',    current_stock: 182,  min: 200,  status: 'low',      expiry_days: 340, expiry_status: 'ok',       unit_cost: 25.00,  monthly_consumption: 220  },
  { code: 'MED-011', name: 'Warfarin 5mg',             category: 'Anticoagulant',  current_stock: 355,  min: 100,  status: 'ok',       expiry_days: 410, expiry_status: 'ok',       unit_cost: 18.00,  monthly_consumption: 150  },
  { code: 'MED-012', name: 'Dexamethasone 4mg',        category: 'Steroid',        current_stock: 228,  min: 150,  status: 'ok',       expiry_days: 22,  expiry_status: 'critical', unit_cost: 22.00,  monthly_consumption: 200  },
  { code: 'MED-013', name: 'Furosemide 40mg',          category: 'Diuretic',       current_stock: 418,  min: 200,  status: 'ok',       expiry_days: 290, expiry_status: 'ok',       unit_cost: 8.00,   monthly_consumption: 300  },
  { code: 'MED-014', name: 'Vancomycin 500mg',         category: 'Antibiotic',     current_stock: 34,   min: 60,   status: 'critical', expiry_days: 180, expiry_status: 'ok',       unit_cost: 180.00, monthly_consumption: 80   },
  { code: 'MED-015', name: 'Ondansetron 4mg',          category: 'Antiemetic',     current_stock: 572,  min: 200,  status: 'ok',       expiry_days: 460, expiry_status: 'ok',       unit_cost: 12.00,  monthly_consumption: 280  },
];

export const mockEquipment = [
  { id: 'EQ-001', name: 'MRI Scanner',           category: 'Imaging',      dept: 'Radiology',     utilization: 87, status: 'operational',  failure_risk: 0.12, failure_risk_level: 'low',      is_critical: true  },
  { id: 'EQ-002', name: 'CT Scanner',            category: 'Imaging',      dept: 'Radiology',     utilization: 92, status: 'operational',  failure_risk: 0.18, failure_risk_level: 'medium',   is_critical: true  },
  { id: 'EQ-003', name: 'Ventilator Unit A',     category: 'Life Support', dept: 'ICU',           utilization: 75, status: 'in_use',       failure_risk: 0.08, failure_risk_level: 'low',      is_critical: true  },
  { id: 'EQ-004', name: 'Ventilator Unit B',     category: 'Life Support', dept: 'ICU',           utilization: 60, status: 'in_use',       failure_risk: 0.10, failure_risk_level: 'low',      is_critical: true  },
  { id: 'EQ-005', name: 'Defibrillator',         category: 'Emergency',    dept: 'Emergency',     utilization: 45, status: 'operational',  failure_risk: 0.05, failure_risk_level: 'low',      is_critical: true  },
  { id: 'EQ-006', name: 'X-Ray Machine',         category: 'Imaging',      dept: 'Radiology',     utilization: 78, status: 'operational',  failure_risk: 0.22, failure_risk_level: 'medium',   is_critical: false },
  { id: 'EQ-007', name: 'Ultrasound Scanner',    category: 'Imaging',      dept: 'Radiology',     utilization: 65, status: 'operational',  failure_risk: 0.09, failure_risk_level: 'low',      is_critical: false },
  { id: 'EQ-008', name: 'ECG Machine',           category: 'Cardiac',      dept: 'Cardiology',    utilization: 55, status: 'operational',  failure_risk: 0.07, failure_risk_level: 'low',      is_critical: false },
  { id: 'EQ-009', name: 'Dialysis Machine',      category: 'Renal',        dept: 'ICU',           utilization: 70, status: 'maintenance',  failure_risk: 0.35, failure_risk_level: 'high',     is_critical: true  },
  { id: 'EQ-010', name: 'Infusion Pump Set',     category: 'Infusion',     dept: 'General',       utilization: 82, status: 'in_use',       failure_risk: 0.11, failure_risk_level: 'low',      is_critical: false },
  { id: 'EQ-011', name: 'Surgical Robot',        category: 'Surgery',      dept: 'Surgery',       utilization: 40, status: 'operational',  failure_risk: 0.15, failure_risk_level: 'medium',   is_critical: false },
  { id: 'EQ-012', name: 'Patient Monitor Array', category: 'Monitoring',   dept: 'ICU',           utilization: 95, status: 'in_use',       failure_risk: 0.06, failure_risk_level: 'low',      is_critical: true  },
  { id: 'EQ-013', name: 'Anesthesia Machine',    category: 'Anesthesia',   dept: 'Surgery',       utilization: 50, status: 'operational',  failure_risk: 0.08, failure_risk_level: 'low',      is_critical: true  },
  { id: 'EQ-014', name: 'Blood Gas Analyzer',    category: 'Laboratory',   dept: 'Laboratory',    utilization: 72, status: 'operational',  failure_risk: 0.14, failure_risk_level: 'low',      is_critical: false },
  { id: 'EQ-015', name: 'Endoscopy System',      category: 'Endoscopy',    dept: 'Surgery',       utilization: 55, status: 'faulty',       failure_risk: 0.75, failure_risk_level: 'critical',  is_critical: false },
];

export function formatCurrency(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount.toFixed(0)}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN');
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    critical: '#ef4444',
    high:     '#f97316',
    medium:   '#f59e0b',
    low:      '#22c55e',
  };
  return map[priority] || '#6b7280';
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    running:     '#10b981',
    idle:        '#6b7280',
    error:       '#ef4444',
    operational: '#10b981',
    in_use:      '#3b82f6',
    maintenance: '#f59e0b',
    faulty:      '#ef4444',
    offline:     '#6b7280',
    ok:          '#10b981',
    low:         '#f59e0b',
    critical:    '#ef4444',
  };
  return map[status] || '#6b7280';
}
