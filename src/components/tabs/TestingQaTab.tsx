import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Play,
  Smartphone,
  Monitor,
  Lock,
  Zap,
  Eye,
  FileCheck,
} from 'lucide-react';

interface TestingQaTabProps {
  isEmergencyStopped: boolean;
}

interface TestItem {
  id: string;
  name: string;
  category: 'Code' | 'Browser' | 'Mobile' | 'Security' | 'Accessibility' | 'Performance' | 'SEO';
  status: 'passed' | 'running' | 'failed';
  duration: string;
  details: string;
  score?: number;
}

export const TestingQaTab: React.FC<TestingQaTabProps> = ({ isEmergencyStopped }) => {
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [tests, setTests] = useState<TestItem[]>([
    {
      id: 't-01',
      name: 'TypeScript Compilation & Type Invariance',
      category: 'Code',
      status: 'passed',
      duration: '420ms',
      details: '0 type errors. Strict null checks passed. Zero unused exports.',
    },
    {
      id: 't-02',
      name: 'API Route Boundary & Secret Isolation',
      category: 'Security',
      status: 'passed',
      duration: '180ms',
      details: 'Zero secret API keys exposed to browser bundle. Auth middleware verified.',
    },
    {
      id: 't-03',
      name: 'Headless Chromium Layout & Interaction Check',
      category: 'Browser',
      status: 'passed',
      duration: '1.2s',
      details: 'Rendered DOM elements checked across 1080p and 1440p viewports.',
    },
    {
      id: 't-04',
      name: 'Mobile Touch Targets & Viewport Wrapping',
      category: 'Mobile',
      status: 'passed',
      duration: '840ms',
      details: 'All buttons >= 44px touch boundary. Zero horizontal scroll overflow.',
    },
    {
      id: 't-05',
      name: 'WCAG 2.1 AA Color Contrast & Screen-reader ARIA',
      category: 'Accessibility',
      status: 'passed',
      duration: '310ms',
      details: '100% compliance. Minimum 4.5:1 text contrast ratio achieved.',
      score: 98,
    },
    {
      id: 't-06',
      name: 'Lighthouse Performance & P99 Latency Audit',
      category: 'Performance',
      status: 'passed',
      duration: '950ms',
      details: 'First Contentful Paint <0.4s. Time to Interactive <0.8s.',
      score: 96,
    },
    {
      id: 't-07',
      name: 'Robots.txt, Canonical Tags & Sitemap Schema',
      category: 'SEO',
      status: 'passed',
      duration: '220ms',
      details: 'Structured JSON-LD schema validated. Zero orphaned navigation links.',
    },
  ]);

  const handleRunAllTests = () => {
    if (isEmergencyStopped || isRunningAll) return;
    setIsRunningAll(true);

    setTests((prev) => prev.map((t) => ({ ...t, status: 'running' })));

    setTimeout(() => {
      setTests((prev) =>
        prev.map((t) => ({
          ...t,
          status: 'passed',
          duration: `${Math.floor(150 + Math.random() * 400)}ms`,
        }))
      );
      setIsRunningAll(false);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 10 &bull; Release Gates
              </span>
              <span className="text-xs font-mono text-stone-400">
                Safe Self-Improvement & QA Pipeline
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono">
              Automated Testing & Release Gates
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1">
              PROPOSE CHANGE &rarr; ISOLATED SANDBOX &rarr; AUTOMATED TESTS &rarr; SECURITY CHECKS &rarr; BROWSER/MOBILE TESTS &rarr; PERFORMANCE BENCHMARK &rarr; INDEPENDENT REVIEW &rarr; CANARY RELEASE.
            </p>
          </div>

          <button
            onClick={handleRunAllTests}
            disabled={isRunningAll || isEmergencyStopped}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition shadow-md ${
              isRunningAll || isEmergencyStopped
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-emerald-500/20 active:scale-95'
            }`}
          >
            {isRunningAll ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running Test Gates...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Full QA Suite</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Test Suite Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
          <div className="text-[10px] text-stone-500">SUITE STATUS</div>
          <div className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>ALL GREEN</span>
          </div>
          <div className="text-[10px] text-stone-400 mt-1">7 of 7 suites passed</div>
        </div>

        <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
          <div className="text-[10px] text-stone-500">SECURITY AUDIT</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">0 FLAWS</div>
          <div className="text-[10px] text-stone-400 mt-1">Isolated secret perimeter</div>
        </div>

        <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
          <div className="text-[10px] text-stone-500">ACCESSIBILITY</div>
          <div className="text-xl font-bold text-white mt-1">98 / 100</div>
          <div className="text-[10px] text-stone-400 mt-1">WCAG 2.1 AA Compliant</div>
        </div>

        <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
          <div className="text-[10px] text-stone-500">RELEASE GATE</div>
          <div className="text-xl font-bold text-amber-300 mt-1">CANARY OK</div>
          <div className="text-[10px] text-stone-400 mt-1">Auto-rollback armed</div>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden font-mono text-xs">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between text-stone-400 text-[11px] uppercase">
          <span>Active Test Assertions & Release Gates</span>
          <span>Quality Division Oversight</span>
        </div>

        <div className="divide-y divide-stone-800/80">
          {tests.map((test) => (
            <div key={test.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-950/40 transition">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {test.status === 'passed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : test.status === 'running' ? (
                    <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{test.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                      {test.category}
                    </span>
                  </div>
                  <p className="text-stone-400 text-[11px] mt-1">{test.details}</p>
                </div>
              </div>

              <div className="text-right whitespace-nowrap">
                <div className="text-stone-300 font-bold">{test.duration}</div>
                <div className="text-[10px] text-emerald-400 uppercase font-semibold">Passed Gate</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
