import React from 'react';
import {
  Play,
  Layers,
  Store,
  AlertOctagon,
  LayoutDashboard,
  Users,
  Briefcase,
  Radar,
  Code2,
  CheckCircle2,
  Rocket,
  Wrench,
  DollarSign,
  Network,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { NavigationTab, OperatingMode, UnitEconomics } from '../types';
import { INITIAL_UNIT_ECONOMICS } from '../data/initialData';

export interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  mode?: OperatingMode;
  onModeChange?: (mode: OperatingMode) => void;
  economics?: UnitEconomics;
  isEmergencyStopped: boolean;
  onToggleEmergencyStop: () => void;
  onOpenLoopRunner: () => void;
  activeAgentsCount?: number;
  businessesCount?: number;
  activeBusinessCount?: number;
  netEconomicOutput?: number;
}

const NAV_ITEMS: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
  { id: 'workforce', label: 'Workforce', icon: Users },
  { id: 'projects', label: 'Business Units', icon: Briefcase },
  { id: 'opportunities', label: 'Radar', icon: Radar },
  { id: 'studio', label: 'Studio', icon: Code2 },
  { id: 'testing', label: 'QA & Gates', icon: CheckCircle2 },
  { id: 'deployments', label: 'Deployments', icon: Rocket },
  { id: 'monitoring', label: 'Self-Healing', icon: Wrench },
  { id: 'finance', label: 'Financial Center', icon: DollarSign },
  { id: 'knowledge', label: 'Knowledge Graph', icon: Network },
  { id: 'growth', label: 'Experiments', icon: TrendingUp },
  { id: 'security', label: 'Audit & Invariants', icon: ShieldCheck },
  { id: 'marketplace', label: 'Storefront', icon: Store },
];

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  mode,
  onModeChange,
  economics,
  isEmergencyStopped,
  onToggleEmergencyStop,
  onOpenLoopRunner,
  activeAgentsCount = 6,
  businessesCount,
  activeBusinessCount = 4,
  netEconomicOutput,
}) => {
  // Defensive fallback against undefined economics
  const eco = economics || INITIAL_UNIT_ECONOMICS;
  const grossRevenue = eco.grossRevenue ?? 0;
  const aiCosts = eco.aiCosts ?? 0;
  const infraCosts = eco.infraCosts ?? 0;
  const apiCosts = eco.apiCosts ?? 0;
  const paymentFees = eco.paymentFees ?? 0;
  const totalCosts = aiCosts + infraCosts + apiCosts + paymentFees;
  const netOutput = eco.netEconomicOutput ?? (netEconomicOutput ?? (grossRevenue - totalCosts));
  const marginPercent = eco.marginPercent ?? (grossRevenue > 0 ? Math.round((netOutput / grossRevenue) * 100) : 0);

  const displayBusinesses = businessesCount ?? activeBusinessCount;
  const effectiveMode: OperatingMode = mode || (currentTab === 'marketplace' ? 'marketplace' : 'command_center');

  const handleModeToggle = (targetMode: OperatingMode) => {
    if (onModeChange) {
      onModeChange(targetMode);
    }
    if (targetMode === 'marketplace') {
      onSelectTab('marketplace');
    } else if (currentTab === 'marketplace') {
      onSelectTab('dashboard');
    }
  };

  return (
    <header id="stassen-global-header" className="bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-0 z-40">
      {/* Top emergency status ticker if engaged */}
      {isEmergencyStopped && (
        <div id="emergency-banner" className="bg-red-600 text-white px-4 py-2 text-xs font-mono font-bold flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4" />
            <span>EMERGENCY STOP ACTIVE: All autonomous worker threads, automated deployments, and financial transfers are locked.</span>
          </div>
          <button
            onClick={onToggleEmergencyStop}
            id="emergency-resume-btn"
            className="px-3 py-0.5 bg-white text-red-700 rounded text-xs font-semibold hover:bg-stone-100 uppercase tracking-wider"
          >
            Disengage & Resume
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Brand Identity & Vision Subtitle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-extrabold text-lg hover:border-emerald-400 transition"
              title="Return to Command Center"
            >
              S
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-lg text-white font-mono">
                  STASSEN<span className="text-emerald-400">.IO</span>
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono border border-stone-700/60">
                  AUTONOMOUS DIGITAL-BUSINESS OS
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                Master Blueprint &bull; Private Command Center &bull; Zero Single Point of Failure
              </p>
            </div>
          </div>

          {/* Real-time Economic Formula Ticker */}
          <div className="hidden lg:flex items-center gap-4 bg-stone-950/80 px-4 py-1.5 rounded-lg border border-stone-800 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-stone-300">Live Economics:</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <span className="text-emerald-400 font-bold">${grossRevenue.toLocaleString()}</span>
              <span className="text-stone-500">Gross</span>
              <span className="text-stone-600">-</span>
              <span className="text-amber-400">${totalCosts.toLocaleString()}</span>
              <span className="text-stone-500">Costs</span>
              <span className="text-stone-600">=</span>
              <span className="text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                +${netOutput.toLocaleString()}/mo Net ({marginPercent}%)
              </span>
            </div>
          </div>

          {/* Actions & Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* View Mode Toggle: Command Center vs Marketplace */}
            <div className="bg-stone-950 p-1 rounded-lg border border-stone-800 flex items-center text-xs font-medium">
              <button
                id="mode-command-btn"
                onClick={() => handleModeToggle('command_center')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition ${
                  effectiveMode === 'command_center'
                    ? 'bg-stone-800 text-emerald-400 font-semibold shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Command Center</span>
              </button>
              <button
                id="mode-marketplace-btn"
                onClick={() => handleModeToggle('marketplace')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition ${
                  effectiveMode === 'marketplace'
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Storefront (Phase 15)</span>
              </button>
            </div>

            {/* Run Autonomous Loop Button */}
            <button
              id="trigger-autonomous-loop-btn"
              onClick={onOpenLoopRunner}
              disabled={isEmergencyStopped}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition ${
                isEmergencyStopped
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md shadow-emerald-500/20 active:scale-95'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Loop</span>
            </button>

            {/* Emergency Stop Button */}
            <button
              id="global-emergency-stop-btn"
              onClick={onToggleEmergencyStop}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                isEmergencyStopped
                  ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500 hover:bg-emerald-600/30'
                  : 'bg-red-950/60 text-red-400 border-red-800/80 hover:bg-red-900/60 hover:text-red-300'
              }`}
              title={isEmergencyStopped ? 'Disengage Emergency Stop' : 'Immediately halt all AI workers'}
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEmergencyStopped ? 'Resume System' : 'Emergency Stop'}</span>
            </button>
          </div>

        </div>

        {/* Global Navigation Bar */}
        <nav className="mt-3 pt-2.5 border-t border-stone-800/70 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === 'finance' && currentTab === 'financial');
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition text-xs font-mono ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-semibold'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sub-header system badges */}
        <div className="mt-2 pt-2 border-t border-stone-800/50 flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-400 gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Architecture: <strong className="text-stone-200">Decentralized Mesh (0 SPOF)</strong></span>
            </span>
            <span className="text-stone-600">&bull;</span>
            <span>Businesses: <strong className="text-stone-200">{displayBusinesses} Active Units</strong></span>
            <span className="text-stone-600">&bull;</span>
            <span>Workforce: <strong className="text-stone-200">{activeAgentsCount} Agents Synchronized</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-500">Provider Mesh:</span>
            <span className="px-1.5 py-0.5 rounded bg-stone-800/80 border border-stone-700/60 text-stone-300">Gemini 2.5 / Pro</span>
            <span className="px-1.5 py-0.5 rounded bg-stone-800/80 border border-stone-700/60 text-stone-300">Docker Adapters</span>
            <span className="px-1.5 py-0.5 rounded bg-stone-800/80 border border-stone-700/60 text-stone-300">Stripe Central</span>
          </div>
        </div>
      </div>
    </header>
  );
};

