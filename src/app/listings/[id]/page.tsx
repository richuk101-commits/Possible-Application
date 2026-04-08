import Link from 'next/link';
import AppSidebar from '@/components/AppSidebar';

// Listing data by ID
const listings: Record<string, {
  address: string;
  shortAddress: string;
  type: string;
  valuation: string;
  status: string;
  statusLabel: string;
  architect: string | null;
  deadline: string | null;
  img: string;
}> = {
  '1': {
    address: '14 Church Lane, Bristol, BS1 4QR',
    shortAddress: '14 Church Lane',
    type: 'Terraced House',
    valuation: '£485,000',
    status: 'awaiting-review',
    statusLabel: 'Awaiting Review',
    architect: 'Spacecraft Architecture',
    deadline: '09 Apr 2026, 14:00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmJv4LInHk8t06kvW11rVwJuy2a5VDiNiG2xgKileeCJ76ZLbKXlkOEG9yYq9Mk6cXsr8JIRxYZ6NCTP7l5mndDOolKJj_LP5twWgyEFNP_wL3gSbtxnkioCjQ0fzEU5eURQi-LQA5_fkxiWCnxt9L55dNWTkfSX9Yi0iRNi16WvgT0Q_mccVQStPp-yS1sFwhEMDcXjNgHtJtaPgCSKhq7IK84CXDJAH9OvQcGsqjxlLnjmDr_g95etDST_NmSJuK0EFp8bkJ_FU',
  },
  '2': {
    address: '72 Bath Road, Bath, BA1 3DW',
    shortAddress: '72 Bath Road',
    type: 'Flat',
    valuation: '£310,000',
    status: 'select-architect',
    statusLabel: 'Select Architect',
    architect: null,
    deadline: '12 Apr 2026, 12:00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_gb6fX5LMwaskAgIjhsmKDbLAESroPOAq2AkM-HNtJxOJ4WUegU17pq2L-ErWqkdEPAqM-_fyXfC1xz75wkUQ3WP4zDYxAR6An45mF0kq9uruoJ8V7BUCqzCybd58GmTkKgsRhS_4zUbYZnXmbiBrCcE-O_gZjD-Qw4EMq6pBFy9cDnu0oIqjOMjP2nsyByZF3B-9HHzqSKOXYUemRbTNRSQ8Kbw8_pKxqrmxDpxetoj-eiL6JLPJzXuBq5aSKCTUSIgrowR1Bo0',
  },
  '3': {
    address: 'Flat 4, Mill Street, Bristol, BS1 2BB',
    shortAddress: 'Flat 4, Mill Street',
    type: 'Flat',
    valuation: '£275,000',
    status: 'awaiting-review',
    statusLabel: 'Awaiting Review',
    architect: 'Spacecraft Architecture',
    deadline: '08 Apr 2026, 14:00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiy03xOhe3jNMbF77LnSCbczgbx6oVXwXmzddcSLyDOU2y04Iw84_w3KONQO6dpwD3V7bgNZOPUpJ0Us-_hRz4q82MP15XiCnbTycSdXLIpeD-sR9X90GymerFhBWmpW69ZzbxqKlRpQStfLD9ryZqClfwUP0mFlbR54aggIWjzLsMbnvT7nLu8Sw_k7LBO5rIx2Lc6bQe0v2cKO2qyPMAUqUaDApr6gsi5d5w6e_eKHccqNh7VUiC-Xriignl5h0S9Q4ggRDjjKk',
  },
};

const architects = [
  {
    initials: 'SC',
    name: 'Spacecraft Architecture',
    location: 'Bristol',
    projects: 14,
    rating: 4.9,
    specialty: 'Residential extensions, loft conversions',
    note: 'Worked with you on Church Lane · Excellent track record',
    recommended: true,
    color: 'bg-primary/10 text-primary',
  },
  {
    initials: 'RM',
    name: 'Rundell Mitchell',
    location: 'Bath',
    projects: 8,
    rating: 4.7,
    specialty: 'Period properties, conservation work',
    note: 'Specialises in Bath stone & Georgian-era properties',
    recommended: false,
    color: 'bg-secondary/10 text-secondary',
  },
  {
    initials: 'PD',
    name: 'PD Architects',
    location: 'Bristol',
    projects: 22,
    rating: 4.8,
    specialty: 'Apartments, mixed-use developments',
    note: 'Strong portfolio for flat conversions specifically',
    recommended: false,
    color: 'bg-tertiary/10 text-tertiary',
  },
];

export default function ListingDetail({ params }: { params: { id: string } }) {
  const listing = listings[params?.id] ?? listings['1'];
  const isSelectArchitect = listing.status === 'select-architect';

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
            <h2 className="text-lg font-semibold tracking-tight text-on-surface">{listing.address}</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${isSelectArchitect ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
              {listing.statusLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!isSelectArchitect && (
            <Link href={`/reports/${params?.id || 'demo'}/review`} className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-container text-white rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm">
              View Report
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          )}
          <button className="p-2 text-on-surface-variant hover:bg-slate-100 rounded-full transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="ml-60 pt-16 min-h-screen bg-[#FAF8FF]">
        <div className="max-w-[1280px] mx-auto px-12 py-10 grid grid-cols-12 gap-10">

          {/* LEFT COLUMN: Activity Timeline OR Architect Selection */}
          <div className="col-span-8 relative">

            {/* ── SELECT ARCHITECT VIEW (listing 2) ── */}
            {isSelectArchitect && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-[0.1em] mb-1">Select an Architect</h3>
                  <p className="text-xs text-on-surface-variant">3 architects have expressed interest. Review their profiles and select one to proceed.</p>
                </div>

                {/* AI Recommendation Banner */}
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary mb-1">AI Recommendation</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Based on the property type (flat) and location in Bath, <span className="font-bold text-on-surface">Spacecraft Architecture</span> is recommended — they have strong comparable experience and have worked with your firm before.
                    </p>
                  </div>
                </div>

                {/* Architect Cards */}
                <div className="space-y-3">
                  {architects.map((arch) => (
                    <div
                      key={arch.name}
                      className={`relative bg-white rounded-xl border ${arch.recommended ? 'border-primary/30 shadow-md shadow-primary/5' : 'border-slate-100'} p-6 flex items-start gap-5 hover:border-primary/40 hover:shadow-md transition-all group`}
                    >
                      {arch.recommended && (
                        <div className="absolute top-4 right-4 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase tracking-widest">
                          Recommended
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 ${arch.color}`}>
                        {arch.initials}
                      </div>
                      <div className="flex-1 min-w-0 pr-32">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-bold text-on-surface">{arch.name}</p>
                          <span className="text-[10px] text-on-surface-variant">· {arch.location}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mb-2">{arch.specialty}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            {arch.rating}
                          </span>
                          <span className="text-[10px] text-on-surface-variant">{arch.projects} completed projects</span>
                        </div>
                        <p className="text-[10px] text-primary/70 italic mt-2">{arch.note}</p>
                      </div>
                      <button className="absolute bottom-5 right-5 px-5 py-2 bg-primary text-white text-xs font-bold rounded-full hover:brightness-110 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ACTIVITY TIMELINE VIEW (all other listings) ── */}
            {!isSelectArchitect && (
            <div className="mb-10 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[104px] top-6 bottom-0 w-[1px] bg-slate-200" />
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
            )} {/* end timeline conditional */}
          </div>

          {/* RIGHT COLUMN: Property Summary */}
          <div className="col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6 shadow-sm">

                {/* Property Image */}
                <div className="w-full h-[200px] rounded-lg overflow-hidden mb-6">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src={listing.img} alt="Property" />
                </div>

                {/* Header */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-on-surface mb-1">{listing.shortAddress}</h4>
                  <p className="text-sm text-on-surface-variant">{listing.type} · {listing.address.split(', ').slice(1).join(', ')}</p>
                </div>

                <hr className="border-outline-variant/15 mb-6" />

                {/* Details Grid */}
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2 block">Architect</label>
                    {listing.architect ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[11px] font-bold text-on-surface-variant">
                          {listing.architect.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-sm font-semibold text-on-surface">{listing.architect}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-on-surface-variant italic">Not yet selected</span>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2 block">
                      {isSelectArchitect ? 'Interest Deadline' : 'Submission Deadline'}
                    </label>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-on-surface">{listing.deadline ?? '—'}</p>
                      {!isSelectArchitect && (
                        <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
                          <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                          Submitted on time
                        </div>
                      )}
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
                  <p className="text-2xl font-black text-on-surface tracking-tighter">{listing.valuation}</p>
                </div>

                {!isSelectArchitect && (
                  <>
                    <hr className="border-outline-variant/15 my-6" />
                    <div className="space-y-3">
                      <a className="group flex items-center justify-between text-xs font-bold text-primary hover:text-primary-container transition-colors" href="#">
                        <span className="border-b border-primary/30 group-hover:border-primary transition-colors">View AI Research</span>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </a>
                      <a className="group flex items-center justify-between text-xs font-bold text-primary hover:text-primary-container transition-colors" href="#">
                        <span className="border-b border-primary/30 group-hover:border-primary transition-colors">View Design Submission</span>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </a>
                      <Link className="group flex items-center justify-between text-xs font-bold text-primary hover:text-primary-container transition-colors" href={`/reports/${params?.id || 'demo'}/review`}>
                        <span className="border-b border-primary/30 group-hover:border-primary transition-colors">View Report Draft</span>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Info Banner */}
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>info</span>
                <div>
                  {isSelectArchitect ? (
                    <>
                      <p className="text-xs font-bold text-primary mb-1">3 Architects Interested</p>
                      <p className="text-[11px] text-on-primary-fixed-variant leading-relaxed">Select an architect to begin the design process. They will receive a deadline of 4 days from selection.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-bold text-primary mb-1">Expert Review Needed</p>
                      <p className="text-[11px] text-on-primary-fixed-variant leading-relaxed">Ensure you check the Uplift Figures section in the report before final approval.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
