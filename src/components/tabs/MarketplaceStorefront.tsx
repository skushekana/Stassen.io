import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Layers,
  Code,
  Globe,
} from 'lucide-react';
import { JuniorBusinessUnit } from '../../types';

interface MarketplaceStorefrontProps {
  businesses: JuniorBusinessUnit[];
  onOrderCustomProduct: (order: { title: string; category: string; budget: string; description: string }) => void;
  isEmergencyStopped: boolean;
}

export const MarketplaceStorefront: React.FC<MarketplaceStorefrontProps> = ({
  businesses,
  onOrderCustomProduct,
  isEmergencyStopped,
}) => {
  const [activeMode, setActiveMode] = useState<'catalog' | 'custom_order'>('catalog');
  const [orderTitle, setOrderTitle] = useState('');
  const [orderCategory, setOrderCategory] = useState('SaaS');
  const [orderBudget, setOrderBudget] = useState('$249 Instant Build & Deploy');
  const [orderDescription, setOrderDescription] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderSubmittedSuccess, setOrderSubmittedSuccess] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderTitle.trim()) return;

    setIsSubmittingOrder(true);
    setTimeout(() => {
      onOrderCustomProduct({
        title: orderTitle,
        category: orderCategory,
        budget: orderBudget,
        description: orderDescription,
      });
      setIsSubmittingOrder(false);
      setOrderSubmittedSuccess(true);
      setOrderTitle('');
      setOrderDescription('');
      setTimeout(() => setOrderSubmittedSuccess(false), 4000);
    }, 900);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Hero Banner: Commercial Front Door (Phase 15) */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono font-bold border border-emerald-800 uppercase tracking-wider">
              Phase 15 &bull; Commercial Front Door
            </span>
            <span className="text-xs text-stone-400 font-mono">
              Instant Automated Delivery
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white font-mono">
            Stassen.io Product Marketplace & Custom Build Commission
          </h2>
          <p className="text-xs text-stone-300 leading-relaxed font-sans">
            Access prebuilt production digital products or commission the autonomous AI workforce to research, build, test, and deploy a custom web app or SaaS platform with instant turnaround.
          </p>
        </div>

        <div className="flex items-center gap-2 mt-5 font-mono text-xs">
          <button
            onClick={() => setActiveMode('catalog')}
            className={`px-4 py-2 rounded-lg transition font-bold ${
              activeMode === 'catalog'
                ? 'bg-emerald-500 text-stone-950'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            Prebuilt Software Catalog
          </button>
          <button
            onClick={() => setActiveMode('custom_order')}
            className={`px-4 py-2 rounded-lg transition font-bold flex items-center gap-1.5 ${
              activeMode === 'custom_order'
                ? 'bg-emerald-500 text-stone-950'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission Custom Build</span>
          </button>
        </div>
      </div>

      {/* Catalog Mode: Live Prebuilt Products */}
      {activeMode === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businesses.map((biz) => (
            <div
              key={biz.id}
              className="bg-stone-900 border border-stone-800 hover:border-emerald-500/50 rounded-xl p-5 flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800 uppercase">
                    {biz.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {biz.domain}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-mono group-hover:text-emerald-400 transition">
                  {biz.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                  {biz.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-stone-800/80">
                  {biz.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800/60"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 block">PRICING</span>
                  <span className="text-stone-200 font-bold">$29 - $149/mo</span>
                </div>

                <a
                  href={biz.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded font-bold transition flex items-center gap-1.5 text-[11px]"
                >
                  <span>Launch App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Order Builder: Phase 15 Commercial Front Door */}
      {activeMode === 'custom_order' && (
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 max-w-2xl mx-auto space-y-4 font-mono">
          <div className="border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white">
              Commission Autonomous Custom Build
            </h3>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              Submit your natural language specifications. The AI Workforce will execute the 14-stage autonomous cycle and provide a production deployment URL.
            </p>
          </div>

          {orderSubmittedSuccess && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-600 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Commission received! The Product Factory has initiated the autonomous construction queue.</span>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
            <div>
              <label className="text-stone-300 block mb-1">Product Name / Concept</label>
              <input
                type="text"
                required
                placeholder="e.g. Serverless Redis Rate Limiter Microservice"
                value={orderTitle}
                onChange={(e) => setOrderTitle(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-stone-300 block mb-1">Architecture Category</label>
                <select
                  value={orderCategory}
                  onChange={(e) => setOrderCategory(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="SaaS">SaaS Platform (Auth + DB + Stripe)</option>
                  <option value="Web App">Interactive Web Application</option>
                  <option value="API Microservice">High-Throughput API Service</option>
                  <option value="Landing Page">SEO Content & Lead Engine</option>
                </select>
              </div>

              <div>
                <label className="text-stone-300 block mb-1">Build Package</label>
                <select
                  value={orderBudget}
                  onChange={(e) => setOrderBudget(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="$249 Instant Build & Deploy">$249 Instant Autonomous Build</option>
                  <option value="$499 Custom SaaS with Multi-Tenancy">$499 Multi-Tenant Architecture</option>
                  <option value="$999 Enterprise Automated Deployment">$999 Enterprise Hardened Build</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-stone-300 block mb-1">Workflow Requirements & Must-Have Features</label>
              <textarea
                rows={4}
                placeholder="Describe user flows, necessary integrations (e.g. Stripe, SendGrid), and target user outcomes..."
                value={orderDescription}
                onChange={(e) => setOrderDescription(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-hidden focus:border-emerald-500 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingOrder || isEmergencyStopped}
              className={`w-full py-3 rounded-lg font-bold text-xs transition flex items-center justify-center gap-2 ${
                isSubmittingOrder || isEmergencyStopped
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md shadow-emerald-500/20 active:scale-95'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isSubmittingOrder ? 'Transmitting to Autonomous Factory...' : 'Commission Autonomous Build'}</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
