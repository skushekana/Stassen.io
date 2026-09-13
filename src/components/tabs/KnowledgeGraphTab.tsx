import React, { useState } from 'react';
import {
  Network,
  Share2,
  BookOpen,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_KNOWLEDGE_GRAPH } from '../../data/initialData';

export const KnowledgeGraphTab: React.FC = () => {
  const [activeNode, setActiveNode] = useState<any>(INITIAL_KNOWLEDGE_GRAPH.nodes[2]); // Default Product

  const strategyLibrary = [
    {
      title: 'Zero-CAC Programmatic Landing Page Matrix',
      impact: '+42% Organic Growth',
      division: 'Growth division',
      details: 'Generate 120+ targeted micro-niche SEO pages per product with schema.org JSON-LD microdata and zero manual copywriting.',
    },
    {
      title: 'Vendor-Independence Docker Container Formula',
      impact: '0 Single Point of Failure',
      division: 'Engineering division',
      details: 'Packaging applications into self-contained CommonJS/container artifacts enables instantaneous provider migration away from any host.',
    },
    {
      title: 'Self-Healing Idempotent Webhook Relays',
      impact: '100% Billing Accuracy',
      division: 'Engineering division',
      details: 'Wrap all Stripe billing webhooks in SQLite transaction logs with exponential jitter backoff to survive upstream network drops.',
    },
  ];

  const failureMemory = [
    {
      mistake: 'Directly modifying live production code without canary traffic split',
      lesson: 'Section 10 Mandate: Always require sandbox -> tests -> canary gate before production promotion.',
    },
    {
      mistake: 'Relying on external proprietary builder platforms (v0, Replit, Lovable)',
      lesson: 'Section 2 Mandate: External builders may only be optional construction adapters, never core foundation.',
    },
    {
      mistake: 'Scaling product volume before proving complete economic loop',
      lesson: 'Section 27 Mandate: Follow 1 PRODUCT -> PROVE COMPLETE LOOP -> 5 -> 10 before attempting massive scale.',
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 19 & 20 &bull; Collective Intelligence
              </span>
              <span className="text-xs text-stone-400">
                Machine-Readable Knowledge Graph
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Organizational Memory & Strategy Graph
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 font-sans">
              MARKET &rarr; OPPORTUNITY &rarr; PRODUCT &rarr; CUSTOMER &rarr; EXPERIMENT &rarr; REVENUE &rarr; STRATEGY &rarr; LEARNING. Product #10,000 benefits from all knowledge accumulated since Product #1.
            </p>
          </div>

          <div className="text-xs text-stone-400 bg-stone-950 p-2.5 rounded-lg border border-stone-800">
            <div>Global Knowledge Nodes: <strong className="text-emerald-400">8 Connected</strong></div>
            <div>Strategy Rules Codified: <strong className="text-stone-200">14 Active</strong></div>
          </div>
        </div>
      </div>

      {/* Visual Interactive Graph Stage Pipeline */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono">
        <div className="text-xs text-stone-400 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Machine-Readable Relationship Flow</span>
          <span className="text-emerald-400 text-[11px]">Click node to inspect memory</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
          {INITIAL_KNOWLEDGE_GRAPH.nodes.map((node, i) => {
            const isSelected = activeNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`p-3 rounded-lg border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold opacity-60">0{i + 1}</span>
                  <span className="text-emerald-400">{node.impactScore}%</span>
                </div>
                <div className="font-bold my-1 text-xs truncate">{node.type}</div>
                <div className="text-[10px] opacity-80 truncate">{node.label}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Dossier */}
        {activeNode && (
          <div className="mt-4 p-4 bg-stone-950 rounded-lg border border-stone-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold uppercase">{activeNode.type}: {activeNode.label}</span>
              <span className="text-stone-500">Impact Score: {activeNode.impactScore}/100</span>
            </div>
            <p className="text-stone-300 font-sans">{activeNode.details}</p>
          </div>
        )}
      </div>

      {/* Two-Column: Reusable Strategy Library vs Failure Memory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strategy Library */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase">Reusable Strategy Library</h3>
            </div>
            <span className="text-xs text-stone-500">Proven Playbooks</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {strategyLibrary.map((strat, i) => (
              <div key={i} className="bg-stone-950 p-3.5 rounded-lg border border-stone-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{strat.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    {strat.impact}
                  </span>
                </div>
                <p className="text-stone-400 text-[11px] font-sans leading-relaxed">
                  {strat.details}
                </p>
                <div className="text-[10px] text-stone-500">Owner: {strat.division}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Failure Memory (Anti-Patterns Prevented) */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase">Failure Memory (Anti-Patterns)</h3>
            </div>
            <span className="text-xs text-stone-500">Learned Defenses</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {failureMemory.map((fail, i) => (
              <div key={i} className="bg-stone-950 p-3.5 rounded-lg border border-stone-800/80 space-y-1.5">
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Avoided: {fail.mistake}</span>
                </div>
                <p className="text-stone-300 text-[11px] font-sans leading-relaxed">
                  {fail.lesson}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
