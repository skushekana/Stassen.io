import React, { useState } from 'react';
import {
  Boxes,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Zap,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Play,
  Plus,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { JuniorBusinessUnit, BusinessLifecycle } from '../../types';

interface ProjectsTabProps {
  businesses: JuniorBusinessUnit[];
  onUpdateBusinesses: (businesses: JuniorBusinessUnit[]) => void;
  isEmergencyStopped: boolean;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  businesses,
  onUpdateBusinesses,
  isEmergencyStopped,
}) => {
  const [selectedLifecycle, setSelectedLifecycle] = useState<string>('All');
  const [activeModalBiz, setActiveModalBiz] = useState<JuniorBusinessUnit | null>(null);

  const filtered =
    selectedLifecycle === 'All'
      ? businesses
      : businesses.filter((b) => b.lifecycle === selectedLifecycle);

  const handleActionLifecycle = (
    bizId: string,
    newLifecycle: BusinessLifecycle,
    budgetAdjustment: number
  ) => {
    onUpdateBusinesses(
      businesses.map((b) =>
        b.id === bizId
          ? {
              ...b,
              lifecycle: newLifecycle,
              monthlyCost: Math.max(50, b.monthlyCost + budgetAdjustment),
              netEconomicOutput:
                b.monthlyRevenue - Math.max(50, b.monthlyCost + budgetAdjustment),
            }
          : b
      )
    );
  };

  const handleRetireBusiness = (bizId: string) => {
    if (confirm('Confirm retiring this underperforming business unit and reallocating compute to winning assets?')) {
      onUpdateBusinesses(
        businesses.map((b) => (b.id === bizId ? { ...b, lifecycle: 'retired' as BusinessLifecycle } : b))
      );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Portfolio Philosophy Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 18 & 24 &bull; Junior Business Units
              </span>
              <span className="text-xs font-mono text-stone-400">
                Emotional Detachment &bull; Mathematical Allocation
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono">
              Autonomous Portfolio Manager
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1">
              Each product is an autonomous junior business unit with dedicated agents, unit metrics, experiments, and health score. Winning products receive scale capital; weak products enter repair; stagnant products are retired without emotion.
            </p>
          </div>

          {/* Quick Rules Legend */}
          <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
            <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-bold">
              GROWING &rarr; INVEST / SCALE
            </span>
            <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-bold">
              WEAK &rarr; REPAIR / EXPERIMENT
            </span>
            <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-800 text-red-300 font-bold">
              FAILING &rarr; RETIRE
            </span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-stone-800/80 flex-wrap">
          {['All', 'growing', 'scaling', 'weak', 'retired'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedLifecycle(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition capitalize ${
                selectedLifecycle === status
                  ? 'bg-emerald-500 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {status} ({status === 'All' ? businesses.length : businesses.filter((b) => b.lifecycle === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((biz) => {
          const isGrowing = biz.lifecycle === 'growing' || biz.lifecycle === 'scaling';
          const isWeak = biz.lifecycle === 'weak';
          const isRetired = biz.lifecycle === 'retired';

          return (
            <div
              key={biz.id}
              className={`bg-stone-900 border rounded-xl p-5 flex flex-col justify-between transition ${
                isRetired
                  ? 'border-stone-800/60 opacity-60'
                  : isGrowing
                  ? 'border-stone-800 hover:border-emerald-500/50'
                  : 'border-amber-900/50 hover:border-amber-700'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="text-xs font-mono text-stone-500 font-semibold uppercase flex items-center gap-2">
                      <span>{biz.codeName}</span>
                      <span>&bull;</span>
                      <span className="text-stone-400">{biz.category}</span>
                      <span>&bull;</span>
                      <span className="text-stone-400">{biz.version}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-mono mt-0.5">
                      {biz.name}
                    </h3>
                  </div>

                  <span
                    className={`text-xs font-mono uppercase font-bold px-2.5 py-1 rounded border ${
                      isGrowing
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : isWeak
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-stone-800 text-stone-400 border-stone-700'
                    }`}
                  >
                    {biz.lifecycle === 'growing'
                      ? 'INVEST / SCALE'
                      : biz.lifecycle === 'weak'
                      ? 'REPAIR / EXP'
                      : biz.lifecycle}
                  </span>
                </div>

                <p className="text-xs text-stone-300 mb-3 leading-relaxed">
                  {biz.tagline}
                </p>

                {/* Economic Matrix */}
                <div className="grid grid-cols-3 gap-2 bg-stone-950 p-3 rounded-lg border border-stone-800 font-mono text-center mb-3">
                  <div>
                    <div className="text-[10px] text-stone-500">Gross Rev</div>
                    <div className="text-sm font-bold text-emerald-400">${biz.monthlyRevenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500">Net Output</div>
                    <div className="text-sm font-bold text-stone-200">+${biz.netEconomicOutput.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500">Margin</div>
                    <div className="text-sm font-bold text-emerald-300">{biz.margin}%</div>
                  </div>
                </div>

                {/* Subsystem Details */}
                <div className="text-xs font-mono space-y-1.5 text-stone-400 mb-3">
                  <div className="flex items-center justify-between">
                    <span>Active Agents:</span>
                    <span className="text-stone-200">{biz.activeAgents} workers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Registered Users:</span>
                    <span className="text-stone-200">{biz.users.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Health Score:</span>
                    <span className="text-emerald-400 font-bold">{biz.healthScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Domain:</span>
                    <span className="text-stone-300 truncate max-w-xs">{biz.domain} (SSL Valid)</span>
                  </div>
                </div>

                {/* Features Pill list */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-800/80 mb-4">
                  {biz.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800/80"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons based on Portfolio Logic */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
                {isGrowing ? (
                  <button
                    onClick={() => handleActionLifecycle(biz.id, 'scaling', 200)}
                    disabled={isEmergencyStopped}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold transition flex items-center gap-1.5"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Scale Compute (+Budget)</span>
                  </button>
                ) : isWeak ? (
                  <button
                    onClick={() => handleActionLifecycle(biz.id, 'growing', 50)}
                    disabled={isEmergencyStopped}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded font-bold transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Trigger Auto-Repair Loop</span>
                  </button>
                ) : (
                  <span className="text-stone-500 text-xs">Unit is retired / compute freed</span>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={biz.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                    title="Open Live Product"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {!isRetired && (
                    <button
                      onClick={() => handleRetireBusiness(biz.id)}
                      className="p-1.5 rounded bg-red-950 hover:bg-red-900 text-red-400 border border-red-800/60 transition"
                      title="Retire Business (Objective optimization)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
