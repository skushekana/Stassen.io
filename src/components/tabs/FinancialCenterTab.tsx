import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  ArrowDownRight,
  ArrowUpRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { FinancialLedgerEntry, UnitEconomics } from '../../types';
import { INITIAL_UNIT_ECONOMICS } from '../../data/initialData';

interface FinancialCenterTabProps {
  economics?: UnitEconomics;
  ledger: FinancialLedgerEntry[];
}

export const FinancialCenterTab: React.FC<FinancialCenterTabProps> = ({
  economics,
  ledger,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const eco = economics || INITIAL_UNIT_ECONOMICS;

  const filteredLedger =
    filterType === 'all' ? ledger : ledger.filter((l) => l.type === filterType);

  const totalOperatingCosts =
    (eco.aiCosts ?? 0) +
    (eco.infraCosts ?? 0) +
    (eco.apiCosts ?? 0) +
    (eco.paymentFees ?? 0) +
    (eco.otherOperatingCosts ?? 0);

  const outputPerDollarSpent = totalOperatingCosts > 0 ? (
    (eco.netEconomicOutput ?? 0) / totalOperatingCosts
  ).toFixed(2) : '0.00';

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 uppercase tracking-wider">
                Section 17 &bull; Treasury & Unit Economics
              </span>
              <span className="text-xs text-stone-400">
                Central Financial Center
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Financial Accounting & Net Economic Output
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1 font-sans">
              Centralized payment gateway and bank payout configuration reused across all junior business units. Enforces strict unit economics: GROSS REVENUE &minus; AI COSTS &minus; INFRASTRUCTURE &minus; APIS &minus; PAYMENT FEES &minus; OTHER COSTS = NET ECONOMIC OUTPUT.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950 p-3 rounded-lg border border-stone-800 text-xs">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-stone-500">PAYOUT STATUS</div>
              <div className="text-stone-200 font-bold">Stripe Connect &bull; Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* The Master Blueprint Formula Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 font-mono">
        <div className="text-xs text-stone-400 uppercase tracking-wider mb-3">
          Master Formula (Section 17 Mathematical Model)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 text-center text-xs">
          
          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <div className="text-[10px] text-stone-500">GROSS REVENUE</div>
            <div className="text-base font-bold text-emerald-400 mt-1">
              ${(eco.grossRevenue ?? 0).toLocaleString()}
            </div>
          </div>

          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <div className="text-[10px] text-stone-500">&minus; AI COSTS</div>
            <div className="text-base font-bold text-amber-400 mt-1">
              ${eco.aiCosts ?? 0}
            </div>
          </div>

          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <div className="text-[10px] text-stone-500">&minus; INFRASTRUCTURE</div>
            <div className="text-base font-bold text-amber-400 mt-1">
              ${eco.infraCosts ?? 0}
            </div>
          </div>

          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <div className="text-[10px] text-stone-500">&minus; APIS & TOKENS</div>
            <div className="text-base font-bold text-amber-400 mt-1">
              ${eco.apiCosts ?? 0}
            </div>
          </div>

          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <div className="text-[10px] text-stone-500">&minus; PAYMENT FEES</div>
            <div className="text-base font-bold text-amber-400 mt-1">
              ${eco.paymentFees ?? 0}
            </div>
          </div>

          <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
            <div className="text-[10px] text-stone-500">&minus; OTHER COSTS</div>
            <div className="text-base font-bold text-amber-400 mt-1">
              ${eco.otherOperatingCosts ?? 0}
            </div>
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-lg border border-emerald-800 text-center">
            <div className="text-[10px] text-emerald-300 font-bold">= NET OUTPUT</div>
            <div className="text-base font-bold text-emerald-300 mt-1">
              +${(eco.netEconomicOutput ?? 0).toLocaleString()}
            </div>
          </div>

        </div>
      </div>

      {/* Unit Economics Detailed Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] text-stone-500">NET MARGIN</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{eco.marginPercent ?? 0}%</div>
          <div className="text-[10px] text-stone-400 mt-1">Sustained capital efficiency</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] text-stone-500">CAC vs LTV RATIO</div>
          <div className="text-2xl font-bold text-white mt-1">
            {eco.cac ? ((eco.ltv ?? 0) / eco.cac).toFixed(1) : '0.0'}x
          </div>
          <div className="text-[10px] text-stone-400 mt-1">CAC: ${eco.cac ?? 0} &bull; LTV: ${eco.ltv ?? 0}</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] text-stone-500">PAYBACK PERIOD</div>
          <div className="text-2xl font-bold text-white mt-1">{eco.paybackPeriodDays ?? 0} Days</div>
          <div className="text-[10px] text-emerald-400 mt-1">Ultra-rapid capital return</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-xl p-4">
          <div className="text-[10px] text-stone-500">OUTPUT PER $ SPENT</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">${outputPerDollarSpent}</div>
          <div className="text-[10px] text-stone-400 mt-1">${eco.revenuePerAgentHour ?? 0}/agent-hour</div>
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden font-mono text-xs">
        <div className="p-4 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-stone-400 text-[11px] uppercase">
            Auditable Financial Ledger & Money Flows
          </span>

          <div className="flex items-center gap-1">
            {['all', 'revenue', 'ai_cost', 'infra', 'payment_fee'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2 py-1 rounded text-[10px] capitalize transition ${
                  filterType === type
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200'
                }`}
              >
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-stone-800/80">
          {filteredLedger.map((tx) => {
            const isCredit = tx.amount > 0;
            return (
              <div key={tx.id} className="p-3.5 flex items-center justify-between hover:bg-stone-950/40 transition">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded ${isCredit ? 'bg-emerald-950 text-emerald-400' : 'bg-stone-800 text-amber-400'}`}>
                    {isCredit ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="font-bold text-white">{tx.description}</div>
                    <div className="text-[10px] text-stone-500">
                      Product: {tx.product} &bull; Date: {tx.date}
                    </div>
                  </div>
                </div>

                <div className={`font-bold text-sm ${isCredit ? 'text-emerald-400' : 'text-stone-300'}`}>
                  {isCredit ? `+$${tx.amount.toLocaleString()}` : `-$${Math.abs(tx.amount)}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
