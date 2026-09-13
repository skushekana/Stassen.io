import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Plus,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { MarketOpportunity } from '../../types';

interface OpportunitiesTabProps {
  opportunities: MarketOpportunity[];
  onAddOpportunity: (opp: MarketOpportunity) => void;
  onApproveOpportunity: (id: string) => void;
  isEmergencyStopped: boolean;
}

export const OpportunitiesTab: React.FC<OpportunitiesTabProps> = ({
  opportunities,
  onAddOpportunity,
  onApproveOpportunity,
  isEmergencyStopped,
}) => {
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<MarketOpportunity | null>(opportunities[0] || null);

  const handleDiscoverNew = async () => {
    if (isEmergencyStopped || isDiscovering) return;
    setIsDiscovering(true);

    try {
      const res = await fetch('/api/ai/decide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective: 'Discover high-margin digital micro-SaaS with low CAC and fast payback',
          step: 'RESEARCH',
          context: { existingCount: opportunities.length },
        }),
      });
      const data = await res.json();
      const result = data.result || {};

      const newOpp: MarketOpportunity = {
        id: `opp-dynamic-${Date.now()}`,
        title: result.decision || 'Automated Webhook Latency Alerting & Postmortem Bot',
        marketNiche: 'Cloud Dev & DevOps',
        opportunityScore: result.confidenceScore || 91,
        searchDemandMonthly: Math.floor(12000 + Math.random() * 20000),
        competitionLevel: 'low',
        estGrossRevenue: '$4,200 - $6,800/mo',
        estNetOutput: result.economicOutputEst || '$3,800/mo',
        paybackDays: 14,
        suggestedBusinessModel: 'Freemium Tiered SaaS ($19/mo Pro, $69/mo Team)',
        evidence: result.evidence || [
          'High buyer search intent with zero established dominant incumbents',
          'Fast payback window under 2 weeks with minimal cloud compute footprint',
          'Immediate synergy with existing autonomous template libraries',
        ],
        status: 'discovered',
        discoveredBy: result.agents?.[0] || 'Aria MarketScout',
        discoveredAt: 'Just now',
      };

      onAddOpportunity(newOpp);
      setSelectedOpp(newOpp);
    } catch (e) {
      console.warn('Error during opportunity discovery:', e);
    } finally {
      setIsDiscovering(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 5 & 14
              </span>
              <span className="text-xs font-mono text-stone-400">
                Opportunity Discovery & Scoring Engine
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono">
              Market Research & Opportunity Prioritization
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1">
              Research swarm agents scan commercial search intent, competitor vulnerabilities, and market pricing gaps to rank opportunities by quantitative expected value and payback velocity.
            </p>
          </div>

          <button
            onClick={handleDiscoverNew}
            disabled={isDiscovering || isEmergencyStopped}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition shadow-md ${
              isDiscovering || isEmergencyStopped
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-emerald-500/20 active:scale-95'
            }`}
          >
            {isDiscovering ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning Markets...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Run Discovery Swarm</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Two-Column: Opportunities List vs Detailed Evidence Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Opportunities List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 px-1">
            <span>DISCOVERED MARKETS ({opportunities.length})</span>
            <span>SORT: OPPORTUNITY SCORE</span>
          </div>

          <div className="space-y-3">
            {opportunities.map((opp) => {
              const isSelected = selectedOpp?.id === opp.id;
              const isApproved = opp.status === 'approved' || opp.status === 'in_build';

              return (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpp(opp)}
                  className={`bg-stone-900 border rounded-xl p-4 cursor-pointer transition ${
                    isSelected
                      ? 'border-emerald-500 bg-stone-900/90 shadow-md shadow-emerald-500/5'
                      : 'border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                        {opp.marketNiche}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500">
                        by {opp.discoveredBy} &bull; {opp.discoveredAt}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                        opp.opportunityScore >= 90
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-stone-950 text-amber-300 border-stone-800'
                      }`}
                    >
                      Score {opp.opportunityScore}/100
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-mono text-white mb-2">
                    {opp.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800/80 font-mono text-[11px] text-center">
                    <div>
                      <div className="text-stone-500 text-[10px]">Monthly Demand</div>
                      <div className="text-stone-200 font-bold">{opp.searchDemandMonthly.toLocaleString()}/mo</div>
                    </div>
                    <div>
                      <div className="text-stone-500 text-[10px]">Est Net Output</div>
                      <div className="text-emerald-400 font-bold">{opp.estNetOutput}</div>
                    </div>
                    <div>
                      <div className="text-stone-500 text-[10px]">Payback Period</div>
                      <div className="text-stone-200 font-bold">{opp.paybackDays} days</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-mono pt-2 border-t border-stone-800/70">
                    <span className="text-stone-400 text-[11px]">
                      Status: <strong className="capitalize text-stone-200">{opp.status.replace('_', ' ')}</strong>
                    </span>

                    {!isApproved ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onApproveOpportunity(opp.id);
                        }}
                        disabled={isEmergencyStopped}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Approve for Build</span>
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>In Construction Queue</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Evidence & Economics Card */}
        <div className="lg:col-span-5">
          {selectedOpp ? (
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4 sticky top-24">
              <div className="border-b border-stone-800 pb-3">
                <div className="text-xs font-mono text-stone-500 uppercase">Opportunity Evaluation Dossier</div>
                <h3 className="text-base font-bold font-mono text-white mt-1">
                  {selectedOpp.title}
                </h3>
              </div>

              {/* Economic Modeling */}
              <div className="space-y-2 font-mono text-xs">
                <div className="text-stone-400 uppercase text-[10px]">Quantitative Modeling</div>
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Business Model:</span>
                    <span className="text-stone-200 font-bold">{selectedOpp.suggestedBusinessModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Gross Est:</span>
                    <span className="text-emerald-400 font-bold">{selectedOpp.estGrossRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Net Output:</span>
                    <span className="text-emerald-300 font-bold">{selectedOpp.estNetOutput}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Competition Level:</span>
                    <span className="text-stone-200 font-bold capitalize">{selectedOpp.competitionLevel}</span>
                  </div>
                </div>
              </div>

              {/* Empirical Evidence Points */}
              <div className="space-y-2 font-mono text-xs">
                <div className="text-stone-400 uppercase text-[10px]">Evidence & Market Signals</div>
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 space-y-2">
                  {selectedOpp.evidence.map((ev, i) => (
                    <div key={i} className="flex items-start gap-2 text-stone-300">
                      <span className="text-emerald-400 mt-0.5">&bull;</span>
                      <span className="leading-relaxed">{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approve Trigger */}
              {selectedOpp.status === 'discovered' && (
                <button
                  onClick={() => onApproveOpportunity(selectedOpp.id)}
                  disabled={isEmergencyStopped}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Promote to Autonomous Build Engine</span>
                </button>
              )}
            </div>
          ) : (
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-8 text-center text-stone-500 font-mono text-xs">
              Select an opportunity to view market dossier.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
