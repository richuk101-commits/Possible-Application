import Link from 'next/link';
import AppSidebar from '@/components/AppSidebar';

export default function ReviewApproveReport({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <AppSidebar />
      {/* Main Workspace */}
      <main className="flex-1 ml-60 flex flex-col bg-surface overflow-y-auto min-h-screen">
        {/* TopAppBar Component */}
        <header className="flex justify-between items-center px-8 h-16 w-full bg-surface z-40 sticky top-0 border-b-0 shadow-none">
          <div className="flex items-center gap-4">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href={`/listings/${params?.id || 'demo'}`}>
              <span className="material-symbols-outlined">arrow_back</span>
            </a>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-bold">14 Church Lane</span>
              <h2 className="text-xl font-bold tracking-tighter text-on-surface leading-none">Review Report: 14 Church Lane, Bristol</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-full transition-all active:scale-95">Preview Report</button>
            <button className="px-6 py-2 bg-gradient-to-br from-primary to-primary-container text-white text-sm font-bold rounded-full shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-95">Approve & Publish</button>
          </div>
        </header>

        {/* Intro Banner */}
        <div className="w-full bg-surface-container px-8 py-4 border-y-0">
          <div className="flex items-center gap-3 text-primary-container">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            <p className="text-sm font-medium">Your report is ready for review. Spacecraft Architecture have submitted their design. Review all sections below, enter your valuation figures, then approve to share with your client.</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-1 p-8 gap-12 max-w-[1440px] mx-auto w-full">
          {/* Main Content (65%) */}
          <div className="w-[65%] flex flex-col gap-12">
            
            {/* Section: Design Review */}
            <section className="flex flex-col gap-6">
              <div className="flex justify-between items-end border-b border-outline-variant/10 pb-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-on-surface-variant">Architect's Submission</label>
                <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full">
                  <div className="w-4 h-4 bg-tertiary rounded-sm"></div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">Spacecraft Architecture • <span className="font-normal opacity-70">submitted 2h ago</span></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-container-high">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB6jRKwtu74gup2k9UmR7GjF4vCdgP5hUFk9BT_SKff1cd3E8V7Lr-U2oaRJXy2TdPbk9YpBqoarBRxrLt5MeNu1_xQa37MhU81U7xkusW8YrnK5QCP66Zjc0SI4eN2CnjrgHNKZLbHQ6d4mJh06QLKMK7uFhQhQo44Mm6O6vXS3XgoGuIb0jG2SV4u6cGYXE6Y6aSpkb2IgCFyJUTCvw-TQ3k78Rqrl5OtCsqpnohpRA-1H2hvcgD9XFemsiZeZC8IIqr0JzjxsY" alt="Before" />
                  <div className="absolute top-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] text-white font-bold uppercase tracking-widest">Before</div>
                </div>
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-container-high">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDePO_l1JW1l4A_5l7-YhVEmQ9ZK1behoj11AJsZUUn3zekxf9ACxORB8z1trweSRg6Jfyi3uOxQU06szIeqMC5egajvsKGfRJ0inSUmQimYWszHuW6PCxynDsCXhLdd6eBxL6fVDp1zItS_SWaJYBbMQqmPapPXHjbYnqSVDBIhlU4ltsK8tAr0WX4sIKQHzCauDWjs_iep_11S3UidixAPfsIb_K9lcV6JeoiY14dKpy-m2aEd7VEum0u7MThO189lbDrWSFLypw" alt="After" />
                  <div className="absolute top-4 left-4 px-2 py-1 bg-primary/80 backdrop-blur-md rounded text-[10px] text-white font-bold uppercase tracking-widest">After (Proposed)</div>
                </div>
              </div>

              <div className="p-6 bg-surface-container-lowest rounded-xl border-l-4 border-primary">
                <p className="text-sm leading-relaxed text-on-surface-variant italic mb-4">"The proposed design introduces a double-height rear extension maximizing natural light and creating an open-plan kitchen/living area, while maintaining the heritage character of the street-facing facade."</p>
                <p className="text-lg font-bold text-primary">Development cost estimate: £300,000 – £450,000</p>
              </div>
            </section>

            {/* Section: Planning Summary */}
            <section className="flex flex-col gap-6">
              <div className="flex justify-between items-end border-b border-outline-variant/10 pb-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-on-surface-variant">AI Planning Research</label>
                <span className="text-[11px] font-semibold text-tertiary">✅ Complete · 3 Apr 2026</span>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-on-surface uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span> Opportunities
                  </h4>
                  <ul className="text-sm text-on-surface-variant flex flex-col gap-2">
                    <li className="flex gap-2"><span>✅</span> Permitted development rights intact for rear extension.</li>
                    <li className="flex gap-2"><span>✅</span> Neighboring precedent (No. 18) for loft conversion.</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-on-surface uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> To Investigate
                  </h4>
                  <ul className="text-sm text-on-surface-variant flex flex-col gap-2">
                    <li className="flex gap-2"><span>⚠️</span> TPO (Tree Preservation Order) on front garden oak.</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-on-surface uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error"></span> Constraints
                  </h4>
                  <ul className="text-sm text-on-surface-variant flex flex-col gap-2">
                    <li className="flex gap-2"><span>🔴</span> Conservation Area: Strict window frame material limits.</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end">
                <a className="text-xs font-semibold text-primary hover:underline" href="#">Refresh AI Research ↻</a>
              </div>
            </section>

            {/* Section: Your Valuation */}
            <section className="flex flex-col gap-6 p-8 bg-surface-container-lowest rounded-2xl shadow-xl shadow-surface-container-high/40">
              <div className="flex justify-between items-end border-b border-primary/20 pb-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-primary">Your Valuation & Uplift</label>
              </div>
              <p className="text-sm text-on-surface-variant">This is your professional assessment — it appears in the final report under your firm's name.</p>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Current Value (£)</label>
                  <div className="relative">
                    <span className="absolute left-0 bottom-3 text-2xl font-light text-on-surface-variant">£</span>
                    <input className="w-full border-0 outline-none border-b-2 border-outline-variant focus:border-primary bg-transparent pt-0 pb-3 pl-6 text-3xl font-bold tracking-tight text-on-surface transition-colors" type="text" defaultValue="485,000" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider">Projected Value After Development (£)</label>
                  <div className="relative">
                    <span className="absolute left-0 bottom-3 text-2xl font-light text-primary">£</span>
                    <input className="w-full border-0 outline-none border-b-2 border-primary focus:border-primary-container bg-transparent pt-0 pb-3 pl-6 text-3xl font-bold tracking-tight text-on-surface transition-colors placeholder:text-outline-variant" placeholder="680,000" type="text" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-on-surface-variant">Value Increase:</span>
                  <span className="text-lg font-bold text-tertiary">£195,000 (+40.2%)</span>
                </div>
                <div className="flex justify-between items-center text-sm text-on-surface-variant">
                  <span>Estimated Development Cost:</span>
                  <span>£300,000 – £450,000</span>
                </div>
                <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                  <span className="text-sm font-bold text-on-surface">Estimated Net Uplift:</span>
                  <span className="text-lg font-black text-error">-£255k to -£105k</span>
                </div>
                <div className="bg-error/5 border border-error/10 p-3 rounded-lg flex items-start gap-2">
                  <span className="material-symbols-outlined text-error text-[18px]">warning</span>
                  <p className="text-[12px] text-error font-medium">Net uplift appears negative — your client may want to revisit the scope of works with the architect.</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Your Commentary</label>
                <textarea 
                  className="w-full outline-none border border-outline-variant/30 rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-outline-variant/50" 
                  placeholder="Share your professional view on the local market and the viability of this specific development strategy..." 
                  rows={6}
                />
              </div>
            </section>

            {/* Spacer for footer */}
            <div className="h-24"></div>
          </div>

          {/* Side Panel (35%) */}
          <aside className="w-[35%]">
            <div className="sticky top-24 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant">Report Preview</h3>
                <a href={`/reports/${params?.id || 'demo'}`} className="relative group cursor-zoom-in rounded-2xl overflow-hidden shadow-2xl shadow-on-surface/10 border border-outline-variant/20 bg-white block">
                  <img className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsceGPCDDhWoSMTJ-NjVGHx-59h9igugx5W7HRSbM2Y-av_3gFJQypy0uqS3HiJny-jo71bo2vHsmhazlnFrka96AANHE5fivVI6gZedm99Duu-OXJlcJsW0lrj6b4Y1MgvzPIfCTZJkalHeKcHQxWCaVzmFg_vGALN6bHXMxtQAapkD3nwBEClSb2pkznqsxXFwHJLS-XB5mvWHuG-cKdt3tUF2deTq9A5QYYqUrdD-uGwiVr0rgJMqgrKFplbQWVzIeCsz7LafQ" alt="Preview" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                    <div className="flex items-center gap-2 text-white text-xs font-bold">
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      Click to view report
                    </div>
                  </div>
                </a>
              </div>

              <div className="bg-surface-container-high/30 rounded-2xl p-6 flex flex-col gap-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Report Status</h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    <span className="text-sm font-semibold text-on-surface">Property overview</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    <span className="text-sm font-semibold text-on-surface">Architect's design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    <span className="text-sm font-semibold text-on-surface">Planning research</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-40">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">radio_button_unchecked</span>
                    <span className="text-sm font-medium text-on-surface">Your valuation</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-40">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">radio_button_unchecked</span>
                    <span className="text-sm font-medium text-on-surface">Your commentary</span>
                  </div>
                </div>

                <div className="mt-4 pt-6 border-t border-outline-variant/20 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-on-surface-variant uppercase tracking-widest">Progress</span>
                    <span className="text-primary">3 of 5 complete</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Sticky Footer Bar */}
        <footer className="sticky bottom-0 w-full bg-surface/80 backdrop-blur-md border-t border-outline-variant/10 z-50">
          <div className="max-w-[1440px] mx-auto px-8 h-20 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <a href={`/reports/${params?.id || 'demo'}`} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
                Preview Report
              </a>
              <div className="h-4 w-px bg-outline-variant/30"></div>
              <p className="text-[12px] text-on-surface-variant font-medium">Once approved, a shareable link will be generated for your client.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">Save Draft</button>
              <button className="px-10 py-3 bg-primary text-white text-sm font-black rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest">Approve & Publish</button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
