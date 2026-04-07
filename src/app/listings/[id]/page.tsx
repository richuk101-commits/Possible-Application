import Link from 'next/link';
import AppSidebar from '@/components/AppSidebar';

export default function ListingDetail({ params }: { params: { id: string } }) {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <AppSidebar />

      {/* Header (TopNavBar) */}
      <header className="fixed top-0 left-60 right-0 h-16 z-40 flex justify-between items-center px-8 bg-white/70 backdrop-blur-xl border-b border-slate-200/20">
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-1.5 text-on-surface-variant text-xs font-medium hover:text-on-surface transition-colors" href="/">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Feed
          </Link>
          <div className="h-4 w-[1px] bg-outline-variant/30"></div>
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold tracking-tight text-on-surface">14 Church Lane, Bristol</h2>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[11px] font-bold uppercase tracking-wider">Awaiting Review</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/reports/${params?.id || 'demo'}/review`} className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-container text-white rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm">
            View Report
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
          <button className="p-2 text-on-surface-variant hover:bg-slate-100 rounded-full transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="ml-60 pt-16 min-h-screen bg-[#FAF8FF]">
        <div className="max-w-[1280px] mx-auto px-12 py-10 grid grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Activity Timeline */}
          <div className="col-span-8 relative">
            {/* Custom line for timeline */}
            <div className="absolute left-[104px] top-6 bottom-0 w-[1px] bg-slate-200" />
            
            <div className="mb-10">
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-8">Activity Timeline</h3>
              
              {/* 1. Listing Published */}
              <div className="flex gap-10 mb-12 relative group z-10">
                <div className="w-20 pt-1 text-right bg-surface">
                  <span className="text-[10px] font-medium text-on-surface-variant/60">3 days ago</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute -left-[10.5px] top-1.5 w-5 h-5 rounded-full bg-surface-container flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface leading-tight font-medium">Listing published by <span className="font-bold">James Miller · Spencers</span></p>
                  </div>
                </div>
              </div>

              {/* 2. AI Research Started */}
              <div className="flex gap-10 mb-12 relative group z-10">
                <div className="w-20 pt-1 text-right bg-surface">
                  <span className="text-[10px] font-medium text-on-surface-variant/60">3 days ago</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute -left-[10.5px] top-1.5 w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface leading-tight font-medium">AI research started automatically</p>
                  </div>
                </div>
              </div>

              {/* 3. AI Research Complete */}
              <div className="flex gap-10 mb-12 relative group z-10">
                <div className="w-20 pt-1 text-right bg-surface">
                  <span className="text-[10px] font-medium text-on-surface-variant/60">2 days ago</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute -left-[10.5px] top-1.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-on-surface leading-tight font-medium">AI research complete — 2 green flags, 1 amber flag</p>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-tertiary/10 text-tertiary rounded text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>flag</span>
                        BUILDING REGS
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-tertiary/10 text-tertiary rounded text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>flag</span>
                        SITE ACCESS
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-600 rounded text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>flag</span>
                        DRAINAGE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Architects Interested */}
              <div className="flex gap-10 mb-12 relative group z-10">
                <div className="w-20 pt-1 text-right bg-surface">
                  <span className="text-[10px] font-medium text-on-surface-variant/60">2 days ago</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute -left-[10.5px] top-1.5 w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-on-surface leading-tight font-medium">4 architects expressed interest</p>
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center text-[10px] font-bold text-on-surface-variant">SC</div>
                      <div className="w-7 h-7 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface-variant">RM</div>
                      <div className="w-7 h-7 rounded-full border-2 border-surface bg-slate-200 flex items-center justify-center text-[10px] font-bold text-on-surface-variant">PD</div>
                      <div className="w-7 h-7 rounded-full border-2 border-surface bg-slate-100 flex items-center justify-center text-[10px] font-bold text-on-surface-variant">AK</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Architect Selected */}
              <div className="flex gap-10 mb-12 relative group z-10">
                <div className="w-20 pt-1 text-right bg-surface">
                  <span className="text-[10px] font-medium text-on-surface-variant/60">1 day ago</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute -left-[10.5px] top-1.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface leading-tight font-medium"><span className="font-bold">Spacecraft Architecture</span> selected by James Miller</p>
                  </div>
                </div>
              </div>

              {/* 6. Architect Notified */}
              <div className="flex gap-10 mb-12 relative group z-10">
                <div className="w-20 pt-1 text-right bg-surface">
                  <span className="text-[10px] font-medium text-on-surface-variant/60">1 day ago</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute -left-[10.5px] top-1.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="text-sm text-on-surface leading-tight font-medium">Spacecraft Architecture notified — deadline set: <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">09 Apr 2026, 14:00</span></p>
                  </div>
                </div>
              </div>

              {/* 7. Design Submitted */}
              <div className="flex gap-10 mb-12 relative group z-10">
                <div className="w-20 pt-1 text-right bg-surface">
                  <span className="text-[10px] font-medium text-on-surface-variant/60">2 hours ago</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute -left-[10.5px] top-1.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-on-surface leading-tight font-medium">Design submitted by Spacecraft Architecture</p>
                    <div className="w-32 aspect-video rounded-lg overflow-hidden border border-outline-variant/30">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcD-oNBPhAhI6TDCV3RDi6_CzjZulPwcY7IQasu2TT0dzivcYkGOFzQprlEvBAatpjSQQrZgqM5giRylxGF5tR81P5yv-8zgpaQei5v3F8-g-VoP6vGh5VV4KWXaj7PJOy5oRaLvjxe4ht87czrVNK8KRxlvKWky2QR7SDHsQO149XoxkcCWZUPaRaWF8TaNpLUjHSfU2DKjY4HryjHQF3tzGoW942py8z1CJHUcE-Szx6oA_ewXYh-rmVZplibyYoMkoWRq9uvHE" alt="Architectural render" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. TO-DO CARD */}
              <div className="flex gap-10 relative z-10">
                <div className="w-20 pt-5 text-right bg-surface">
                  <span className="text-[10px] font-extrabold text-primary">NOW</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute -left-[10.5px] top-6 w-5 h-5 rounded-full bg-primary flex items-center justify-center z-10 shadow-[0_0_10px_rgba(0,104,95,0.4)]">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-surface-container-lowest rounded-xl border-l-[3px] border-primary p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Your turn</span>
                    </div>
                    <h4 className="text-[20px] font-bold text-on-surface mb-3 tracking-tight">Review and approve the report</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-6 max-w-lg">
                      Spacecraft have submitted their design. Review the full report, add your uplift figures, then approve to share with your client.
                    </p>
                    <a href={`/reports/${params?.id || 'demo'}/review`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-container transition-all shadow-lg shadow-primary/10">
                      Review Report
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Property Summary */}
          <div className="col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6 shadow-sm">
                
                {/* Property Image */}
                <div className="w-full h-[200px] rounded-lg overflow-hidden mb-6">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmJv4LInHk8t06kvW11rVwJuy2a5VDiNiG2xgKileeCJ76ZLbKXlkOEG9yYq9Mk6cXsr8JIRxYZ6NCTP7l5mndDOolKJj_LP5twWgyEFNP_wL3gSbtxnkioCjQ0fzEU5eURQi-LQA5_fkxiWCnxt9L55dNWTkfSX9Yi0iRNi16WvgT0Q_mccVQStPp-yS1sFwhEMDcXjNgHtJtaPgCSKhq7IK84CXDJAH9OvQcGsqjxlLnjmDr_g95etDST_NmSJuK0EFp8bkJ_FU" alt="Property Profile" />
                </div>
                
                {/* Header */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-on-surface mb-1">14 Church Lane</h4>
                  <p className="text-sm text-on-surface-variant">Terraced House · Bristol, BS1 4QR</p>
                </div>
                
                <hr className="border-outline-variant/15 mb-6" />
                
                {/* Details Grid */}
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2 block">Architect Assigned</label>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[11px] font-bold text-on-surface-variant">SC</div>
                      <span className="text-sm font-semibold text-on-surface">Spacecraft Architecture</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2 block">Submission Deadline</label>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-on-surface">09 Apr 2026, 14:00</p>
                      <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
                        <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                        Submitted on time
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2 block">AI Research</label>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold">Complete</span>
                      <span className="text-xs text-on-surface-variant font-medium">1 Apr 2026</span>
                    </div>
                  </div>
                </div>

                <hr className="border-outline-variant/15 my-6" />
                
                {/* Valuation */}
                <div>
                  <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1 block">Current Valuation</label>
                  <p className="text-2xl font-black text-on-surface tracking-tighter">£485,000</p>
                </div>

                <hr className="border-outline-variant/15 my-6" />
                
                {/* Quick Links */}
                <div className="space-y-3">
                  <a className="group flex items-center justify-between text-xs font-bold text-primary hover:text-primary-container transition-colors" href="#">
                    <span className="border-b border-primary/30 group-hover:border-primary transition-colors">View AI Research</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </a>
                  <a className="group flex items-center justify-between text-xs font-bold text-primary hover:text-primary-container transition-colors" href="#">
                    <span className="border-b border-primary/30 group-hover:border-primary transition-colors">View Design Submission</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </a>
                  <a className="group flex items-center justify-between text-xs font-bold text-primary hover:text-primary-container transition-colors" href={`/reports/${params?.id || 'demo'}/review`}>
                    <span className="border-b border-primary/30 group-hover:border-primary transition-colors">View Report Draft</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </a>
                </div>
              </div>

              {/* Floating Helper or Notification */}
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>info</span>
                <div>
                  <p className="text-xs font-bold text-primary mb-1">Expert Review Needed</p>
                  <p className="text-[11px] text-on-primary-fixed-variant leading-relaxed">Ensure you check the `Uplift Figures` section in the report before final approval.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
