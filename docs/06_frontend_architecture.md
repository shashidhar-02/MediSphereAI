# Phase 6 — Frontend Architecture & Design System: MediSphere AI

## 1. Frontend Technology Stack
* **Framework**: Next.js 15 (App Router, Server & Client Components)
* **Language**: TypeScript 5.x (Strict Type Safety, zero `any`)
* **Styling**: Tailwind CSS v3 + CSS Custom Properties Design Tokens
* **Icons & Visuals**: Lucide React Icons, Recharts Analytics Charting
* **Accessibility**: WCAG 2.2 Level AA Standard (Accessible ARIA labels, 4.5:1 contrast ratio, high-contrast focus indicators)

---

## 2. Design System Tokens & Color Palette

### 2.1 Dark / Light Theme Tokens (`globals.css`)
* `--primary`: Deep Teal `#0F766E` (Light) / Cyan Accent `#14B8A6` (Dark)
* `--background`: Slate 50 `#F8FAFC` (Light) / Slate 950 `#020617` (Dark)
* `--surface`: Pure White `#FFFFFF` (Light) / Slate 900 `#0F172A` (Dark)
* `--accent`: Indigo `#6366F1` / Violet `#8B5CF6`
* `--warning`: Amber `#F59E0B` (Bed Cleaning / Caution)
* `--danger`: Rose `#F43F5E` (ESI 1 / Critical Triage Alert)
* `--success`: Emerald `#10B981` (Bed Available / System Healthy)

---

## 3. UI Component Hierarchy & Architecture

```
frontend/app/
├── globals.css                # Global Design System tokens & CSS utilities
├── layout.tsx                 # Root layout with ThemeProvider & Navigation
├── page.tsx                   # Landing page redirect to /dashboard
├── login/
│   └── page.tsx               # Auth Login Form with validation & JWT storage
└── dashboard/
    ├── layout.tsx             # Shared Dashboard Sidebar & Header Shell
    ├── page.tsx               # Executive Telemetry & Live KPI Overview
    ├── beds/
    │   └── page.tsx           # Bed Intelligence Ward Mapping & Transfer UI
    ├── patients/
    │   └── page.tsx           # Patient Queue & Admission Flow
    └── emergency/
        └── page.tsx           # ER Triage Matrix & Vital Sign Monitor
```

---

## 4. Accessibility & Optimistic Update Strategy

1. **WCAG 2.2 AA Compliance**:
   * All interactive elements (`<button>`, `<a href>`, `<input>`) have mandatory `aria-label`, visible keyboard focus outline (`ring-2 ring-cyan-500`), and `min-height: 44px` touch target compliance.
2. **Optimistic UI Updates**:
   * Patient transfers and bed status updates reflect immediately in UI component state before backend network response finishes. On API error, state automatically rolls back with a Toast Notification alert.
