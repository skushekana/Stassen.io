import React from 'react';
import {
  TrendingUp,
  Cpu,
  Boxes,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  UnitEconomics,
  JuniorBusinessUnit,
  MarketOpportunity,
  AuditLogItem,
  NavigationTab,
} from '../../types';
import { INITIAL_UNIT_ECONOMICS } from '../../data/initialData';

interface DashboardTabProps {
  economics?: UnitEconomics;
  businesses: JuniorBusinessUnit[];
  opportunities: MarketOpportunity[];
  auditLogs: AuditLogItem[];
  onNavigate: (tab: NavigationTab) => void;
  onOpenLoopRunner: () => void;
  isEmergencyStopped: boolean;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  economics,
  businesses,
  opportunities,
  auditLogs,
  onNavigate,
  onOpenLoopRunner,
  isEmergencyStopped,
}) => {
  const eco = economics || INITIAL_UNIT_ECONOMICS;
  const activeBusinesses = businesses.filter((b) => b.lifecycle !== 'retired');
  const totalUsers = businesses.reduce((acc, b) => acc + b.users, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: One-Page North Star Vision */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold border border-emerald-800/60 uppercase tracking-widest">
                Source of Truth Vision
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Section 36 North Star
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono tracking-tight">
              Autonomous Digital-Business Operating System
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
              Stassen.io is a private command center backed by an AI organization that continuously discovers opportunities, creates capabilities, builds products, launches them, operates them, measures unit economics, improves them, scales winners and retires losers with minimal human intervention.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLoopRunner}
              disabled={isEmergencyStopped}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg text-xs font-mono font-bold transition shadow-lg shadow-emerald-500/20 active:scale-95 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Autonomous Cycle</span>
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-mono transition border border-stone-700/80 whitespace-nowrap"
            >
              <span>Portfolio View</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards (Anti-Slop, Precise & Grounded) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Net Economic Output */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
            <span>Net Economic Output</span>
            <span className="text-emerald-400 font-bold">+{eco.marginPercent ?? 0}% Margin</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">
            ${(eco.netEconomicOutput ?? 0).toLocaleString()}
            <span className="text-xs font-normal text-stone-500 ml-1">/ month</span>
          </div>
          <div className="mt-2 pt-2 border-t border-stone-800/80 text-[11px] font-mono text-stone-400 flex items-center justify-between">
            <span>Gross: ${(eco.grossRevenue ?? 0).toLocaleString()}</span>
            <span>Total Costs: ${((eco.aiCosts ?? 0) + (eco.infraCosts ?? 0) + (eco.apiCosts ?? 0) + (eco.paymentFees ?? 0)).toLocaleString()}</span>
          </div>
        </div>

        {/* Junior Business Units */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
            <span>Junior Business Units</span>
            <span className="text-stone-300 font-mono">{activeBusinesses.length} Running</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {activeBusinesses.length}
            <span className="text-xs font-normal text-stone-500 ml-1">businesses</span>
          </div>
          <div className="mt-2 pt-2 border-t border-stone-800/80 text-[11px] font-mono text-stone-400 flex items-center justify-between">
            <span className="text-emerald-400">2 Growing</span>
            <span className="text-blue-400">1 Scaling</span>
            <span className="text-amber-400">1 Weak</span>
          </div>
        </div>

        {/* Total Active Users */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
            <span>Portfolio Users</span>
            <span className="text-emerald-400 font-bold">ARPU ${eco.arpu ?? 0}</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {totalUsers.toLocaleString()}
            <span className="text-xs font-normal text-stone-500 ml-1">active users</span>
          </div>
          <div className="mt-2 pt-2 border-t border-stone-800/80 text-[11px] font-mono text-stone-400 flex items-center justify-between">
            <span>CAC: ${eco.cac ?? 0}</span>
            <span>LTV: ${eco.ltv ?? 0}</span>
          </div>
        </div>

        {/* System Resilience (0 SPOF) */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-2">
            <span>Architecture Health</span>
            <span className="text-emerald-400 font-bold">0 SPOF</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
            99.98%
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-normal border border-emerald-800">
              Optimal
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-stone-800/80 text-[11px] font-mono text-stone-400 flex items-center justify-between">
            <span>Failover Redundancy</span>
            <span className="text-stone-300">Ready</span>
          </div>
        </div>

      </div>

      {/* Scaling Gates Tracker (Section 27) */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Section 27 &bull; Scaling Gates Progress
            </span>
            <span className="text-xs text-stone-400">
              (Never scale by simply creating more products; scale after proven economics)
            </span>
          </div>
          <span className="text-xs font-mono text-stone-400">Gate 3 of 8</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-xs font-mono">
          {[
            { label: '1 PRODUCT', sub: 'Complete Loop', state: 'completed' },
            { label: 'PROVE LOOP', sub: 'Recovery & ROI', state: 'completed' },
            { label: '5 PRODUCTS', sub: 'Current Active', state: 'active' },
            { label: '10 PRODUCTS', sub: 'Gate 4', state: 'locked' },
            { label: '25 PRODUCTS', sub: 'Gate 5', state: 'locked' },
            { label: '50 PRODUCTS', sub: 'Gate 6', state: 'locked' },
            { label: '100 PRODUCTS', sub: 'Gate 7', state: 'locked' },
            { label: '1,000+ PRODS', sub: 'Full Scale', state: 'locked' },
          ].map((gate, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border flex flex-col justify-between ${
                gate.state === 'completed'
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : gate.state === 'active'
                  ? 'bg-amber-950/40 border-amber-500 text-amber-300'
                  : 'bg-stone-950 border-stone-800/60 text-stone-600'
              }`}
            >
              <div className="text-[10px] font-bold opacity-80">GATE 0{i + 1}</div>
              <div className="font-bold my-1 text-xs truncate">{gate.label}</div>
              <div className="text-[10px] opacity-70 truncate">{gate.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout: Junior Business Units vs Real-Time Activity & Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Junior Business Units Portfolio Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Junior Business Units (Portfolio Control)
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
                Section 18 & 24
              </span>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Manage Portfolio</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {businesses.map((biz) => {
              const isGrowing = biz.lifecycle === 'growing' || biz.lifecycle === 'scaling';
              const isWeak = biz.lifecycle === 'weak';
              return (
                <div
                  key={biz.id}
                  className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl p-4 flex flex-col justify-between transition group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-[11px] font-mono text-stone-500 font-semibold uppercase">
                          {biz.codeName} &bull; {biz.category}
                        </div>
                        <h4 className="text-base font-bold text-white font-mono group-hover:text-emerald-400 transition">
                          {biz.name}
                        </h4>
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                          isGrowing
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : isWeak
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-stone-800 text-stone-400 border-stone-700'
                        }`}
                      >
                        {biz.lifecycle === 'growing' ? 'INVEST / SCALE' : biz.lifecycle === 'weak' ? 'REPAIR / EXP' : biz.lifecycle}
                      </span>
                    </div>

                    <p className="text-xs text-stone-400 line-clamp-2 mb-3">
                      {biz.tagline}
                    </p>

                    <div className="grid grid-cols-3 gap-2 bg-stone-950 p-2.5 rounded-lg border border-stone-800/80 font-mono text-center">
                      <div>
                        <div className="text-[10px] text-stone-500">Revenue</div>
                        <div className="text-xs font-bold text-emerald-400">${biz.monthlyRevenue}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-stone-500">Net Output</div>
                        <div className="text-xs font-bold text-stone-200">+${biz.netEconomicOutput}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-stone-500">Users</div>
                        <div className="text-xs font-bold text-stone-300">{biz.users}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-800/60 flex items-center justify-between text-xs font-mono text-stone-400">
                    <span className="flex items-center gap-1 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Health {biz.healthScore}/100</span>
                    </span>
                    <button
                      onClick={() => onNavigate('projects')}
                      className="text-stone-300 hover:text-emerald-400 flex items-center gap-1 text-[11px]"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Discovered Opportunities & Auditable Event Feed */}
        <div className="space-y-6">
          
          {/* Discovered Opportunities Quick List */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Opportunity Discovery
              </h3>
              <button
                onClick={() => onNavigate('opportunities')}
                className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300"
              >
                View All ({opportunities.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {opportunities.slice(0, 2).map((opp) => (
                <div
                  key={opp.id}
                  className="bg-stone-950 p-3 rounded-lg border border-stone-800/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-bold">
                      Score: {opp.opportunityScore}/100
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">{opp.discoveredBy}</span>
                  </div>
                  <h5 className="text-xs font-mono font-bold text-stone-200 line-clamp-2">
                    {opp.title}
                  </h5>
                  <div className="text-[10px] font-mono text-stone-400 flex items-center justify-between pt-1 border-t border-stone-900">
                    <span>Est: {opp.estNetOutput}</span>
                    <span>Payback: {opp.paybackDays}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Machine-Auditable Activity Stream */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Auditable Activity Stream
              </h3>
              <button
                onClick={() => onNavigate('security')}
                className="text-[11px] font-mono text-stone-400 hover:text-stone-200"
              >
                Audit Log
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs max-h-60 overflow-y-auto">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-lg bg-stone-950 border border-stone-800/80 space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-bold">{log.actor}</span>
                    <span className="text-stone-500">{log.timestamp}</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-tight">
                    {log.action}
                  </p>
                  <div className="text-[9px] text-stone-500 flex items-center justify-between pt-1">
                    <span>Target: {log.target}</span>
                    <span>SHA: {log.hash.slice(0, 7)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
