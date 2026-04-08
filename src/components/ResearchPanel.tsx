'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { PropertyInput, ResearchResult, ResearchSSEEvent } from '@/lib/ai/types';

interface Props {
  listingId: string;
  property: PropertyInput;
  onComplete?: (result: ResearchResult) => void;
}

type PanelState = 'idle' | 'running' | 'complete' | 'error';

interface LogEntry {
  id: number;
  phase: string;
  message: string;
  progress: number;
}

const STORAGE_KEY = (id: string) => `research_result_${id}`;

export default function ResearchPanel({ listingId, property, onComplete }: Props) {
  const [state, setState] = useState<PanelState>('idle');
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('opportunities');
  const logEndRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<string> | null>(null);
  const logIdRef = useRef(0);

  // Load cached result from sessionStorage on mount
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY(listingId));
      if (cached) {
        const parsed: ResearchResult = JSON.parse(cached);
        setResult(parsed);
        setState('complete');
        onComplete?.(parsed);
      }
    } catch {
      // ignore
    }
  }, [listingId, onComplete]);

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const addLog = useCallback((phase: string, message: string, prog: number) => {
    setLog((prev) => [
      ...prev,
      { id: logIdRef.current++, phase, message, progress: prog },
    ]);
    setProgress(prog);
  }, []);

  const startResearch = useCallback(async () => {
    if (state === 'running') return;
    setState('running');
    setLog([]);
    setError(null);
    setProgress(0);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Research API returned ${response.status}`);
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      readerRef.current = reader;

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += value;
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;

          try {
            const event: ResearchSSEEvent = JSON.parse(jsonStr);

            if (event.type === 'status') {
              addLog(
                event.phase ?? 'info',
                event.message ?? '',
                event.progress ?? progress
              );
            } else if (event.type === 'complete' && event.data) {
              const res = event.data as ResearchResult;
              setResult(res);
              setState('complete');
              setProgress(100);
              // Cache in sessionStorage
              try {
                sessionStorage.setItem(STORAGE_KEY(listingId), JSON.stringify(res));
              } catch {
                // ignore storage errors
              }
              onComplete?.(res);
            } else if (event.type === 'error') {
              throw new Error(event.error ?? 'Research failed');
            }
          } catch (parseErr) {
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setState('error');
    }
  }, [state, property, listingId, onComplete, progress, addLog]);

  const clearCache = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY(listingId));
    setResult(null);
    setState('idle');
    setLog([]);
    setError(null);
    setProgress(0);
  }, [listingId]);

  const confidenceColor = (score: number) =>
    score >= 75 ? 'text-tertiary' : score >= 50 ? 'text-secondary' : 'text-amber-500';

  const phaseIcon = (phase: string) => {
    if (phase === 'openai') return '⚡';
    if (phase === 'claude') return '✦';
    if (phase === 'done') return '✅';
    return '·';
  };

  // ── IDLE STATE ──────────────────────────────────────────────────────────────
  if (state === 'idle') {
    return (
      <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 flex items-start gap-6">
          <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              manage_search
            </span>
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-on-surface mb-1">
              AI Planning Research
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-5 max-w-xl">
              Run a deep research pass using GPT-4o web search + Claude Opus 4.6
              to surface planning constraints, permitted development rights, nearby
              precedents, and market uplift data for this property.
            </p>
            <div className="flex gap-6 mb-6">
              {[
                { icon: 'location_city', label: 'Conservation & listing status' },
                { icon: 'rule', label: 'Permitted development rights' },
                { icon: 'history', label: 'Planning precedents' },
                { icon: 'trending_up', label: 'Market uplift data' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[16px]">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
            <button
              onClick={startResearch}
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              Run AI Research
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RUNNING STATE ───────────────────────────────────────────────────────────
  if (state === 'running') {
    return (
      <div className="mt-8 bg-white rounded-2xl border border-primary/20 shadow-sm overflow-hidden">
        {/* Progress header */}
        <div className="px-8 pt-6 pb-4 border-b border-slate-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,104,95,0.5)]" />
              <span className="text-sm font-bold text-primary">
                AI Research Running
              </span>
            </div>
            <span className="font-mono text-xs text-on-surface-variant">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Live log */}
        <div className="px-8 py-5 max-h-56 overflow-y-auto font-mono text-[11px] space-y-1.5 bg-slate-50/50">
          {log.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3 text-on-surface-variant">
              <span className="flex-shrink-0 w-4">{phaseIcon(entry.phase)}</span>
              <span className={entry.phase === 'claude' ? 'text-primary font-medium' : ''}>
                {entry.message}
              </span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Phase legend */}
        <div className="px-8 py-3 bg-white border-t border-slate-50 flex gap-5 text-[10px] text-on-surface-variant">
          <span className="flex items-center gap-1.5">⚡ <span>GPT-4o web search</span></span>
          <span className="flex items-center gap-1.5">✦ <span>Claude Opus 4.6 synthesis</span></span>
        </div>
      </div>
    );
  }

  // ── ERROR STATE ─────────────────────────────────────────────────────────────
  if (state === 'error') {
    return (
      <div className="mt-8 bg-error/5 border border-error/20 rounded-2xl p-6 flex items-start gap-4">
        <span className="material-symbols-outlined text-error text-2xl">error</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-error mb-1">Research failed</p>
          <p className="text-xs text-on-surface-variant mb-4">{error}</p>
          <button
            onClick={() => { setState('idle'); setError(null); }}
            className="text-xs font-bold text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ── COMPLETE STATE ──────────────────────────────────────────────────────────
  if (state === 'complete' && result) {
    const confidenceScore = result.planning_confidence;

    return (
      <div className="mt-8 space-y-4">
        {/* Header bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-sm font-bold text-on-surface">AI Research Complete</span>
            </div>
            <span className="text-[10px] text-on-surface-variant font-mono px-2 py-0.5 bg-slate-100 rounded">
              {new Date(result.generated_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <button
            onClick={clearCache}
            className="text-[10px] text-on-surface-variant/50 hover:text-on-surface-variant transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            Re-run
          </button>
        </div>

        {/* Summary card */}
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
          <p className="text-sm text-on-surface leading-relaxed italic">"{result.summary}"</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              Planning Confidence
            </p>
            <p className={`text-2xl font-black ${confidenceColor(confidenceScore)}`}>
              {confidenceScore}%
            </p>
            <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  confidenceScore >= 75
                    ? 'bg-tertiary'
                    : confidenceScore >= 50
                    ? 'bg-secondary'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              Development Potential
            </p>
            <p
              className={`text-lg font-black uppercase tracking-wider ${
                result.development_potential === 'high'
                  ? 'text-tertiary'
                  : result.development_potential === 'medium'
                  ? 'text-primary'
                  : 'text-amber-500'
              }`}
            >
              {result.development_potential}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
              LPA
            </p>
            <p className="text-sm font-bold text-on-surface leading-tight">
              {result.planning.lpa}
            </p>
          </div>
        </div>

        {/* Planning flags */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            {/* Opportunities */}
            <div className="p-5">
              <button
                className="flex items-center gap-2 mb-4 w-full"
                onClick={() => setExpandedSection(expandedSection === 'opportunities' ? null : 'opportunities')}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_6px_rgba(0,105,71,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                  Opportunities ({result.opportunities.length})
                </span>
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant/40 ml-auto">
                  {expandedSection === 'opportunities' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {(expandedSection === 'opportunities' || true) && (
                <ul className="space-y-3">
                  {result.opportunities.map((o, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[14px] mt-0.5 flex-shrink-0">
                        check_circle
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-on-surface leading-snug">{o.title}</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed">{o.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Risks */}
            <div className="p-5">
              <button
                className="flex items-center gap-2 mb-4 w-full"
                onClick={() => setExpandedSection(expandedSection === 'risks' ? null : 'risks')}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                  To Investigate ({result.risks.length})
                </span>
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant/40 ml-auto">
                  {expandedSection === 'risks' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              <ul className="space-y-3">
                {result.risks.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[14px] mt-0.5 flex-shrink-0">
                      warning
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-on-surface leading-snug">{r.title}</p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed">{r.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Constraints */}
            <div className="p-5">
              <button
                className="flex items-center gap-2 mb-4 w-full"
                onClick={() => setExpandedSection(expandedSection === 'constraints' ? null : 'constraints')}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-error shadow-[0_0_6px_rgba(186,26,26,0.4)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                  Constraints ({result.constraints.length})
                </span>
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant/40 ml-auto">
                  {expandedSection === 'constraints' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              <ul className="space-y-3">
                {result.constraints.length === 0 ? (
                  <li className="text-[10px] text-on-surface-variant/50 italic">None identified</li>
                ) : (
                  result.constraints.map((c, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="material-symbols-outlined text-error text-[14px] mt-0.5 flex-shrink-0">
                        block
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-on-surface leading-snug">{c.title}</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed">{c.description}</p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Permitted development quick-check */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">
            Permitted Development Rights
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Rear Extension', key: 'rear_extension' },
              { label: 'Loft Conversion', key: 'loft_conversion' },
              { label: 'Side Extension', key: 'side_extension' },
              { label: 'Garage Conversion', key: 'garage_conversion' },
            ].map(({ label, key }) => {
              const granted = (result.planning.permitted_development as Record<string, boolean>)[key];
              return (
                <div
                  key={key}
                  className={`p-3 rounded-lg text-center ${
                    granted ? 'bg-tertiary/8 border border-tertiary/20' : 'bg-slate-50 border border-slate-100'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${granted ? 'text-tertiary' : 'text-slate-300'}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {granted ? 'check_circle' : 'cancel'}
                  </span>
                  <p className={`text-[10px] font-bold mt-1 ${granted ? 'text-tertiary' : 'text-slate-400'}`}>
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
          {result.planning.permitted_development.notes && (
            <p className="text-[10px] text-on-surface-variant/70 italic mt-3 leading-relaxed">
              {result.planning.permitted_development.notes}
            </p>
          )}
        </div>

        {/* Nearby precedents */}
        {result.nearby_precedents.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                Nearby Planning Precedents
              </p>
            </div>
            <div className="divide-y divide-slate-50">
              {result.nearby_precedents.map((p, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-on-surface">{p.address}</p>
                    <p className="text-[10px] text-on-surface-variant">{p.type} · {p.year}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      p.decision === 'approved'
                        ? 'bg-tertiary/10 text-tertiary'
                        : p.decision === 'refused'
                        ? 'bg-error/10 text-error'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {p.decision}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market context */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-3">
            Market Context
          </p>
          <p className="text-sm text-on-surface-variant leading-relaxed">{result.market_context.market_summary}</p>
          {result.market_context.typical_extension_uplift_description && (
            <p className="text-xs text-primary font-semibold mt-2">
              {result.market_context.typical_extension_uplift_description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
}
