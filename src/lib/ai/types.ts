// ─────────────────────────────────────────────────────────────────────────────
// Possible AI Research & Report Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PropertyInput {
  address: string;
  type: string;
  tenure: string;
  epc_rating?: string;
  description?: string;
  current_valuation?: number;
  bedrooms?: number;
  bathrooms?: number;
}

// ── Planning intelligence ────────────────────────────────────────────────────

export interface PlanningData {
  conservation_area: boolean;
  conservation_area_name?: string;
  conservation_area_notes?: string;
  listed_building: boolean;
  listed_building_grade?: string; // "Grade I" | "Grade II*" | "Grade II"
  tpo: boolean;
  tpo_notes?: string;
  flood_risk: 'low' | 'medium' | 'high' | 'unknown';
  flood_risk_zone?: string;
  article_4: boolean;
  article_4_notes?: string;
  lpa: string; // Local Planning Authority
  lpa_url?: string;
  permitted_development: {
    rear_extension: boolean;
    loft_conversion: boolean;
    garage_conversion: boolean;
    side_extension: boolean;
    notes: string;
  };
}

// ── Research flags ───────────────────────────────────────────────────────────

export interface ResearchFlag {
  title: string;
  description: string;
  type: 'opportunity' | 'risk' | 'constraint';
  severity: 'high' | 'medium' | 'low';
  source?: string;
}

// ── Planning precedents ──────────────────────────────────────────────────────

export interface NearbyPrecedent {
  address: string;
  description: string;
  year: number;
  decision: 'approved' | 'refused' | 'unknown';
  type: string; // "Rear extension", "Loft conversion", etc.
  reference?: string; // Planning application reference
}

// ── Market intelligence ──────────────────────────────────────────────────────

export interface MarketContext {
  avg_price_psf?: string;
  typical_extension_uplift_pct?: number;
  typical_extension_uplift_description?: string;
  market_summary: string;
  comparable_sales?: string;
  demand_level?: 'high' | 'medium' | 'low';
}

// ── Full research result ─────────────────────────────────────────────────────

export interface ResearchResult {
  property: PropertyInput;
  planning: PlanningData;
  opportunities: ResearchFlag[];
  risks: ResearchFlag[];
  constraints: ResearchFlag[];
  nearby_precedents: NearbyPrecedent[];
  market_context: MarketContext;
  planning_confidence: number; // 0–100
  development_potential: 'high' | 'medium' | 'low';
  research_sources: string[];
  summary: string;
  generated_at: string;
}

// ── Report generation inputs ─────────────────────────────────────────────────

export interface ArchitectDesign {
  scope_description: string;
  cost_min: number;
  cost_max: number;
  architect_name: string;
  proposed_features?: string[];
  render_urls?: string[];
}

export interface AgentValuation {
  current_value: number;
  projected_value: number;
  agent_commentary: string;
  agent_name: string;
  firm_name: string;
}

// ── Full report data (returned from generate-report) ────────────────────────

export interface ReportData {
  id: string;
  property: PropertyInput;
  research: ResearchResult;
  design: ArchitectDesign;
  valuation: AgentValuation;
  // Claude-generated narrative sections
  executive_summary: string;
  design_narrative: string;
  planning_narrative: string;
  financial_analysis: string;
  next_steps: string[];
  generated_at: string;
}

// ── SSE event types (streamed from /api/research) ────────────────────────────

export type ResearchPhase = 'init' | 'openai' | 'claude' | 'done';

export interface ResearchSSEEvent {
  type: 'status' | 'partial' | 'complete' | 'error';
  phase?: ResearchPhase;
  message?: string;
  progress?: number; // 0–100
  section?: string;
  data?: ResearchResult;
  error?: string;
}
