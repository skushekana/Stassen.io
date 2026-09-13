import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  Zap,
  ShieldAlert,
  Terminal,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { HealthIncident } from '../../types';

interface MonitoringRepairTabProps {
  incidents: HealthIncident[];
  onAddIncident: (inc: HealthIncident) => void;
  isEmergencyStopped: boolean;
}

export const MonitoringRepairTab: React.FC<MonitoringRepairTabProps> = ({
  incidents,
  onAddIncident,
  isEmergencyStopped,
}) => {
  const [isSimulatingRepair, setIsSimulatingRepair] = useState(false);
  const [repairStep, setRepairStep] = useState<string | null>(null);

  const handleSimulateIncident = () => {
    if (isEmergencyStopped || isSimulatingRepair) return;
    setIsSimulatingRepair(true);

    const steps = [
      'DETECT: High memory allocation on Document OCR Parser (Container #4)',
      'DIAGNOSE: Buffer stream not closed after heavy multi-page TIFF parsing',
      'PROPOSE FIX: Implement automatic stream auto-closer with garbage collection hook',
      'SANDBOX: Spawned isolated test container, pumped 100 test documents',
      'TEST: Passed memory leak verification (leak reduced by 99.4%)',
      'RELEASE: Deployed hotfix patch v2.4.2 via canary traffic split',
      'VERIFY: Memory utilization steady at 14%. Zero 5xx responses detected.',
    ];

    let currentStep = 0;
    setRepairStep(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setRepairStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setIsSimulatingRepair(false);
        setRepairStep(null);

        const newInc: HealthIncident = {
          id: `inc-${Date.now()}`,
          timestamp: 'Just now',
          service: 'DocuFast OCR Worker',
          type: 'Memory Leak',
          severity: 'medium',
          status: 'repaired',
          autoRepairLog:
            'DETECT (Memory >90%) -> DIAGNOSE (Unclosed stream buffer) -> PROPOSE FIX (Auto-close wrapper) -> SANDBOX (100 docs tested) -> TEST (Pass) -> RELEASE (Hotfix v2.4.2) -> VERIFY (Nominal 14%) -> CLOSED.',
          resolvedAt: 'Just now',
        };
        onAddIncident(newInc);
      }
    }, 850);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 13 &bull; Self-Healing Engine
              </span>
              <span className="text-xs text-stone-400">
                Autonomous Monitoring, Repair & Recovery
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Autonomous Monitoring & Auto-Repair Loop
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 font-sans">
              DETECT &rarr; DIAGNOSE &rarr; PROPOSE FIX &rarr; SANDBOX &rarr; TEST &rarr; RELEASE &rarr; VERIFY &rarr; ROLLBACK IF WORSE. The machine detects and repairs failures with zero human intervention.
            </p>
          </div>

          <button
            onClick={handleSimulateIncident}
            disabled={isSimulatingRepair || isEmergencyStopped}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition shadow-md ${
              isSimulatingRepair || isEmergencyStopped
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-emerald-500/20 active:scale-95'
            }`}
          >
            {isSimulatingRepair ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Repair Loop Active...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Fault & Auto-Repair</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Live Repair Pipeline Visualizer (if running) */}
      {isSimulatingRepair && repairStep && (
        <div className="bg-amber-950/40 border border-amber-600/80 rounded-xl p-4 font-mono text-xs text-amber-200 animate-pulse flex items-center gap-3">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
          <div>
            <div className="text-[10px] text-amber-400 font-bold uppercase">Executing Autonomous Repair Pipeline</div>
            <div className="text-white font-bold">{repairStep}</div>
          </div>
        </div>
      )}

      {/* Live Performance Vitals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] text-stone-500">GLOBAL UPTIME</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">99.98%</div>
          <div className="text-[10px] text-stone-400 mt-1">Past 30 days</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] text-stone-500">P99 RESPONSE TIME</div>
          <div className="text-xl font-bold text-white mt-1">18.4ms</div>
          <div className="text-[10px] text-emerald-400 mt-1">&darr; 2.1ms improvement</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] text-stone-500">ERROR RATE (HTTP 5XX)</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">0.008%</div>
          <div className="text-[10px] text-stone-400 mt-1">Within SLA envelope</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] text-stone-500">AUTO-REPAIR SUCCESS</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">100%</div>
          <div className="text-[10px] text-stone-400 mt-1">14 of 14 incidents solved</div>
        </div>
      </div>

      {/* Incidents & Self-Healing Log Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden font-mono text-xs">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between text-stone-400 text-[11px] uppercase">
          <span>Incident Registry & Self-Healing Audit Trail</span>
          <span>Automatic Closed Loop</span>
        </div>

        <div className="divide-y divide-stone-800/80">
          {incidents.map((inc) => (
            <div key={inc.id} className="p-4 space-y-2 hover:bg-stone-950/40 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">{inc.service}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                    {inc.type}
                  </span>
                </div>
                <div className="text-stone-500 text-[11px]">
                  {inc.timestamp} &bull; Resolved: {inc.resolvedAt || 'Completed'}
                </div>
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800 text-[11px] text-stone-300">
                <span className="text-stone-500 font-bold mr-1.5">REPAIR PIPELINE:</span>
                {inc.autoRepairLog}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
