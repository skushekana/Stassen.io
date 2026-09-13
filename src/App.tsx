import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AutonomousLoopModal } from './components/AutonomousLoopModal';
import { DashboardTab } from './components/tabs/DashboardTab';
import { WorkforceTab } from './components/tabs/WorkforceTab';
import { ProjectsTab } from './components/tabs/ProjectsTab';
import { OpportunitiesTab } from './components/tabs/OpportunitiesTab';
import { StudioTab } from './components/tabs/StudioTab';
import { TestingQaTab } from './components/tabs/TestingQaTab';
import { DeploymentsTab } from './components/tabs/DeploymentsTab';
import { MonitoringRepairTab } from './components/tabs/MonitoringRepairTab';
import { FinancialCenterTab } from './components/tabs/FinancialCenterTab';
import { KnowledgeGraphTab } from './components/tabs/KnowledgeGraphTab';
import { GrowthExperimentsTab } from './components/tabs/GrowthExperimentsTab';
import { SecurityAuditTab } from './components/tabs/SecurityAuditTab';
import { MarketplaceStorefront } from './components/tabs/MarketplaceStorefront';

import {
  INITIAL_AGENTS,
  INITIAL_BUSINESSES,
  INITIAL_OPPORTUNITIES,
  INITIAL_UNIT_ECONOMICS,
  INITIAL_AUDIT_LOGS,
  INITIAL_INCIDENTS,
  INITIAL_EXPERIMENTS,
  INITIAL_LEDGER,
} from './data/initialData';

import {
  NavigationTab,
  JuniorBusinessUnit,
  Agent,
  MarketOpportunity,
  UnitEconomics,
  AuditLogItem,
  HealthIncident,
  Experiment,
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isLoopModalOpen, setIsLoopModalOpen] = useState<boolean>(false);
  const [isEmergencyStopped, setIsEmergencyStopped] = useState<boolean>(false);

  // Core System State
  const [businesses, setBusinesses] = useState<JuniorBusinessUnit[]>(() => {
    const saved = localStorage.getItem('stassen_businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [agents, setAgents] = useState<Agent[]>(() => {
    const saved = localStorage.getItem('stassen_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });

  const [opportunities, setOpportunities] = useState<MarketOpportunity[]>(() => {
    const saved = localStorage.getItem('stassen_opportunities');
    return saved ? JSON.parse(saved) : INITIAL_OPPORTUNITIES;
  });

  const [economics, setEconomics] = useState<UnitEconomics>(INITIAL_UNIT_ECONOMICS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [incidents, setIncidents] = useState<HealthIncident[]>(INITIAL_INCIDENTS);
  const [experiments, setExperiments] = useState<Experiment[]>(INITIAL_EXPERIMENTS);

  // Fetch server-side status if available
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          if (data.isEmergencyStopped !== undefined) {
            setIsEmergencyStopped(data.isEmergencyStopped);
          }
        }
      } catch (e) {
        // Fallback to client state
      }
    };
    fetchStatus();
  }, []);

  // Save changes locally
  useEffect(() => {
    localStorage.setItem('stassen_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('stassen_agents', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem('stassen_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  // Recalculate economics dynamically when businesses change
  useEffect(() => {
    const activeUnits = businesses.filter((b) => b.lifecycle !== 'retired');
    const gross = activeUnits.reduce((acc, b) => acc + b.monthlyRevenue, 0);
    const totalCosts = activeUnits.reduce((acc, b) => acc + b.monthlyCost, 0);
    const net = gross - totalCosts;
    const margin = gross > 0 ? Math.round((net / gross) * 100) : 0;

    setEconomics((prev) => ({
      ...prev,
      grossRevenue: gross,
      netEconomicOutput: net,
      marginPercent: margin,
    }));
  }, [businesses]);

  const handleToggleEmergencyStop = async () => {
    const targetState = !isEmergencyStopped;
    setIsEmergencyStopped(targetState);

    try {
      await fetch('/api/emergency-stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stop: targetState }),
      });
    } catch (e) {
      // Handled locally
    }

    // Add machine audit log entry
    const newAuditLog: AuditLogItem = {
      id: `audit-${Date.now()}`,
      timestamp: 'Just now',
      actor: 'Owner (Central Command)',
      action: targetState
        ? 'ENGAGED EMERGENCY STOP: Global halt on all AI decisions, releases and autonomous loops'
        : 'DISENGAGED EMERGENCY STOP: Resumed normal autonomous operations',
      target: 'Central Operating Engine',
      hash: 'sha256:9c13b28f7312e',
      reversible: true,
      status: 'confirmed',
    };
    setAuditLogs((prev) => [newAuditLog, ...prev]);
  };

  const handleCycleFinished = (result: any) => {
    // If a product was constructed or validated, integrate it
    if (result && result.constructedTitle) {
      const newBiz: JuniorBusinessUnit = {
        id: `biz-${Date.now()}`,
        codeName: `UNIT-${String.fromCharCode(65 + (businesses.length % 26))}`,
        name: result.constructedTitle,
        category: 'SaaS',
        tagline: 'Autonomous AI micro-service built during 14-stage loop execution',
        version: 'v1.0.0',
        lifecycle: 'growing',
        objective: 'Expand recurring subscriptions and automate customer onboarding',
        monthlyRevenue: 1200,
        monthlyCost: 140,
        netEconomicOutput: 1060,
        margin: 88,
        users: 45,
        activeAgents: 4,
        healthScore: 99,
        lastDeployed: 'Just now',
        domain: `${result.constructedTitle.toLowerCase().replace(/[^a-z0-9]/g, '')}.stassen.io`,
        sslValid: true,
        experimentsActive: 1,
        url: '#',
        techStack: ['React 19', 'Express', 'Tailwind', 'Stripe'],
        features: ['Automated Ingestion', 'Webhook Relays', 'Stripe Billing'],
      };
      setBusinesses((prev) => [newBiz, ...prev]);
    }
  };

  const handleAddOpportunity = (opp: MarketOpportunity) => {
    setOpportunities((prev) => [opp, ...prev]);
  };

  const handleApproveOpportunity = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, status: 'approved' } : o))
    );
    // Switch to studio or notify
    setCurrentTab('studio');
  };

  const handleDeployToSandbox = (spec: any) => {
    // Add to businesses as sandbox/staging
    const newBiz: JuniorBusinessUnit = {
      id: `biz-spec-${Date.now()}`,
      codeName: `UNIT-SBX`,
      name: spec.productName || 'Sandbox Application',
      category: 'SaaS',
      tagline: spec.tagline || 'Deploying in isolated sandbox container',
      version: 'v0.1.0-sandbox',
      lifecycle: 'weak',
      objective: 'Verify core workflows and test zero-regression invariants',
      monthlyRevenue: 0,
      monthlyCost: 50,
      netEconomicOutput: -50,
      margin: 0,
      users: 1,
      activeAgents: 2,
      healthScore: 95,
      lastDeployed: 'Just now',
      domain: 'sandbox.stassen.io/app',
      sslValid: true,
      experimentsActive: 0,
      url: '#',
      techStack: spec.techStack || ['React', 'Express', 'Tailwind'],
      features: (spec.features || []).map((f: any) => f.name || f),
    };
    setBusinesses((prev) => [newBiz, ...prev]);
    setCurrentTab('deployments');
  };

  const handleOrderCustomProduct = (order: { title: string; category: string; budget: string; description: string }) => {
    const validCategory: JuniorBusinessUnit['category'] =
      order.category === 'Web App' || order.category === 'Web Application'
        ? 'Web Application'
        : order.category === 'API Microservice' || order.category === 'API Service'
        ? 'API Service'
        : order.category === 'Digital Product'
        ? 'Digital Product'
        : 'SaaS';

    const newBiz: JuniorBusinessUnit = {
      id: `biz-commission-${Date.now()}`,
      codeName: `ORDER-${Date.now().toString().slice(-4)}`,
      name: order.title,
      category: validCategory,
      tagline: order.description.slice(0, 80) || 'Custom autonomous client commissioned build',
      version: 'v1.0.0-commissioned',
      lifecycle: 'growing',
      objective: 'Fulfill commissioned requirements with automated self-repair SLA',
      monthlyRevenue: parseInt(order.budget.replace(/[^0-9]/g, '')) || 249,
      monthlyCost: 45,
      netEconomicOutput: (parseInt(order.budget.replace(/[^0-9]/g, '')) || 249) - 45,
      margin: 82,
      users: 12,
      activeAgents: 3,
      healthScore: 100,
      lastDeployed: 'Just now',
      domain: `${order.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.stassen.io`,
      sslValid: true,
      experimentsActive: 1,
      url: '#',
      techStack: ['React', 'Express', 'TypeScript'],
      features: ['Custom Workflow', 'Stripe Connect', 'Instant Delivery'],
    };
    setBusinesses((prev) => [newBiz, ...prev]);
  };

  const handlePromoteExperiment = (id: string) => {
    setExperiments((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: 'promoted',
              actionTaken: 'Variant B promoted to 100% production traffic. Conversion lifted.',
            }
          : e
      )
    );
  };

  const handleAddIncident = (inc: HealthIncident) => {
    setIncidents((prev) => [inc, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-stone-950">
      
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        economics={economics}
        onOpenLoopRunner={() => setIsLoopModalOpen(true)}
        isEmergencyStopped={isEmergencyStopped}
        onToggleEmergencyStop={handleToggleEmergencyStop}
        activeAgentsCount={agents.filter((a) => a.status !== 'standby').length}
        businessesCount={businesses.filter((b) => b.lifecycle !== 'retired').length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {currentTab === 'dashboard' && (
          <DashboardTab
            economics={economics}
            businesses={businesses}
            opportunities={opportunities}
            auditLogs={auditLogs}
            onNavigate={setCurrentTab}
            onOpenLoopRunner={() => setIsLoopModalOpen(true)}
            isEmergencyStopped={isEmergencyStopped}
          />
        )}

        {currentTab === 'workforce' && (
          <WorkforceTab
            agents={agents}
            onUpdateAgents={setAgents}
            isEmergencyStopped={isEmergencyStopped}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsTab
            businesses={businesses}
            onUpdateBusinesses={setBusinesses}
            isEmergencyStopped={isEmergencyStopped}
          />
        )}

        {currentTab === 'opportunities' && (
          <OpportunitiesTab
            opportunities={opportunities}
            onAddOpportunity={handleAddOpportunity}
            onApproveOpportunity={handleApproveOpportunity}
            isEmergencyStopped={isEmergencyStopped}
          />
        )}

        {currentTab === 'studio' && (
          <StudioTab
            isEmergencyStopped={isEmergencyStopped}
            onDeployToSandbox={handleDeployToSandbox}
          />
        )}

        {currentTab === 'testing' && (
          <TestingQaTab isEmergencyStopped={isEmergencyStopped} />
        )}

        {currentTab === 'deployments' && (
          <DeploymentsTab isEmergencyStopped={isEmergencyStopped} />
        )}

        {currentTab === 'monitoring' && (
          <MonitoringRepairTab
            incidents={incidents}
            onAddIncident={handleAddIncident}
            isEmergencyStopped={isEmergencyStopped}
          />
        )}

        {currentTab === 'finance' && (
          <FinancialCenterTab
            economics={economics}
            ledger={INITIAL_LEDGER}
          />
        )}

        {currentTab === 'knowledge' && <KnowledgeGraphTab />}

        {currentTab === 'growth' && (
          <GrowthExperimentsTab
            experiments={experiments}
            onPromoteExperiment={handlePromoteExperiment}
            isEmergencyStopped={isEmergencyStopped}
          />
        )}

        {currentTab === 'security' && (
          <SecurityAuditTab
            auditLogs={auditLogs}
            isEmergencyStopped={isEmergencyStopped}
            onToggleEmergencyStop={handleToggleEmergencyStop}
          />
        )}

        {currentTab === 'marketplace' && (
          <MarketplaceStorefront
            businesses={businesses}
            onOrderCustomProduct={handleOrderCustomProduct}
            isEmergencyStopped={isEmergencyStopped}
          />
        )}
      </main>

      {/* Autonomous Loop Runner Modal (Section 4, 30, 31) */}
      <AutonomousLoopModal
        isOpen={isLoopModalOpen}
        onClose={() => setIsLoopModalOpen(false)}
        isEmergencyStopped={isEmergencyStopped}
        onCycleFinished={handleCycleFinished}
      />

      {/* Global Status Bar */}
      <footer className="border-t border-stone-800/80 bg-stone-900/60 backdrop-blur-xs py-3 px-6 text-xs font-mono text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-stone-300">Stassen.io Sovereign Core OS</span>
            <span>&bull;</span>
            <span className="text-stone-500">Autonomous Digital-Business Operating System</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>Model: Gemini 2.5 Flash / Pro (Server-Side)</span>
            <span>&bull;</span>
            <span>Resilience: 0 Single Point of Failure</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
