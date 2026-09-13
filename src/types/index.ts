export type NavigationTab =
  | 'dashboard'
  | 'workforce'
  | 'projects'
  | 'opportunities'
  | 'studio'
  | 'testing'
  | 'deployments'
  | 'monitoring'
  | 'finance'
  | 'financial'
  | 'knowledge'
  | 'growth'
  | 'security'
  | 'marketplace';

export type OperatingMode = 'command_center' | 'marketplace';

export type AgentDivision =
  | 'Research division'
  | 'Product division'
  | 'Engineering / creation division'
  | 'Quality division'
  | 'Growth division'
  | 'Finance and management';

export type AgentStatus = 'idle' | 'active' | 'reviewing' | 'recovering' | 'standby';

export interface Agent {
  id: string;
  name: string;
  role: string;
  division: AgentDivision;
  status: AgentStatus;
  currentTask?: string;
  model: string;
  health: 'healthy' | 'degraded' | 'recovering';
  costPerHour: number;
  tasksCompleted: number;
  confidenceAvg: number;
  lastCheckpoint?: string;
}

export interface StructuredTaskRecord {
  taskId: string;
  projectId: string;
  ownerAgent: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[];
  input: string;
  requiredOutput: string;
  evidence: string[];
  confidence: number;
  budgetCost: number;
  deadline: string;
  status: 'pending' | 'in_progress' | 'testing' | 'passed' | 'failed' | 'escalated';
  testResults: string;
  reviewerResult: string;
  artifactRef?: string;
  nextAction: string;
  timestamp: string;
}

export type BusinessLifecycle = 'growing' | 'weak' | 'failing' | 'scaling' | 'retired' | 'building';

export interface JuniorBusinessUnit {
  id: string;
  name: string;
  codeName: string; // e.g. Business A
  category: 'SaaS' | 'Web Application' | 'Digital Product' | 'API Service';
  tagline: string;
  lifecycle: BusinessLifecycle;
  objective: string;
  monthlyRevenue: number;
  monthlyCost: number;
  netEconomicOutput: number;
  margin: number;
  users: number;
  activeAgents: number;
  healthScore: number; // 0 - 100
  lastDeployed: string;
  url: string;
  version: string;
  techStack: string[];
  domain: string;
  sslValid: boolean;
  experimentsActive: number;
  features: string[];
}

export interface MarketOpportunity {
  id: string;
  title: string;
  marketNiche: string;
  opportunityScore: number; // 0 - 100
  searchDemandMonthly: number;
  competitionLevel: 'low' | 'medium' | 'high';
  estGrossRevenue: string;
  estNetOutput: string;
  paybackDays: number;
  suggestedBusinessModel: string;
  evidence: string[];
  status: 'discovered' | 'approved' | 'in_build' | 'rejected' | 'deployed';
  discoveredBy: string;
  discoveredAt: string;
}

export type AutonomousLoopStage =
  | 'OBJECTIVE'
  | 'RESEARCH'
  | 'SELECT'
  | 'PLAN'
  | 'BUILD'
  | 'TEST'
  | 'DEPLOY'
  | 'DISCOVER USERS'
  | 'MONETIZE'
  | 'MEASURE'
  | 'REPAIR/IMPROVE'
  | 'SCALE/KILL'
  | 'LEARN'
  | 'REPEAT';

export interface AutonomousRunLog {
  id: string;
  stage: AutonomousLoopStage;
  agent: string;
  division: AgentDivision;
  decision: string;
  evidence: string[];
  confidence: number;
  cost: number;
  timestamp: string;
  status: 'passed' | 'active' | 'repaired' | 'promoted';
}

export interface FinancialLedgerEntry {
  id: string;
  date: string;
  type: 'revenue' | 'ai_cost' | 'infra' | 'api' | 'payment_fee' | 'operating';
  description: string;
  product: string;
  amount: number;
}

export interface UnitEconomics {
  grossRevenue: number;
  aiCosts: number;
  infraCosts: number;
  apiCosts: number;
  paymentFees: number;
  otherOperatingCosts: number;
  netEconomicOutput: number;
  marginPercent: number;
  arpu: number;
  cac: number;
  ltv: number;
  paybackPeriodDays: number;
  revenuePerAgentHour: number;
}

export interface HealthIncident {
  id: string;
  timestamp: string;
  service: string;
  type: 'HTTP 5xx' | 'Slow Query' | 'Quota Throttle' | 'Broken Link' | 'Memory Leak';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'diagnosing' | 'sandboxed' | 'tested' | 'repaired' | 'rolled_back';
  autoRepairLog: string;
  resolvedAt?: string;
}

export interface Experiment {
  id: string;
  productId: string;
  productName: string;
  name: string;
  hypothesis: string;
  metric: string;
  variantA: string;
  variantB: string;
  sampleSize: number;
  conversionA: number;
  conversionB: number;
  confidence: number;
  status: 'running' | 'promoted' | 'rejected';
  actionTaken: string;
}

export interface KnowledgeNode {
  id: string;
  type: 'MARKET' | 'OPPORTUNITY' | 'PRODUCT' | 'CUSTOMER' | 'EXPERIMENT' | 'REVENUE' | 'STRATEGY' | 'LEARNING';
  label: string;
  details: string;
  impactScore: number;
}

export interface KnowledgeEdge {
  from: string;
  to: string;
  relationship: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  hash: string;
  reversible: boolean;
  status: 'confirmed' | 'escalated' | 'rolled_back';
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: 'SaaS Platform' | 'Web Application' | 'High-Converting Site' | 'API Microservice';
  tagline: string;
  description: string;
  oneTimePrice?: number;
  subscriptionPrice?: number;
  turnaroundTime: string;
  rating: number;
  features: string[];
  techStack: string[];
  demoUrl: string;
  badge?: string;
}
