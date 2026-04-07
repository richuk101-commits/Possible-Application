'use client';

import { useState, useEffect, useRef } from 'react';

const suggestions = [
  { icon: 'home', label: '14 Church Lane, Bristol', meta: 'Listing · In Progress' },
  { icon: 'home', label: '72 Bath Road, Bath', meta: 'Listing · Architect Selection' },
  { icon: 'description', label: 'Minstead House — Dev Report', meta: 'Report · Draft' },
  { icon: 'person', label: 'Select architect for Mill Street', meta: 'Action' },
  { icon: 'add_home', label: 'Add a new listing', meta: 'Action' },
  { icon: 'assessment', label: 'Review pending reports', meta: 'Action' },
];

interface CommandBarProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandBar({ open, onClose }: CommandBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [open]);

  const filtered = query.trim()
    ? suggestions.filter(s =>
        s.label.toLowerCase().includes(query.toLowerCase()) ||
        s.meta.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#131B2E]/30 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl shadow-[#131B2E]/20 border border-outline-variant/20 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/10">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && onClose()}
            placeholder="Search listings, reports, or ask anything…"
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none"
          />
          <kbd className="text-[10px] font-mono text-on-surface-variant/40 border border-outline-variant/30 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <ul className="py-2 max-h-72 overflow-y-auto">
          {filtered.length === 0 && (
            <li className="px-5 py-4 text-sm text-on-surface-variant text-center italic">
              No results found
            </li>
          )}
          {filtered.map((item, i) => (
            <li key={i}>
              <button
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-surface-container/60 transition-colors text-left group"
                onClick={onClose}
              >
                <span className="material-symbols-outlined text-primary/70 text-[18px] flex-shrink-0">
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">{item.label}</p>
                  <p className="text-[10px] text-on-surface-variant">{item.meta}</p>
                </div>
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant/30 group-hover:text-primary/50 transition-colors flex-shrink-0">
                  arrow_forward
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-outline-variant/10 flex items-center gap-4 text-[10px] text-on-surface-variant/40 font-mono">
          <span><kbd className="border border-outline-variant/30 px-1 rounded">↑↓</kbd> navigate</span>
          <span><kbd className="border border-outline-variant/30 px-1 rounded">↵</kbd> open</span>
          <span><kbd className="border border-outline-variant/30 px-1 rounded">ESC</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
