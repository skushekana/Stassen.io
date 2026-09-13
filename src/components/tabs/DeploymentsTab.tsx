import React, { useState } from 'react';
import {
  Layers,
  Globe,
  RotateCcw,
  CheckCircle2,
  Server,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  RefreshCw,
  HardDrive,
} from 'lucide-react';

interface DeploymentsTabProps {
  isEmergencyStopped: boolean;
}

export const DeploymentsTab: React.FC<DeploymentsTabProps> = ({ isEmergencyStopped }) => {
  const [activeRollback, setActiveRollback] = useState(false);
  const [environments, setEnvironments] = useState([
    {
      id: 'env-prod',
      name: 'Production Multi-Region Cluster',
      type: 'Production',
      release: 'v2.4.1 (Clean Build #894)',
      containers: 8,
      status: 'healthy',
      domain: 'docufast.stassen.io',
      sslExpiry: '284 days (Auto-renewing Let\'s Encrypt)',
      lastDeploy: '2 hours ago',
      rollbackRef: 'v2.4.0 (Snapshot #893)',
    },
    {
      id: 'env-canary',
      name: 'Canary Staged Traffic (10% Split)',
      type: 'Canary',
      release: 'v2.4.2-rc1',
      containers: 2,
      status: 'healthy',
      domain: 'canary.stassen.io',
      sslExpiry: '284 days',
      lastDeploy: '45 mins ago',
      rollbackRef: 'v2.4.1',
    },
    {
      id: 'env-staging',
      name: 'Pre-flight Verification Sandbox',
      type: 'Staging',
      release: 'v2.5.0-alpha',
      containers: 1,
      status: 'idle',
      domain: 'staging.stassen.io',
      sslExpiry: '284 days',
      lastDeploy: '4 hours ago',
      rollbackRef: 'v2.4.1',
    },
  ]);

  const handleTriggerRollback = (envId: string) => {
    if (confirm('Execute instant zero-downtime rollback to last known-good release?')) {
      setActiveRollback(true);
      setTimeout(() => {
        setEnvironments((prev) =>
          prev.map((e) =>
            e.id === envId
              ? {
                  ...e,
                  release: e.rollbackRef,
                  lastDeploy: 'Rolled back just now',
                }
              : e
          )
        );
        setActiveRollback(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 11 & 12
              </span>
              <span className="text-xs text-stone-400">
                Independent Infrastructure & Domain Manager
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Deployments & Infrastructure Abstraction
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 font-sans">
              Decoupled infrastructure adapters allow seamless workload migration across any compute provider. Rollback snapshots are cryptographically locked before every deployment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Backups: Hourly DR Mirror Synced</span>
            </span>
          </div>
        </div>
      </div>

      {/* Environments List */}
      <div className="space-y-4">
        {environments.map((env) => (
          <div
            key={env.id}
            className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono text-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">{env.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800 uppercase">
                  {env.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{env.containers} Containers Healthy</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-stone-950 p-3 rounded-lg border border-stone-800">
              <div>
                <div className="text-[10px] text-stone-500">Active Release</div>
                <div className="text-stone-200 font-bold mt-0.5">{env.release}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-500">Domain & SSL</div>
                <div className="text-stone-200 font-bold mt-0.5">{env.domain}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-500">Last Deployed</div>
                <div className="text-stone-300 mt-0.5">{env.lastDeploy}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-500">Rollback Target</div>
                <div className="text-amber-400 font-bold mt-0.5">{env.rollbackRef}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-stone-500">
                Cert: {env.sslExpiry} &bull; DNS: Cloudflare/Independent Dual Resolvers
              </div>

              <button
                onClick={() => handleTriggerRollback(env.id)}
                disabled={activeRollback || isEmergencyStopped}
                className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 rounded font-bold transition flex items-center gap-1.5 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rollback Release</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
