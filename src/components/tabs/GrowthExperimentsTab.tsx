import React, { useState } from 'react';
import {
  TrendingUp,
  FlaskConical,
  Search,
  CheckCircle2,
  Globe,
  ArrowRight,
  Sparkles,
  BarChart2,
  FileText,
} from 'lucide-react';
import { Experiment } from '../../types';

interface GrowthExperimentsTabProps {
  experiments: Experiment[];
  onPromoteExperiment: (id: string) => void;
  isEmergencyStopped: boolean;
}

export const GrowthExperimentsTab: React.FC<GrowthExperimentsTabProps> = ({
  experiments,
  onPromoteExperiment,
  isEmergencyStopped,
}) => {
  const seoChecklist = [
    { rule: 'JSON-LD Structured Product & Organization Microdata', status: 'Automated 100%' },
    { rule: 'Dynamic XML Sitemaps with canonical URL enforcement', status: 'Generated daily' },
    { rule: 'Automated Robots.txt indexing rules & disallows', status: 'Active' },
    { rule: 'OpenGraph & Twitter Card dynamic preview image generation', status: '200 OK' },
    { rule: 'Duplicate/thin-content heuristic scanner', status: 'Clean (0 warnings)' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 14 & 15 &bull; Organic Discovery
              </span>
              <span className="text-xs text-stone-400">
                SEO & Growth Experimentation Engine
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              SEO Engine & Scientific Growth Experiments
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 font-sans">
              Autonomous A/B tests continuously validate pricing, headlines, and conversion funnels. Every experiment logs hypothesis, variant data, sample size, statistical confidence, and promotion decisions.
            </p>
          </div>

          <div className="text-xs text-stone-400 bg-stone-950 p-2.5 rounded-lg border border-stone-800">
            <div>Active Experiments: <strong className="text-emerald-400">{experiments.length} Live</strong></div>
            <div>Indexed URLs: <strong className="text-stone-200">1,480 Organic</strong></div>
          </div>
        </div>
      </div>

      {/* Active Experiments Cards */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-stone-400 uppercase tracking-wider">
          Active Controlled Experiments (Hypothesis &rarr; Metric &rarr; Decision)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiments.map((exp) => {
            const isPromoted = exp.status === 'promoted';
            return (
              <div
                key={exp.id}
                className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono text-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase">{exp.productName}</span>
                      <h3 className="text-sm font-bold text-white font-sans mt-0.5">{exp.name}</h3>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${
                        isPromoted
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>

                  <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 text-[11px] text-stone-300 space-y-1">
                    <div className="text-stone-500 font-bold uppercase text-[9px]">HYPOTHESIS:</div>
                    <p className="font-sans leading-relaxed">{exp.hypothesis}</p>
                  </div>

                  {/* Variants A vs B Comparison */}
                  <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                    <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                      <div className="text-[10px] text-stone-500 font-bold">VARIANT A (CONTROL)</div>
                      <div className="text-xs text-stone-300 mt-0.5 truncate">{exp.variantA}</div>
                      <div className="text-sm font-bold text-stone-200 mt-1">{exp.conversionA}% conv</div>
                    </div>
                    <div className="bg-stone-950 p-2.5 rounded-lg border border-emerald-800/80">
                      <div className="text-[10px] text-emerald-400 font-bold">VARIANT B (CHALLENGER)</div>
                      <div className="text-xs text-stone-300 mt-0.5 truncate">{exp.variantB}</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1">{exp.conversionB}% conv</div>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-stone-400 flex items-center justify-between">
                    <span>Sample Size: {exp.sampleSize.toLocaleString()} users</span>
                    <span className="text-emerald-400 font-bold">Confidence: {exp.confidence}%</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 truncate max-w-xs">{exp.actionTaken}</span>
                  {!isPromoted && (
                    <button
                      onClick={() => onPromoteExperiment(exp.id)}
                      disabled={isEmergencyStopped}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded transition text-xs flex items-center gap-1 active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Promote Winner</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical SEO Standards Grid */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between text-stone-400 uppercase text-[11px]">
          <span>Autonomous Technical SEO Checklist</span>
          <span>Google Search Standards</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
          {seoChecklist.map((item, i) => (
            <div key={i} className="p-3 bg-stone-950 rounded-lg border border-stone-800 flex items-center justify-between">
              <span className="text-stone-300">{item.rule}</span>
              <span className="text-emerald-400 font-bold ml-2 whitespace-nowrap">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
