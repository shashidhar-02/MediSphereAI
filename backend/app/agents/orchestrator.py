"""
MediSphere AI — LangGraph Agent Orchestrator
Coordinates all 14 specialized AI agents.
"""
import asyncio
from typing import Dict, List, Optional
from datetime import datetime

from app.agents.base_agent import BaseAgent, AgentOutput
from app.agents.executive_agent import ExecutiveDecisionAgent
from app.agents.patient_flow_agent import PatientFlowAgent
from app.agents.appointment_agent import AppointmentOptimizationAgent
from app.agents.bed_intelligence_agent import BedIntelligenceAgent
from app.agents.emergency_agent import EmergencyResponseAgent
from app.agents.staff_allocation_agent import StaffAllocationAgent
from app.agents.laboratory_agent import LaboratoryIntelligenceAgent
from app.agents.pharmacy_agent import PharmacyIntelligenceAgent
from app.agents.equipment_agent import MedicalEquipmentAgent
from app.agents.billing_agent import BillingIntelligenceAgent
from app.agents.insurance_agent import InsuranceAgent
from app.agents.revenue_agent import RevenueOptimizationAgent
from app.agents.predictive_analytics_agent import PredictiveAnalyticsAgent
from app.agents.root_cause_agent import RootCauseAnalysisAgent
from app.agents.recommendation_agent import RecommendationAgent


class AgentOrchestrator:
    """
    Central orchestrator that coordinates all AI agents.

    Architecture:
    - Each agent runs on its own schedule
    - Critical agents (Emergency, Beds) run every 30s
    - Analytical agents run every 5 minutes
    - Executive agent aggregates all outputs every 10 minutes

    LangGraph Integration Point:
        # Uncomment to enable full LangGraph workflow:
        # from langgraph.graph import StateGraph, END
        # workflow = StateGraph(HospitalState)
        # workflow.add_node("emergency", emergency_agent.run)
        # workflow.add_node("beds", bed_agent.run)
        # workflow.add_edge("emergency", "beds")
        # workflow.add_edge("beds", END)
        # graph = workflow.compile()
    """

    def __init__(self):
        self.agents: Dict[str, BaseAgent] = {
            "executive":      ExecutiveDecisionAgent(),
            "patient_flow":   PatientFlowAgent(),
            "appointment":    AppointmentOptimizationAgent(),
            "beds":           BedIntelligenceAgent(),
            "emergency":      EmergencyResponseAgent(),
            "staff":          StaffAllocationAgent(),
            "laboratory":     LaboratoryIntelligenceAgent(),
            "pharmacy":       PharmacyIntelligenceAgent(),
            "equipment":      MedicalEquipmentAgent(),
            "billing":        BillingIntelligenceAgent(),
            "insurance":      InsuranceAgent(),
            "revenue":        RevenueOptimizationAgent(),
            "predictive":     PredictiveAnalyticsAgent(),
            "root_cause":     RootCauseAnalysisAgent(),
            "recommendation": RecommendationAgent(),
        }
        self.is_running = False
        self.run_tasks: List[asyncio.Task] = []
        self.all_outputs: List[AgentOutput] = []

    async def start(self):
        """Start all agent loops."""
        self.is_running = True
        print(f"Starting {len(self.agents)} AI agents...")

        # Run initial analysis pass
        for name, agent in self.agents.items():
            try:
                output = await agent.run()
                self.all_outputs.append(output)
            except Exception as e:
                print(f"  Agent '{name}' initial run failed: {e}")

        print("All agents initialized")

    async def stop(self):
        """Stop all agent loops."""
        self.is_running = False
        for task in self.run_tasks:
            task.cancel()

    async def trigger_agent(self, agent_key: str) -> Optional[AgentOutput]:
        """Manually trigger a specific agent."""
        agent = self.agents.get(agent_key)
        if not agent:
            return None
        return await agent.run()

    def get_all_status(self) -> List[Dict]:
        """Get status of all agents."""
        return [agent.get_status() for agent in self.agents.values()]

    def get_all_recommendations(self) -> List[Dict]:
        """Aggregate recommendations from all agents."""
        all_recs = []
        for output in self.all_outputs:
            all_recs.extend(output.recommendations)
        all_recs.sort(key=lambda x: ["critical", "high", "medium", "low"].index(x.get("priority", "low")))
        return all_recs
