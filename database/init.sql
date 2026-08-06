-- MediSphere AI — PostgreSQL Database Schema
-- Version: 1.0

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
CREATE TYPE blood_group_enum AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE patient_status_enum AS ENUM ('registered', 'waiting', 'in_consultation', 'in_lab', 'in_pharmacy', 'in_billing', 'discharged', 'admitted', 'critical');
CREATE TYPE bed_type_enum AS ENUM ('icu', 'general', 'emergency', 'private', 'pediatric', 'maternity', 'surgical');
CREATE TYPE bed_status_enum AS ENUM ('available', 'occupied', 'reserved', 'maintenance', 'cleaning');
CREATE TYPE appointment_status_enum AS ENUM ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show', 'rescheduled');
CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE staff_role_enum AS ENUM ('doctor', 'nurse', 'technician', 'admin', 'pharmacist', 'lab_technician', 'support');
CREATE TYPE shift_enum AS ENUM ('morning', 'afternoon', 'night', 'on_call');
CREATE TYPE equipment_status_enum AS ENUM ('operational', 'in_use', 'maintenance', 'faulty', 'offline');
CREATE TYPE claim_status_enum AS ENUM ('submitted', 'under_review', 'approved', 'rejected', 'pending_documents');
CREATE TYPE notification_type_enum AS ENUM ('alert', 'info', 'warning', 'critical');
CREATE TYPE agent_status_enum AS ENUM ('running', 'idle', 'error', 'paused');

-- ============================================================
-- DEPARTMENTS
-- ============================================================

CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    head_doctor_id UUID,
    floor_number INTEGER,
    bed_capacity INTEGER DEFAULT 0,
    current_occupancy INTEGER DEFAULT 0,
    phone_extension VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- STAFF
-- ============================================================

CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role staff_role_enum NOT NULL,
    specialization VARCHAR(100),
    department_id UUID REFERENCES departments(id),
    shift shift_enum DEFAULT 'morning',
    is_on_duty BOOLEAN DEFAULT false,
    workload_score FLOAT DEFAULT 0.0,
    years_experience INTEGER DEFAULT 0,
    qualification VARCHAR(200),
    license_number VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- PATIENTS
-- ============================================================

CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender gender_enum NOT NULL,
    blood_group blood_group_enum,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    insurance_provider VARCHAR(100),
    insurance_number VARCHAR(50),
    allergies TEXT[],
    chronic_conditions TEXT[],
    status patient_status_enum DEFAULT 'registered',
    current_department_id UUID REFERENCES departments(id),
    registration_date TIMESTAMP DEFAULT NOW(),
    last_visit TIMESTAMP,
    total_visits INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- BEDS
-- ============================================================

CREATE TABLE wards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    department_id UUID REFERENCES departments(id),
    floor_number INTEGER,
    total_beds INTEGER DEFAULT 0,
    available_beds INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE beds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bed_number VARCHAR(20) UNIQUE NOT NULL,
    ward_id UUID REFERENCES wards(id),
    department_id UUID REFERENCES departments(id),
    bed_type bed_type_enum NOT NULL,
    status bed_status_enum DEFAULT 'available',
    current_patient_id UUID REFERENCES patients(id),
    admitted_at TIMESTAMP,
    expected_discharge TIMESTAMP,
    floor_number INTEGER,
    room_number VARCHAR(20),
    is_monitored BOOLEAN DEFAULT false,
    daily_rate NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- APPOINTMENTS
-- ============================================================

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id) NOT NULL,
    doctor_id UUID REFERENCES staff(id) NOT NULL,
    department_id UUID REFERENCES departments(id),
    scheduled_at TIMESTAMP NOT NULL,
    duration_minutes INTEGER DEFAULT 20,
    status appointment_status_enum DEFAULT 'scheduled',
    appointment_type VARCHAR(50) DEFAULT 'outpatient',
    chief_complaint TEXT,
    notes TEXT,
    priority priority_enum DEFAULT 'medium',
    no_show_risk FLOAT DEFAULT 0.0,
    actual_start TIMESTAMP,
    actual_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- EMERGENCY
-- ============================================================

CREATE TABLE emergency_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id),
    patient_name VARCHAR(200),
    age INTEGER,
    arrival_time TIMESTAMP DEFAULT NOW(),
    arrival_mode VARCHAR(50),
    chief_complaint TEXT NOT NULL,
    triage_level INTEGER CHECK (triage_level BETWEEN 1 AND 5),
    priority priority_enum DEFAULT 'high',
    status VARCHAR(50) DEFAULT 'waiting',
    assigned_doctor_id UUID REFERENCES staff(id),
    assigned_bed_id UUID REFERENCES beds(id),
    vital_signs JSONB,
    notes TEXT,
    admitted_to_icu BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP,
    wait_time_minutes INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- LABORATORY
-- ============================================================

CREATE TABLE lab_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_code VARCHAR(20) UNIQUE NOT NULL,
    test_name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    normal_turnaround_hours FLOAT DEFAULT 2.0,
    cost NUMERIC(10,2),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE lab_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id) NOT NULL,
    doctor_id UUID REFERENCES staff(id),
    test_id UUID REFERENCES lab_tests(id) NOT NULL,
    ordered_at TIMESTAMP DEFAULT NOW(),
    sample_collected_at TIMESTAMP,
    testing_started_at TIMESTAMP,
    result_ready_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ordered',
    priority priority_enum DEFAULT 'medium',
    result JSONB,
    is_critical BOOLEAN DEFAULT false,
    turnaround_hours FLOAT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- PHARMACY
-- ============================================================

CREATE TABLE medicines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    category VARCHAR(100),
    manufacturer VARCHAR(200),
    unit VARCHAR(50),
    unit_cost NUMERIC(10,2),
    current_stock INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 50,
    maximum_stock INTEGER DEFAULT 1000,
    reorder_point INTEGER DEFAULT 100,
    expiry_date DATE,
    storage_conditions VARCHAR(200),
    is_controlled BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    last_restocked TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prescription_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id) NOT NULL,
    doctor_id UUID REFERENCES staff(id) NOT NULL,
    appointment_id UUID REFERENCES appointments(id),
    prescribed_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    total_cost NUMERIC(10,2),
    dispensed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE prescription_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prescription_id UUID REFERENCES prescriptions(id) NOT NULL,
    medicine_id UUID REFERENCES medicines(id) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    duration_days INTEGER,
    quantity INTEGER,
    unit_cost NUMERIC(10,2),
    total_cost NUMERIC(10,2)
);

-- ============================================================
-- EQUIPMENT
-- ============================================================

CREATE TABLE equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    equipment_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    model VARCHAR(200),
    manufacturer VARCHAR(200),
    serial_number VARCHAR(100),
    department_id UUID REFERENCES departments(id),
    location VARCHAR(200),
    status equipment_status_enum DEFAULT 'operational',
    purchase_date DATE,
    warranty_expiry DATE,
    last_maintenance DATE,
    next_maintenance DATE,
    total_usage_hours FLOAT DEFAULT 0,
    daily_usage_hours FLOAT DEFAULT 0,
    utilization_rate FLOAT DEFAULT 0,
    failure_risk_score FLOAT DEFAULT 0,
    is_critical BOOLEAN DEFAULT false,
    daily_cost NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- BILLING
-- ============================================================

CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bill_number VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id) NOT NULL,
    appointment_id UUID REFERENCES appointments(id),
    admission_date TIMESTAMP,
    discharge_date TIMESTAMP,
    total_amount NUMERIC(12,2) DEFAULT 0,
    paid_amount NUMERIC(12,2) DEFAULT 0,
    pending_amount NUMERIC(12,2) DEFAULT 0,
    discount_amount NUMERIC(12,2) DEFAULT 0,
    insurance_covered NUMERIC(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    items JSONB,
    notes TEXT,
    is_flagged BOOLEAN DEFAULT false,
    anomaly_reason TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- INSURANCE CLAIMS
-- ============================================================

CREATE TABLE insurance_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_number VARCHAR(20) UNIQUE NOT NULL,
    patient_id UUID REFERENCES patients(id) NOT NULL,
    bill_id UUID REFERENCES bills(id),
    insurance_provider VARCHAR(200) NOT NULL,
    policy_number VARCHAR(100),
    claim_amount NUMERIC(12,2) NOT NULL,
    approved_amount NUMERIC(12,2),
    status claim_status_enum DEFAULT 'submitted',
    submitted_at TIMESTAMP DEFAULT NOW(),
    reviewed_at TIMESTAMP,
    resolved_at TIMESTAMP,
    approval_probability FLOAT DEFAULT 0.0,
    rejection_reason TEXT,
    documents_required TEXT[],
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- AI AGENTS
-- ============================================================

CREATE TABLE agent_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_name VARCHAR(100) NOT NULL,
    status agent_status_enum DEFAULT 'idle',
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    duration_ms INTEGER,
    output JSONB,
    error_message TEXT,
    triggered_by VARCHAR(100) DEFAULT 'scheduler',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    priority priority_enum NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    impact VARCHAR(200),
    action_required BOOLEAN DEFAULT true,
    is_acknowledged BOOLEAN DEFAULT false,
    acknowledged_by UUID REFERENCES staff(id),
    acknowledged_at TIMESTAMP,
    expires_at TIMESTAMP,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type notification_type_enum NOT NULL,
    title VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    target_roles TEXT[],
    target_departments TEXT[],
    is_read BOOLEAN DEFAULT false,
    is_sent BOOLEAN DEFAULT false,
    source_agent VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- USERS (Auth)
-- ============================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    role VARCHAR(50) NOT NULL,
    staff_id UUID REFERENCES staff(id),
    department_id UUID REFERENCES departments(id),
    is_active BOOLEAN DEFAULT true,
    is_superuser BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOG
-- ============================================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(200) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_patients_patient_id ON patients(patient_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_beds_status ON beds(status);
CREATE INDEX idx_beds_type ON beds(bed_type);
CREATE INDEX idx_emergency_triage ON emergency_cases(triage_level, arrival_time);
CREATE INDEX idx_lab_orders_status ON lab_orders(status);
CREATE INDEX idx_medicines_stock ON medicines(current_stock);
CREATE INDEX idx_bills_status ON bills(status);
CREATE INDEX idx_claims_status ON insurance_claims(status);
CREATE INDEX idx_recommendations_priority ON recommendations(priority, is_acknowledged);
CREATE INDEX idx_notifications_unread ON notifications(is_read, created_at);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, created_at);
