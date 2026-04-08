import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import type {
  PropertyInput,
  ResearchResult,
  ResearchSSEEvent,
  ResearchFlag,
  NearbyPrecedent,
  PlanningData,
  MarketContext,
} from '@/lib/ai/types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type SendFn = (event: ResearchSSEEvent) => void;

// ─────────────────────────────────────────────────────────────────────────────
// Phase 1 — OpenAI deep web research
// Uses the Responses API with web_search_preview for real-time internet access
// ─────────────────────────────────────────────────────────────────────────────

async function runOpenAIResearch(
  property: PropertyInput,
  send: SendFn
): Promise<string> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Extract postcode / area for market queries
  const parts = property.address.split(',').map((s) => s.trim());
  const postcode = parts[parts.length - 1] ?? '';
  const area = parts.slice(-2).join(', ');

  const searches = [
    {
      label: 'Checking conservation area & listed building status',
      query: `Is "${property.address}" in a conservation area? Is it a listed building? What planning constraints apply? UK planning portal or local authority records.`,
    },
    {
      label: 'Reviewing permitted development rights',
      query: `What are the permitted development rights for "${property.address}" UK? Can it have a rear extension, loft conversion, or side extension without full planning permission? Any Article 4 directions removing PD rights?`,
    },
    {
      label: 'Searching planning application history',
      query: `Planning application history for "${property.address}" or nearby properties. What extensions, conversions, or developments have been approved or refused by the local planning authority?`,
    },
    {
      label: 'Checking flood risk & environmental constraints',
      query: `Flood risk assessment for "${property.address}" UK. Environment Agency flood zones. Any tree preservation orders (TPO) near this property?`,
    },
    {
      label: 'Researching property market & development uplifts',
      query: `Property development value uplift in ${area} postcode ${postcode}. What is the typical price increase from rear extensions or loft conversions? Average price per square foot for ${property.type} properties in this area?`,
    },
  ];

  const results: string[] = [];

  for (let i = 0; i < searches.length; i++) {
    const { label, query } = searches[i];
    const progress = 8 + Math.round((i / searches.length) * 42);
    send({ type: 'status', phase: 'openai', message: label, progress });

    try {
      // Use the Responses API with web_search_preview for real internet access
      const response = await (openai as any).responses.create({
        model: 'gpt-4o',
        tools: [{ type: 'web_search_preview' }],
        tool_choice: 'required',
        input: `You are a UK property development research expert. ${query}

Property context:
- Address: ${property.address}
- Type: ${property.type}
- Tenure: ${property.tenure}
${property.description ? `- Description: ${property.description}` : ''}

Provide specific, factual information from official UK planning sources (planning portals, local authority websites, Environment Agency, Land Registry). If specific information is not available for this exact address, provide the most relevant information available for the area.`,
      });

      const text: string = (response as any).output_text ?? '';
      results.push(`### ${label}\n\n${text}\n`);
    } catch (err: unknown) {
      // Fall back to gpt-4o without web search if Responses API unavailable
      try {
        const fallback = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert UK property development and planning consultant. Provide detailed, realistic analysis based on your knowledge of UK planning law, building regulations, and property markets.',
            },
            {
              role: 'user',
              content: `${query}\n\nProperty: ${property.address}, Type: ${property.type}, Tenure: ${property.tenure}`,
            },
          ],
          max_tokens: 800,
        });
        const text = fallback.choices[0]?.message?.content ?? '';
        results.push(`### ${label}\n\n${text}\n`);
      } catch (fallbackErr: unknown) {
        results.push(
          `### ${label}\n\nResearch unavailable: ${String(fallbackErr)}\n`
        );
      }
    }
  }

  return results.join('\n\n---\n\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 2 — Claude Opus 4.6 synthesis with adaptive thinking
// Takes raw web research and synthesises into structured planning intelligence
// ─────────────────────────────────────────────────────────────────────────────

async function runClaudeSynthesis(
  property: PropertyInput,
  webResearch: string,
  send: SendFn
): Promise<ResearchResult> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  send({
    type: 'status',
    phase: 'claude',
    message: 'Claude synthesising findings with extended thinking…',
    progress: 62,
  });

  const systemPrompt = `You are an elite UK property development consultant and planning expert.
You specialise in analysing planning constraints, development potential, and market context for residential properties.
Your task is to synthesise web research into a structured, accurate planning intelligence report.
Always return valid JSON. Be specific and factual. Use UK spelling.`;

  const userPrompt = `Analyse the following web research for this property and produce a structured JSON intelligence report.

PROPERTY:
- Address: ${property.address}
- Type: ${property.type}
- Tenure: ${property.tenure}
${property.description ? `- Description: ${property.description}` : ''}
${property.current_valuation ? `- Current Valuation: £${property.current_valuation.toLocaleString()}` : ''}

WEB RESEARCH RESULTS:
${webResearch}

Produce a JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "planning": {
    "conservation_area": boolean,
    "conservation_area_name": string or null,
    "conservation_area_notes": string or null,
    "listed_building": boolean,
    "listed_building_grade": string or null,
    "tpo": boolean,
    "tpo_notes": string or null,
    "flood_risk": "low" | "medium" | "high" | "unknown",
    "flood_risk_zone": string or null,
    "article_4": boolean,
    "article_4_notes": string or null,
    "lpa": string,
    "lpa_url": string or null,
    "permitted_development": {
      "rear_extension": boolean,
      "loft_conversion": boolean,
      "garage_conversion": boolean,
      "side_extension": boolean,
      "notes": string
    }
  },
  "opportunities": [
    {
      "title": string,
      "description": string,
      "type": "opportunity",
      "severity": "high" | "medium" | "low",
      "source": string or null
    }
  ],
  "risks": [
    {
      "title": string,
      "description": string,
      "type": "risk",
      "severity": "high" | "medium" | "low",
      "source": string or null
    }
  ],
  "constraints": [
    {
      "title": string,
      "description": string,
      "type": "constraint",
      "severity": "high" | "medium" | "low",
      "source": string or null
    }
  ],
  "nearby_precedents": [
    {
      "address": string,
      "description": string,
      "year": number,
      "decision": "approved" | "refused" | "unknown",
      "type": string,
      "reference": string or null
    }
  ],
  "market_context": {
    "avg_price_psf": string or null,
    "typical_extension_uplift_pct": number or null,
    "typical_extension_uplift_description": string or null,
    "market_summary": string,
    "comparable_sales": string or null,
    "demand_level": "high" | "medium" | "low"
  },
  "planning_confidence": number between 0 and 100,
  "development_potential": "high" | "medium" | "low",
  "research_sources": array of strings (URLs or source names used),
  "summary": string (2-3 sentence executive summary of the development potential)
}

Ensure:
- opportunities array has 2-4 items
- risks array has 1-3 items
- constraints array has 1-3 items
- nearby_precedents array has 2-4 items
- All boolean fields are actual booleans, not strings
- planning_confidence reflects certainty in the data (high if definitive sources found, lower if inferred)`;

  send({
    type: 'status',
    phase: 'claude',
    message: 'Evaluating planning opportunities and constraints…',
    progress: 72,
  });

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    thinking: { type: 'adaptive' },
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  send({
    type: 'status',
    phase: 'claude',
    message: 'Structuring intelligence report…',
    progress: 88,
  });

  // Extract JSON from Claude's response
  let jsonText = '';
  for (const block of response.content) {
    if (block.type === 'text') {
      jsonText = block.text;
      break;
    }
  }

  // Strip any markdown code fences if present
  jsonText = jsonText
    .replace(/^```(?:json)?\s*/m, '')
    .replace(/\s*```\s*$/m, '')
    .trim();

  let parsed: {
    planning: PlanningData;
    opportunities: ResearchFlag[];
    risks: ResearchFlag[];
    constraints: ResearchFlag[];
    nearby_precedents: NearbyPrecedent[];
    market_context: MarketContext;
    planning_confidence: number;
    development_potential: 'high' | 'medium' | 'low';
    research_sources: string[];
    summary: string;
  };

  try {
    parsed = JSON.parse(jsonText);
  } catch {
    // If JSON parsing fails, return a sensible fallback
    parsed = buildFallbackResult(property);
  }

  const result: ResearchResult = {
    property,
    planning: parsed.planning,
    opportunities: parsed.opportunities ?? [],
    risks: parsed.risks ?? [],
    constraints: parsed.constraints ?? [],
    nearby_precedents: parsed.nearby_precedents ?? [],
    market_context: parsed.market_context ?? { market_summary: 'Analysis unavailable.' },
    planning_confidence: parsed.planning_confidence ?? 50,
    development_potential: parsed.development_potential ?? 'medium',
    research_sources: parsed.research_sources ?? [],
    summary: parsed.summary ?? '',
    generated_at: new Date().toISOString(),
  };

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback result when Claude returns unparseable JSON
// ─────────────────────────────────────────────────────────────────────────────

function buildFallbackResult(property: PropertyInput): {
  planning: PlanningData;
  opportunities: ResearchFlag[];
  risks: ResearchFlag[];
  constraints: ResearchFlag[];
  nearby_precedents: NearbyPrecedent[];
  market_context: MarketContext;
  planning_confidence: number;
  development_potential: 'high' | 'medium' | 'low';
  research_sources: string[];
  summary: string;
} {
  return {
    planning: {
      conservation_area: false,
      listed_building: false,
      tpo: false,
      flood_risk: 'unknown',
      article_4: false,
      lpa: 'To be confirmed',
      permitted_development: {
        rear_extension: true,
        loft_conversion: true,
        garage_conversion: true,
        side_extension: false,
        notes: 'Permitted development rights require verification with the LPA.',
      },
    },
    opportunities: [
      {
        title: 'Rear extension potential',
        description: 'Property type suggests rear extension may be viable under permitted development.',
        type: 'opportunity',
        severity: 'high',
      },
    ],
    risks: [
      {
        title: 'Planning verification required',
        description: 'Automated research could not confirm all planning constraints. Manual verification recommended.',
        type: 'risk',
        severity: 'medium',
      },
    ],
    constraints: [],
    nearby_precedents: [],
    market_context: {
      market_summary: `Development uplift potential in this area requires further market analysis for ${property.address}.`,
      demand_level: 'medium',
    },
    planning_confidence: 40,
    development_potential: 'medium',
    research_sources: [],
    summary: `Preliminary analysis for ${property.address}. Full planning intelligence requires manual verification with the local planning authority.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Route handler — POST /api/research
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  let property: PropertyInput;
  try {
    const body = await request.json();
    property = body.property as PropertyInput;
    if (!property?.address) {
      return new Response(JSON.stringify({ error: 'property.address is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();
  let controllerRef: ReadableStreamDefaultController<Uint8Array> | null = null;
  let closed = false;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controllerRef = controller;
    },
    cancel() {
      closed = true;
      controllerRef = null;
    },
  });

  // Run research pipeline asynchronously
  void (async () => {
    const send = (event: ResearchSSEEvent) => {
      if (closed || !controllerRef) return;
      try {
        controllerRef.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      } catch {
        closed = true;
      }
    };

    try {
      send({
        type: 'status',
        phase: 'init',
        message: `Initialising research for ${property.address}…`,
        progress: 2,
      });

      // Phase 1 — OpenAI web research
      send({
        type: 'status',
        phase: 'openai',
        message: 'Starting deep web research with GPT-4o…',
        progress: 5,
      });

      const webResearch = await runOpenAIResearch(property, send);

      send({
        type: 'status',
        phase: 'openai',
        message: 'Web research complete. Handing to Claude for synthesis…',
        progress: 55,
      });

      // Phase 2 — Claude Opus 4.6 synthesis
      const result = await runClaudeSynthesis(property, webResearch, send);

      send({
        type: 'status',
        phase: 'done',
        message: 'Research complete.',
        progress: 100,
      });

      send({ type: 'complete', data: result, progress: 100 });
    } catch (err: unknown) {
      send({
        type: 'error',
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      if (!closed && controllerRef) {
        try {
          controllerRef.close();
        } catch {
          // Already closed
        }
      }
    }
  })();

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
