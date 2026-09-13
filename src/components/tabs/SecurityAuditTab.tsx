import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  AlertOctagon,
  FileCheck,
  CheckCircle2,
  Sliders,
  DollarSign,
  Terminal,
} from 'lucide-react';
import { AuditLogItem } from '../../types';

interface SecurityAuditTabProps {
  auditLogs: AuditLogItem[];
  isEmergencyStopped: boolean;
  onToggleEmergencyStop: () => void;
}

export const SecurityAuditTab: React.FC<SecurityAuditTabProps> = ({
  auditLogs,
  isEmergencyStopped,
  onToggleEmergencyStop,
}) => {
  const [spendingLimit, setSpendingLimit] = useState(1500);
  const [approvalThreshold, setApprovalThreshold] = useState(250);

  const permanentRules = [
    { rule: 'Never confuse activity with economic output', status: 'Enforced' },
    { rule: 'Never allow one AI provider to become indispensable (0 SPOF)', status: 'Enforced' },
    { rule: 'Never allow one agent to be the only holder of important state', status: 'Enforced' },
    { rule: 'Never deploy untested autonomous code directly to production', status: 'Enforced' },
    { rule: 'Never overwrite the only known-good version (Rollback Snapshots)', status: 'Enforced' },
    { rule: 'Never give unrestricted access to sensitive financial credentials', status: 'Enforced' },
    { rule: 'Never claim guaranteed search rankings or guaranteed revenue', status: 'Enforced' },
    { rule: 'Never bypass third-party terms or approval requirements', status: 'Enforced' },
    { rule: 'Always preserve useful learning from failures in Knowledge Graph', status: 'Enforced' },
    { rule: 'Always make important actions observable and machine-auditable', status: 'Enforced' },
    { rule: 'Always prefer reversible decisions when uncertainty is high', status: 'Enforced' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 21 & 29 &bull; Blast Radius Isolation
              </span>
              <span className="text-xs text-stone-400">
                Security, Permissions & Permanent Operating Rules
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Security Governance, Audit Logs & Emergency Stop
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 font-sans">
              All consequential actions require cryptographic hash logs. The owner remains the ultimate authority over financial policies, spending caps, and emergency kills.
            </p>
          </div>

          <button
            onClick={onToggleEmergencyStop}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition flex items-center gap-2 border ${
              isEmergencyStopped
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                : 'bg-red-600 hover:bg-red-500 text-white border-red-500 shadow-md shadow-red-600/20'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            <span>{isEmergencyStopped ? 'Disengage Emergency Stop' : 'Trigger Global Emergency Stop'}</span>
          </button>
        </div>
      </div>

      {/* Owner Authority & Spending Limits (Section 28) */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase">Section 28: Owner Spending Limits & Policies</h3>
          </div>
          <span className="text-[11px] text-stone-500">Autonomous Ceiling Guardrails</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-stone-300">
              <span>Monthly AI Compute & API Budget Cap</span>
              <span className="text-emerald-400 font-bold">${spendingLimit}.00</span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="100"
              value={spendingLimit}
              onChange={(e) => setSpendingLimit(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <p className="text-[10px] text-stone-500">
              Autonomous loop halts instantly if token spend approaches 95% of cap.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-stone-300">
              <span>Unattended Transaction Approval Ceiling</span>
              <span className="text-amber-400 font-bold">${approvalThreshold}.00</span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="25"
              value={approvalThreshold}
              onChange={(e) => setApprovalThreshold(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <p className="text-[10px] text-stone-500">
              Any payout or single expense above this requires explicit owner push approval.
            </p>
          </div>
        </div>
      </div>

      {/* Permanent Operating Rules Checklist (Section 29) */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-stone-400 text-[11px] uppercase">
          <span>Section 29: Permanent Operating Rules Compliance</span>
          <span className="text-emerald-400 font-bold">11 of 11 Compliant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {permanentRules.map((r, i) => (
            <div key={i} className="p-3 bg-stone-950 rounded-lg border border-stone-800 flex items-center justify-between">
              <span className="text-stone-300 pr-2">{r.rule}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{r.status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cryptographic Audit Logs */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden font-mono text-xs">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between text-stone-400 text-[11px] uppercase">
          <span>Immutable Machine Audit Trail</span>
          <span>Cryptographic Checkpoints</span>
        </div>

        <div className="divide-y divide-stone-800/80">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-950/40 transition">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">{log.actor}</span>
                  <span className="text-stone-500">&bull; {log.timestamp}</span>
                </div>
                <p className="text-stone-200 mt-0.5">{log.action}</p>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  Target: <span className="text-stone-400">{log.target}</span> &bull; SHA256: <span className="text-amber-400">{log.hash}</span>
                </div>
              </div>

              <div className="text-right whitespace-nowrap">
                <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-400">
                  {log.reversible ? 'Reversible' : 'Irreversible'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
