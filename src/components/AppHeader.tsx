'use client';

import { useState, useEffect } from 'react';
import CommandBar from './CommandBar';

export default function AppHeader() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifCount] = useState(3);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <CommandBar open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <header className="sticky top-0 z-40 w-full h-16 bg-[#FAF8FF]/80 backdrop-blur-xl flex items-center justify-between px-10 border-b border-slate-200/20 shrink-0">
        {/* AI Command Search */}
        <div className="flex-1 max-w-xl">
          <button
            onClick={() => setCmdOpen(true)}
            className="w-full flex items-center gap-3 bg-surface-container-highest/40 hover:bg-surface-container-highest/70 border border-outline-variant/20 rounded-full px-4 py-2.5 transition-all duration-200 group"
          >
            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="text-sm text-on-surface-variant/60 flex-1 text-left">
              Search or ask anything…
            </span>
            <kbd className="text-[10px] font-mono text-on-surface-variant/40 border border-outline-variant/30 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4 ml-8">
          {/* Notification Bell */}
          <div className="relative">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            {notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {notifCount}
              </span>
            )}
          </div>

          {/* Help */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined text-[22px]">help_outline</span>
          </button>
        </div>
      </header>
    </>
  );
}
