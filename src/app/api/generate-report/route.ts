import Anthropic from '@anthropic-ai/sdk';
import type {
  PropertyInput,
  ResearchResult,
  ArchitectDesign,
  AgentValuation,
  ReportData,
} from '@/lib/ai/types';

// ─────────────────────────────────────────────────────────────────────────────
// Claude Opus 4.6 — Full report narrative generation
// ─────────────────────────────────────────────────────────────────────────────

async function generateReportNarratives(
  property: PropertyInput,
  research: ResearchResult,
  design: ArchitectDesign,
  valuation: AgentValuation
): Promise<{
  executive_summary: string;
  design_narrative: string;
  planning_narrative: string;
  financial_analysis: string;
  next_steps: string[];
}> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const netUpliftMin =
    valuation.projected_value - valuation.current_value - design.cost_max;
  const netUpliftMax =
    valuation.projected_value - valuation.current_value - design.cost_min;

  const systemPrompt = `You are an elite UK estate agency copywriter specialising in development potential reports.
Your writing is confident, clear, and persuasive — like the best premium property reports from Savills or Knight Frank.
You write with authority, use UK English, and make complex planning information accessible to clients.
Keep language elevated but not pretentious. Be specific and use actual figures from the data provided.`;

  const userPrompt = `Generate narrative sections for a Development Potential Report with this data:

PROPERTY:
- Address: ${property.address}
- Type: ${property.type}
- Tenure: ${property.tenure}
${property.description ? `- Description: ${property.description}` : ''}

PLANNING INTELLIGENCE:
- Conservation Area: ${research.planning.conservation_area ? `Yes${research.planning.conservation_area_name ? ` (${research.planning.conservation_area_name})` : ''}` : 'No'}
- Listed Building: ${research.planning.listed_building ? `Yes (${research.planning.listed_building_grade ?? 'Grade unknown'})` : 'No'}
- Flood Risk: ${research.planning.flood_risk}
- Permitted Development — Rear Extension: ${research.planning.permitted_development.rear_extension ? 'Yes' : 'No'}
- Permitted Development — Loft Conversion: ${research.planning.permitted_development.loft_conversion ? 'Yes' : 'No'}
- Planning Confidence Score: ${research.planning_confidence}%
- Development Potential: ${research.development_potential.toUpperCase()}

KEY OPPORTUNITIES:
${research.opportunities.map((o) => `• ${o.title}: ${o.description}`).join('\n')}

KEY RISKS / TO INVESTIGATE:
${research.risks.map((r) => `• ${r.title}: ${r.description}`).join('\n')}

CONSTRAINTS:
${research.constraints.map((c) => `• ${c.title}: ${c.description}`).join('\n')}

NEARBY PRECEDENTS:
${research.nearby_precedents.map((p) => `• ${p.address} — ${p.type} (${p.decision}, ${p.year})`).join('\n')}

MARKET CONTEXT:
${research.market_context.market_summary}
${research.market_context.avg_price_psf ? `Average price per sq ft: ${research.market_context.avg_price_psf}` : ''}
${research.market_context.typical_extension_uplift_description ?? ''}

ARCHITECT'S DESIGN (${design.architect_name}):
${design.scope_description}
${design.proposed_features?.length ? `Proposed features: ${design.proposed_features.join(', ')}` : ''}
Estimated development cost: £${design.cost_min.toLocaleString()} – £${design.cost_max.toLocaleString()}

AGENT VALUATION (${valuation.agent_name}, ${valuation.firm_name}):
- Current market value: £${valuation.current_value.toLocaleString()}
- Projected value post-development: £${valuation.projected_value.toLocaleString()}
- Gross uplift: £${(valuation.projected_value - valuation.current_value).toLocaleString()} (+${Math.round(((valuation.projected_value - valuation.current_value) / valuation.current_value) * 100)}%)
- Net uplift range: £${netUpliftMin.toLocaleString()} to £${netUpliftMax.toLocaleString()}
- Agent commentary: ${valuation.agent_commentary}

Return a JSON object with EXACTLY these keys (no markdown, raw JSON only):

{
  "executive_summary": "2-3 sentence punchy summary of the opportunity and headline figures",
  "design_narrative": "2-3 paragraph description of the proposed architectural transformation. Lead with the vision, describe the key design moves, and explain how it enhances the property's character and value. 200-300 words.",
  "planning_narrative": "2-3 paragraph assessment of the planning position. Cover conservation area context if relevant, PD rights, key opportunities and constraints, confidence in achieving permission. 150-250 words.",
  "financial_analysis": "2-3 paragraph analysis of the financial case. Cover gross uplift, net uplift, development costs, ROI framing, and market demand context. Be specific with the numbers. 150-250 words.",
  "next_steps": ["step 1", "step 2", "step 3", "step 4"] (4-5 clear action items for the client)
}`;

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    thinking: { type: 'adaptive' },
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  let jsonText = '';
  for (const block of response.content) {
    if (block.type === 'text') {
      jsonText = block.text;
      break;
    }
  }

  jsonText = jsonText
    .replace(/^```(?:json)?\s*/m, '')
    .replace(/\s*```\s*$/m, '')
    .trim();

  try {
    return JSON.parse(jsonText);
  } catch {
    return {
      executive_summary: research.summary,
      design_narrative: design.scope_description,
      planning_narrative: research.planning_confidence >= 70
        ? 'This property presents strong planning fundamentals for the proposed development.'
        : 'The planning position requires further verification with the local planning authority.',
      financial_analysis: `At £${valuation.current_value.toLocaleString()} current value with a projected post-development value of £${valuation.projected_value.toLocaleString()}, the gross uplift potential is £${(valuation.projected_value - valuation.current_value).toLocaleString()}.`,
      next_steps: [
        'Commission a structural survey of the property',
        'Submit a pre-application enquiry to the local planning authority',
        'Agree a detailed project brief with the architect',
        'Obtain comparative market analysis for post-development value',
        'Engage a project manager for cost programme oversight',
      ],
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Route handler — POST /api/generate-report
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  let body: {
    property: PropertyInput;
    research: ResearchResult;
    design: ArchitectDesign;
    valuation: AgentValuation;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { property, research, design, valuation } = body;

  if (!property?.address || !research || !design || !valuation) {
    return Response.json(
      { error: 'property, research, design, and valuation are all required' },
      { status: 400 }
    );
  }

  try {
    const narratives = await generateReportNarratives(
      property,
      research,
      design,
      valuation
    );

    const report: ReportData = {
      id: `report_${Date.now()}`,
      property,
      research,
      design,
      valuation,
      executive_summary: narratives.executive_summary,
      design_narrative: narratives.design_narrative,
      planning_narrative: narratives.planning_narrative,
      financial_analysis: narratives.financial_analysis,
      next_steps: narratives.next_steps,
      generated_at: new Date().toISOString(),
    };

    return Response.json({ data: report });
  } catch (err: unknown) {
    console.error('Report generation error:', err);
    return Response.json(
      { error: err instanceof Error ? err.message : 'Report generation failed' },
      { status: 500 }
    );
  }
}
