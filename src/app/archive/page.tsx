import Link from 'next/link';
import AppSidebar from '@/components/AppSidebar';
import AppHeader from '@/components/AppHeader';

const archived = [
  {
    id: '6',
    address: 'Old Rectory, Chew Magna',
    type: 'Detached',
    closedReason: 'Not progressing',
    closedDate: '5 Apr 2026',
    outcome: null,
    currentVal: '£1,200,000',
    architect: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6lEBEvs7VSA5SA1pAeSlEZkD7mKxwsNYDx6IeF0Kr945lnlQ3H8swDszb2avAbtpq5OuxZncdmWPwEUvkBnNbJYok440jjCyhn4RwkN2Hi7jV6zWjYUn8BCXEykQCAP372NdmqollrSCCvv3jLMF1ewbDPhmQvx19FaFKvF_Q5k_YkzdXcrWQ--aMz2xEX9uPvTuhb-kjfouwcBVABUxbQ8oLY0_Gd-XrJhFj9IiHdGydBQhgrEepgVt7gBL1kWtEIgAgGteiEPE',
  },
  {
    id: '7',
    address: '3 Clifton Vale, Bristol',
    type: 'Semi-Detached',
    closedReason: 'Report sent to client',
    closedDate: '28 Mar 2026',
    outcome: '+£85k uplift projected',
    currentVal: '£620,000',
    architect: 'Rundell Mitchell',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaVK7o2284HU8EFOxfm3s3gLjaHtauLdqD81Urjk_tvgMiy4gYVykRZncm2FyMxa2o_yIk0tMtfqEmHCffxnDhAPnkDcQ4qBKSyDWCSOlzbwMPXlh5--sY3XTN_7Fzc60RPJrI75_f9u_deALTc4h2qCm-WwrxXQ8Rsjp2t0SFD_YhRuQ4lEE2-BmlTZuogthzp4_rdXGfb3YY7LT1d0tBNj96LMO43ch3KmAuH97BY8BAgWG4jcnFKr7THGBmTRh0xJ2Fgrp9_00',
  },
  {
    id: '8',
    address: '12 Whiteladies Road, Bristol',
    type: 'Terraced',
    closedReason: 'Report sent to client',
    closedDate: '14 Mar 2026',
    outcome: '+£120k uplift projected',
    currentVal: '£540,000',
    architect: 'Spacecraft Architecture',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcy2Fe04d4BT9rtmo28iy1lA_iog_jdfP6P4FAnVdj2ymBrHUzI3RpUJZY1vywvxFi81IGGv8Li5IV_Jbi-H2GbsIXIyaxGqtoCTxiInUJvTRRTRVPs1qVJTyHpGExpC2vzPy4q5KNLApmIgJAckMvfUfOBPnukwLh2Aw16P_OvEdq_CjVoho6BFN3w2yZ4b1O_mmPT2FLop7ZUEKAeyJLHZ_iDqm30JuwTCdRucJbx5lg4E9Ix_E54QmL5uaTGrRih4Q0rFKk67U',
  },
  {
    id: '9',
    address: '45 Redland Road, Bristol',
    type: 'Semi-Detached',
    closedReason: 'Client declined development',
    closedDate: '2 Mar 2026',
    outcome: null,
    currentVal: '£495,000',
    architect: 'PD Architects',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbXbzd8Cj_5fyNcxsiLxSADGi6yZO_V7xQLUqRbZTXtweL-FK1qaqb2KN_NxL_HnypMQrLeqcovDUFOsn7HxRA285-cBFD6LLUxm_uSVhVs8uhHkSZ38h3LPXLi7aU0LbGCfjT0B1h9WWe4aOljCVP67n65h1OmPbAlb9fWgTN8GdqD8k3NzJYCLZCqZTCNhx52i9aMVYsmMD0CZmvYtg2Z8j990uobLprK_GHg8_3YIPB-qcRStb8BMrYLyLYHFQ9wvshCd71Zs8',
  },
  {
    id: '10',
    address: '88 Cotham Hill, Bristol',
    type: 'Apartment',
    closedReason: 'Report sent to client',
    closedDate: '18 Feb 2026',
    outcome: '+£55k uplift projected',
    currentVal: '£310,000',
    architect: 'AK Studio',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiy03xOhe3jNMbF77LnSCbczgbx6oVXwXmzddcSLyDOU2y04Iw84_w3KONQO6dpwD3V7bgNZOPUpJ0Us-_hRz4q82MP15XiCnbTycSdXLIpeD-sR9X90GymerFhBWmpW69ZzbxqKlRpQStfLD9ryZqClfwUP0mFlbR54aggIWjzLsMbnvT7nLu8Sw_k7LBO5rIx2Lc6bQe0v2cKO2qyPMAUqUaDApr6gsi5d5w6e_eKHccqNh7VUiC-Xriignl5h0S9Q4ggRDjjKk',
  },
];

const stats = [
  { label: 'Total Archived', value: '24', sub: 'all time' },
  { label: 'Reports Delivered', value: '19', sub: 'this year' },
  { label: 'Avg Uplift Projected', value: '+£92k', sub: 'per completed report' },
  { label: 'Client Conversion', value: '74%', sub: 'of delivered reports' },
];

export default function Archive() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <AppSidebar />
      <main className="flex-1 ml-60 flex flex-col min-h-screen bg-[#FAF8FF] overflow-y-auto">
        <AppHeader />

        <section className="max-w-5xl mx-auto w-full px-10 pt-6 pb-28 space-y-8">

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Archive</h1>
            <p className="text-xs text-on-surface-variant mt-1">Closed listings and completed reports across your portfolio</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{s.label}</p>
                <p className="text-2xl font-black text-on-surface tracking-tighter">{s.value}</p>
                <p className="text-[10px] text-on-surface-variant/60">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-white rounded-full border border-slate-100 p-1 w-fit shadow-sm">
            {['All', 'Report Delivered', 'Not Progressing', 'Client Declined'].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                  i === 0
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Archived Listings */}
          <div className="space-y-2.5">
            {archived.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 h-20 px-5 rounded-xl bg-white border border-slate-100 hover:border-outline-variant/20 hover:shadow-sm transition-all duration-150 group opacity-75 hover:opacity-100"
              >
                <img
                  alt={item.address}
                  className="w-20 h-14 rounded-lg object-cover flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300"
                  src={item.img}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm truncate text-on-surface">{item.address}</span>
                    <span className="px-2 py-0.5 bg-on-surface/5 text-[9px] font-bold text-on-surface-variant rounded uppercase tracking-wider flex-shrink-0">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {item.architect ? `${item.architect} · ` : ''}{item.closedReason} · {item.closedDate}
                  </p>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant/60 font-medium uppercase tracking-wide">Value</p>
                    <p className="text-sm font-bold text-on-surface">{item.currentVal}</p>
                  </div>
                  {item.outcome ? (
                    <span className="px-3 py-1 bg-primary/8 text-primary text-[10px] font-bold rounded-full border border-primary/10">
                      {item.outcome}
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-slate-100 text-on-surface-variant text-[10px] font-bold rounded-full">
                      No report
                    </span>
                  )}
                  <Link
                    href={`/listings/${item.id}`}
                    className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Stats footer bar */}
        <footer className="fixed bottom-0 right-0 left-60 flex justify-between items-center px-8 h-10 bg-[#FAF8FF]/90 backdrop-blur-md border-t border-slate-200/30 font-mono text-[10px] uppercase tracking-widest z-40">
          <div className="flex gap-8 items-center text-on-surface-variant">
            <span className="flex items-center gap-2">
              <span className="text-primary font-bold">Archived:</span>
              <span className="text-on-surface">24 listings</span>
            </span>
            <div className="w-px h-3 bg-outline-variant/30" />
            <span>Showing 5 most recent</span>
          </div>
          <div className="flex gap-8 items-center text-on-surface-variant">
            <span className="text-outline font-sans lowercase opacity-40">Possible v1.0.4</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
