import React, { useState } from 'react';
import {
  Users,
  Cpu,
  ShieldCheck,
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Agent, AgentDivision } from '../../types';

interface WorkforceTabProps {
  agents: Agent[];
  onUpdateAgents: (agents: Agent[]) => void;
  isEmergencyStopped: boolean;
}

const DIVISIONS: AgentDivision[] = [
  'Research division',
  'Product division',
  'Engineering / creation division',
  'Quality division',
  'Growth division',
  'Finance and management',
];

export const WorkforceTab: React.FC<WorkforceTabProps> = ({
  agents,
  onUpdateAgents,
  isEmergencyStopped,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [recoveringAgentId, setRecoveringAgentId] = useState<string | null>(null);

  const filteredAgents =
    selectedDivision === 'All'
      ? agents
      : agents.filter((a) => a.division === selectedDivision);

  // Simulate worker failure and automatic supervisor recovery from checkpoint (Section 22)
  const handleSimulateFailover = (agentId: string) => {
    setRecoveringAgentId(agentId);

    // Set to degraded
    onUpdateAgents(
      agents.map((a) =>
        a.id === agentId
          ? { ...a, health: 'degraded', status: 'recovering', currentTask: 'Heartbeat lost. Failover triggered...' }
          : a
      )
    );

    // Phoenix Resurrect / Supervisor replaces worker from checkpoint in 1200ms
    setTimeout(() => {
      onUpdateAgents(
        agents.map((a) =>
          a.id === agentId
            ? {
                ...a,
                health: 'healthy',
                status: 'active',
                currentTask: `Supervisor auto-replaced worker from checkpoint ${a.lastCheckpoint || 'chk-root'}. Resumed normal operations.`,
                confidenceAvg: Math.min(99, a.confidenceAvg + 1),
              }
            : a
        )
      );
      setRecoveringAgentId(null);
    }, 1200);
  };

  const totalCostPerHour = agents.reduce((sum, a) => sum + a.costPerHour, 0);

  return (
    <div className="space-y-6">
      
      {/* Workforce Header & Supervisor Status */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 5 & 22
              </span>
              <span className="text-xs font-mono text-stone-400">
                Resilient Multi-Agent Mesh &bull; No Single Point of Failure
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono">
              AI Workforce & Supervisor Oversight
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1">
              Organized across 6 specialized divisions. If one AI model or worker fails, the supervisor automatically routes the task to a replacement worker and restores execution from checkpoint.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-950 px-4 py-2.5 rounded-lg border border-stone-800 font-mono text-xs">
            <div>
              <div className="text-[10px] text-stone-500">Active Workforce</div>
              <div className="text-sm font-bold text-emerald-400">{agents.length} Autonomous Agents</div>
            </div>
            <div className="h-7 w-px bg-stone-800 mx-2"></div>
            <div>
              <div className="text-[10px] text-stone-500">Compute Cost</div>
              <div className="text-sm font-bold text-stone-200">${totalCostPerHour.toFixed(2)}/hr total</div>
            </div>
          </div>
        </div>

        {/* Division Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap mt-4 pt-4 border-t border-stone-800/80">
          <button
            onClick={() => setSelectedDivision('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              selectedDivision === 'All'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-xs'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            All Divisions ({agents.length})
          </button>
          {DIVISIONS.map((div) => {
            const count = agents.filter((a) => a.division === div).length;
            return (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                  selectedDivision === div
                    ? 'bg-stone-800 text-emerald-400 border border-emerald-500/40 font-bold'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                {div} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => {
          const isHealthy = agent.health === 'healthy';
          const isRecovering = recoveringAgentId === agent.id || agent.health === 'recovering';

          return (
            <div
              key={agent.id}
              className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl p-4 flex flex-col justify-between transition group"
            >
              <div>
                {/* Top Badge: Division & Health */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                    {agent.division}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    {isRecovering ? (
                      <span className="flex items-center gap-1 text-amber-400 animate-pulse">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Recovering...</span>
                      </span>
                    ) : isHealthy ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>Healthy</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Degraded</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="mb-2">
                  <h3 className="text-base font-bold text-white font-mono group-hover:text-emerald-400 transition">
                    {agent.name}
                  </h3>
                  <p className="text-xs font-mono text-stone-400">{agent.role}</p>
                </div>

                {/* Current Task Description */}
                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800/80 mb-3">
                  <div className="text-[10px] font-mono text-stone-500 mb-0.5">CURRENT TASK</div>
                  <p className="text-xs text-stone-300 font-mono line-clamp-2">
                    {agent.currentTask || 'Awaiting scheduled objective workload.'}
                  </p>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-2 text-center font-mono bg-stone-950/60 p-2 rounded-lg border border-stone-800/60 text-xs">
                  <div>
                    <div className="text-[10px] text-stone-500">Model</div>
                    <div className="font-bold text-stone-300 text-[11px] truncate">{agent.model.replace('gemini-', '')}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500">Confidence</div>
                    <div className="font-bold text-emerald-400 text-[11px]">{agent.confidenceAvg}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500">Rate</div>
                    <div className="font-bold text-stone-300 text-[11px]">${agent.costPerHour}/hr</div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Checkpoint & Failover trigger */}
              <div className="mt-3 pt-3 border-t border-stone-800/70 flex items-center justify-between text-[11px] font-mono">
                <span className="text-stone-500">
                  Chk: <span className="text-stone-400">{agent.lastCheckpoint}</span>
                </span>

                <button
                  onClick={() => handleSimulateFailover(agent.id)}
                  disabled={isRecovering || isEmergencyStopped}
                  className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-mono transition flex items-center gap-1"
                  title="Simulate failure to verify zero single-point-of-failure recovery"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Test Failover</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
