export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-center items-center w-full px-8 py-4 pointer-events-none">
      <div className="glass-header shadow-ambient rounded-xl max-w-3xl w-full flex items-center px-4 py-3 gap-3 border border-outline-variant/15 pointer-events-auto bg-white/60">
        <span className="material-symbols-outlined text-primary">auto_awesome</span>
        <input 
          className="bg-transparent border-none focus:ring-0 flex-1 text-xs font-mono tracking-tight text-on-surface-variant placeholder:text-outline outline-none" 
          placeholder="Search listings or ask me anything... e.g. 'Which listings need my attention?'" 
          type="text"
        />
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-mono text-on-surface-variant">⌘K</kbd>
          <div className="h-4 w-px bg-outline-variant/30 mx-2"></div>
          <span className="material-symbols-outlined text-on-surface-variant text-sm hover:text-primary cursor-pointer">notifications</span>
          <span className="material-symbols-outlined text-on-surface-variant text-sm hover:text-primary cursor-pointer">help_outline</span>
        </div>
      </div>
    </header>
  );
}
