export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 flex flex-col justify-between py-8 px-6 h-screen w-60 border-r-0 bg-surface-container-low font-sans antialiased tracking-tight text-sm font-medium">
      <div className="space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tighter text-primary">Possible</h1>
          <p className="text-[10px] tracking-[0.2em] font-bold text-on-surface-variant uppercase">The Intelligent Estate</p>
        </div>
        <nav className="space-y-1">
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary font-semibold border-r-2 border-primary hover:bg-surface-container-high transition-colors duration-150" href="/">
            <span className="material-symbols-outlined">dynamic_feed</span>
            Feed
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-150" href="/archive">
            <span className="material-symbols-outlined">archive</span>
            Archive
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-150" href="/settings">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer">
        <img alt="James Miller" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDffMM25tw6R5Se_A4l7UychoKSrucAU7YDuPH6cuUMT2wZrmCICjABJLlwtN5mMQOTWa1TbFYcVxPgpen0Kyob8igPWS0cT3I-g1eeQNzZeyd8mtIvn-xRsFBnGMEzFrCV5GAfJ2ovzBIAEFKYPvAHRmRYjZIQmesdK5DgCwjka_qt59oOuDE3KvFuE32Fs-wq1SF86F4YhJeKeIcuIe63EXOkIlWTbWc_jhfNvYzAIc2EoU35j8BpR7f4Rd_kCf-WLMF9Nu8_Y0Y" />
        <div className="flex flex-col">
          <span className="text-xs font-bold truncate">James Miller</span>
          <span className="text-[10px] text-on-surface-variant">Spencers</span>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant ml-auto text-sm">account_circle</span>
      </div>
    </aside>
  );
}
