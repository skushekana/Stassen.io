import React, { useState } from 'react';
import {
  FileCode,
  Play,
  Layers,
  Sparkles,
  Eye,
  CheckCircle2,
  RefreshCw,
  FolderTree,
  Terminal,
  Database,
  Lock,
  CreditCard,
  Zap,
} from 'lucide-react';

interface StudioTabProps {
  isEmergencyStopped: boolean;
  onDeployToSandbox: (productSpec: any) => void;
}

export const StudioTab: React.FC<StudioTabProps> = ({
  isEmergencyStopped,
  onDeployToSandbox,
}) => {
  const [productTitle, setProductTitle] = useState('LogPulse AI - Cloud Log Anomaly Sentinel');
  const [category, setCategory] = useState('SaaS');
  const [targetAudience, setTargetAudience] = useState('DevOps engineers & serverless teams');
  const [pricingModel, setPricingModel] = useState('$29/mo Pro, $99/mo Enterprise');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState<'preview' | 'code' | 'schema'>('preview');

  // Generated or default specification
  const [generatedSpec, setGeneratedSpec] = useState<any>({
    productName: 'LogPulse AI Sentinel',
    tagline: 'Autonomous zero-latency cloud log anomaly detector with Telegram & Slack alerts',
    businessModel: 'Usage-based & monthly tiered SaaS',
    techStack: ['React 19', 'TypeScript', 'Express', 'Tailwind', 'Stripe Billing'],
    features: [
      { name: 'Zero-Egress Log Parser', description: 'Parses 10k logs/sec with 0ms buffering' },
      { name: 'Spike & Anomaly Classifier', description: 'Auto-flags 5xx rate surges & memory leakage' },
      { name: 'One-Click Slack Integrations', description: 'Instant webhook alerting with incident action buttons' },
    ],
    monetizationTiers: [
      { name: 'Starter', price: '$0/mo', features: ['50k logs/month', '1 alert channel'] },
      { name: 'Pro', price: '$29/mo', features: ['Unlimited logs', 'Real-time webhook relays', 'Incident auto-postmortem'] },
    ],
  });

  // Simulated interactive preview state
  const [previewApiKey, setPreviewApiKey] = useState('sk_live_lp_88921a');
  const [simulatedLogsProcessed, setSimulatedLogsProcessed] = useState(14820);
  const [alertActive, setAlertActive] = useState(false);

  const handleGenerateSpec = async () => {
    if (isEmergencyStopped || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/build-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: productTitle,
          category,
          targetAudience,
          pricingModel,
        }),
      });
      const data = await res.json();
      if (data.spec) {
        setGeneratedSpec(data.spec);
      }
    } catch (e) {
      console.warn('Error generating product spec:', e);
    } finally {
      setIsGenerating(false);
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
                Section 9 &bull; Creation Factory
              </span>
              <span className="text-xs font-mono text-stone-400">
                AI Website / App / SaaS Studio
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono">
              Autonomous Product Creation & Code Studio
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1">
              Builds production websites, interactive web applications, and SaaS architectures (authentication, dashboards, billing, database migrations). Internal versioning ensures independence from GitHub.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onDeployToSandbox(generatedSpec)}
              disabled={isEmergencyStopped}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-mono text-xs rounded-lg transition shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Deploy to Sandbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Workspace: Spec Generator Input + Output Views */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Spec Configuration & Prompt Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-3 font-mono">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Product Requirements Spec
            </h3>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Product Title</label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Product Architecture</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="SaaS">SaaS Platform (Auth + Billing + DB)</option>
                <option value="Web Application">Interactive Web Application</option>
                <option value="API Service">Headless API Microservice</option>
                <option value="High-Converting Site">Landing Page & SEO Content System</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Target Customer</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Monetization Pricing</label>
              <input
                type="text"
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2 text-xs text-stone-200 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleGenerateSpec}
              disabled={isGenerating || isEmergencyStopped}
              className={`w-full py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                isGenerating || isEmergencyStopped
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Architecture...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Synthesize Code & Spec</span>
                </>
              )}
            </button>
          </div>

          {/* Current Blueprint Spec Summary */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-2 font-mono text-xs">
            <div className="text-[10px] text-stone-500 uppercase">Architecture Blueprint</div>
            <div className="text-white font-bold">{generatedSpec.productName}</div>
            <p className="text-stone-400 text-[11px] leading-relaxed">{generatedSpec.tagline}</p>
            <div className="pt-2 border-t border-stone-800 flex flex-wrap gap-1">
              {(generatedSpec.techStack || []).map((t: string, i: number) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Studio Workspace with View Switcher */}
        <div className="lg:col-span-8 space-y-3">
          
          {/* View Mode Bar */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-2 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveView('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                  activeView === 'preview'
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Interactive Live Preview</span>
              </button>

              <button
                onClick={() => setActiveView('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                  activeView === 'code'
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Code Artifacts (Internal Versioning)</span>
              </button>

              <button
                onClick={() => setActiveView('schema')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition ${
                  activeView === 'schema'
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Schema & DB</span>
              </button>
            </div>

            <div className="text-[11px] text-stone-500 hidden sm:block">
              Internal VCS: <span className="text-emerald-400">commit #48f12a</span> (No GitHub Req)
            </div>
          </div>

          {/* Viewport Content */}
          {activeView === 'preview' && (
            <div className="bg-stone-950 border border-stone-800 rounded-xl overflow-hidden shadow-2xl">
              {/* Mock Browser Topbar */}
              <div className="bg-stone-900 px-4 py-2 border-b border-stone-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="text-stone-500 ml-2">https://sandbox.stassen.io/app/live-preview</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  SANDBOX CONTAINER RUNNING
                </span>
              </div>

              {/* Interactive Working Live Prototype */}
              <div className="p-6 bg-stone-950 text-stone-100 font-sans space-y-5">
                
                {/* Simulated SaaS Top Nav */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-emerald-500 flex items-center justify-center font-bold text-stone-950 text-xs">
                      LP
                    </div>
                    <span className="font-bold text-sm text-white font-mono">{generatedSpec.productName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                      Org: Acme Engineering
                    </span>
                    <button
                      onClick={() => setAlertActive(!alertActive)}
                      className={`text-xs px-2.5 py-1 rounded font-mono font-bold transition ${
                        alertActive
                          ? 'bg-red-600 text-white'
                          : 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/40'
                      }`}
                    >
                      {alertActive ? 'Incident In Progress' : 'System Normal (0 Alerts)'}
                    </button>
                  </div>
                </div>

                {/* Simulated Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                  <div className="bg-stone-900 p-3 rounded-lg border border-stone-800">
                    <div className="text-[10px] text-stone-400">LOGS INGESTED</div>
                    <div className="text-xl font-bold text-white mt-1">
                      {simulatedLogsProcessed.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">&uarr; 1,420/min throughput</div>
                  </div>
                  <div className="bg-stone-900 p-3 rounded-lg border border-stone-800">
                    <div className="text-[10px] text-stone-400">ANOMALY SCORE</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">
                      {alertActive ? '84/100 (HIGH)' : '0.02 (NOMINAL)'}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1">P99 Latency: 4.2ms</div>
                  </div>
                  <div className="bg-stone-900 p-3 rounded-lg border border-stone-800">
                    <div className="text-[10px] text-stone-400">PLAN TIER</div>
                    <div className="text-xl font-bold text-amber-400 mt-1">Pro ($29/mo)</div>
                    <div className="text-[10px] text-stone-400 mt-1">Stripe billing synced</div>
                  </div>
                </div>

                {/* Simulated Action: Test Ingest */}
                <div className="p-4 bg-stone-900 rounded-lg border border-stone-800 space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-300 font-bold">Simulate Log Event Ingestion</span>
                    <button
                      onClick={() => setSimulatedLogsProcessed((p) => p + 250)}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold rounded transition"
                    >
                      + Send 250 Mock Logs
                    </button>
                  </div>
                  <div className="text-[11px] text-stone-400 bg-stone-950 p-2.5 rounded border border-stone-800/80">
                    API Key: <code className="text-amber-400">{previewApiKey}</code> &bull; Endpoint: POST /v1/ingest
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeView === 'code' && (
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 font-mono text-xs text-stone-300 h-96 overflow-y-auto space-y-3">
              <div className="text-stone-500">// Generated File: /src/app/LogPulseEngine.tsx</div>
              <pre className="text-stone-300 bg-stone-900 p-3 rounded-lg border border-stone-800 overflow-x-auto text-[11px]">
{`import React, { useState } from 'react';

export function LogPulseEngine() {
  const [ingestedCount, setIngestedCount] = useState(14820);
  
  const handleIngest = async (payload: LogChunk) => {
    // Zero single-point-of-failure queue ingestion
    const res = await fetch('/api/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  };

  return (
    <div className="p-6 bg-stone-950 text-white">
      <h2>LogPulse AI Sentinel</h2>
      <p>Processed: {ingestedCount} logs</p>
    </div>
  );
}`}
              </pre>

              <div className="text-stone-500">// Generated Server File: /server/routes/billing.ts</div>
              <pre className="text-stone-300 bg-stone-900 p-3 rounded-lg border border-stone-800 overflow-x-auto text-[11px]">
{`import express from 'express';
export const billingRouter = express.Router();

billingRouter.post('/checkout', async (req, res) => {
  // Configured via Stassen Central Financial Center
  const { planTier, customerEmail } = req.body;
  res.json({ checkoutUrl: 'https://checkout.stripe.com/c/pay/cs_live_sample' });
});`}
              </pre>
            </div>
          )}

          {activeView === 'schema' && (
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 font-mono text-xs text-stone-300 h-96 overflow-y-auto space-y-3">
              <div className="text-stone-500">-- SQLite / PostgreSQL DDL Migration (Zero Vendor Lock-in)</div>
              <pre className="text-stone-300 bg-stone-900 p-3 rounded-lg border border-stone-800 overflow-x-auto text-[11px]">
{`CREATE TABLE IF NOT EXISTS tenants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subscription_tier TEXT DEFAULT 'starter',
  stripe_customer_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS log_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES tenants(id),
  severity TEXT NOT NULL,
  message TEXT NOT NULL,
  anomaly_score REAL DEFAULT 0.0,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_logs_tenant ON log_events(tenant_id, timestamp);`}
              </pre>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
