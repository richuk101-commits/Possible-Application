import Link from 'next/link';
import AppSidebar from '@/components/AppSidebar';
import AppHeader from '@/components/AppHeader';
import StatusBadge from '@/components/StatusBadge';

const feed = [
  {
    id: '1',
    address: '14 Church Lane, Bristol',
    type: 'House',
    meta: 'Spacecraft submitted design · 2h ago',
    status: 'active' as const,
    action: { label: 'Review Report', href: '/reports/1/review' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcy2Fe04d4BT9rtmo28iy1lA_iog_jdfP6P4FAnVdj2ymBrHUzI3RpUJZY1vywvxFi81IGGv8Li5IV_Jbi-H2GbsIXIyaxGqtoCTxiInUJvTRRTRVPs1qVJTyHpGExpC2vzPy4q5KNLApmIgJAckMvfUfOBPnukwLh2Aw16P_OvEdq_CjVoho6BFN3w2yZ4b1O_mmPT2FLop7ZUEKAeyJLHZ_iDqm30JuwTCdRucJbx5lg4E9Ix_E54QmL5uaTGrRih4Q0rFKk67U',
  },
  {
    id: '2',
    address: '72 Bath Road, Bath',
    type: 'Flat',
    meta: '3 architects expressed interest · 5h ago',
    status: 'pending' as const,
    action: { label: 'Select Architect', href: '/listings/2' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_gb6fX5LMwaskAgIjhsmKDbLAESroPOAq2AkM-HNtJxOJ4WUegU17pq2L-ErWqkdEPAqM-_fyXfC1xz75wkUQ3WP4zDYxAR6An45mF0kq9uruoJ8V7BUCqzCybd58GmTkKgsRhS_4zUbYZnXmbiBrCcE-O_gZjD-Qw4EMq6pBFy9cDnu0oIqjOMjP2nsyByZF3B-9HHzqSKOXYUemRbTNRSQ8Kbw8_pKxqrmxDpxetoj-eiL6JLPJzXuBq5aSKCTUSIgrowR1Bo0',
  },
  {
    id: '3',
    address: 'Flat 4, Mill Street, Bristol',
    type: 'Flat',
    meta: 'Spacecraft Architecture assigned · deadline in 6h',
    status: 'urgent' as const,
    action: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiy03xOhe3jNMbF77LnSCbczgbx6oVXwXmzddcSLyDOU2y04Iw84_w3KONQO6dpwD3V7bgNZOPUpJ0Us-_hRz4q82MP15XiCnbTycSdXLIpeD-sR9X90GymerFhBWmpW69ZzbxqKlRpQStfLD9ryZqClfwUP0mFlbR54aggIWjzLsMbnvT7nLu8Sw_k7LBO5rIx2Lc6bQe0v2cKO2qyPMAUqUaDApr6gsi5d5w6e_eKHccqNh7VUiC-Xriignl5h0S9Q4ggRDjjKk',
  },
  {
    id: '4',
    address: '8 Victoria Terrace, Clifton',
    type: 'House',
    meta: 'AI research running… · just now',
    status: 'open' as const,
    action: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaVK7o2284HU8EFOxfm3s3gLjaHtauLdqD81Urjk_tvgMiy4gYVykRZncm2FyMxa2o_yIk0tMtfqEmHCffxnDhAPnkDcQ4qBKSyDWCSOlzbwMPXlh5--sY3XTN_7Fzc60RPJrI75_f9u_deALTc4h2qCm-WwrxXQ8Rsjp2t0SFD_YhRuQ4lEE2-BmlTZuogthzp4_rdXGfb3YY7LT1d0tBNj96LMO43ch3KmAuH97BY8BAgWG4jcnFKr7THGBmTRh0xJ2Fgrp9_00',
  },
  {
    id: '5',
    address: '22 Park Avenue, Bath',
    type: 'Terraced',
    meta: 'Report shared with client · 1 day ago',
    status: 'active' as const,
    action: { label: 'View Report', href: '/reports/5' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbXbzd8Cj_5fyNcxsiLxSADGi6yZO_V7xQLUqRbZTXtweL-FK1qaqb2KN_NxL_HnypMQrLeqcovDUFOsn7HxRA285-cBFD6LLUxm_uSVhVs8uhHkSZ38h3LPXLi7aU0LbGCfjT0B1h9WWe4aOljCVP67n65h1OmPbAlb9fWgTN8GdqD8k3NzJYCLZCqZTCNhx52i9aMVYsmMD0CZmvYtg2Z8j990uobLprK_GHg8_3YIPB-qcRStb8BMrYLyLYHFQ9wvshCd71Zs8',
  },
  {
    id: '6',
    address: 'Old Rectory, Chew Magna',
    type: 'Detached',
    meta: 'Marked as not progressing · 3 days ago',
    status: 'closed' as const,
    action: null,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6lEBEvs7VSA5SA1pAeSlEZkD7mKxwsNYDx6IeF0Kr945lnlQ3H8swDszb2avAbtpq5OuxZncdmWPwEUvkBnNbJYok440jjCyhn4RwkN2Hi7jV6zWjYUn8BCXEykQCAP372NdmqollrSCCvv3jLMF1ewbDPhmQvx19FaFKvF_Q5k_YkzdXcrWQ--aMz2xEX9uPvTuhb-kjfouwcBVABUxbQ8oLY0_Gd-XrJhFj9IiHdGydBQhgrEepgVt7gBL1kWtEIgAgGteiEPE',
  },
];

const highlightStatuses = ['active', 'urgent', 'pending'];

export default function IntelligenceFeed() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <AppSidebar />
      <main className="flex-1 ml-60 flex flex-col min-h-screen bg-[#FAF8FF] overflow-y-auto">
        <AppHeader />

        <section className="max-w-5xl mx-auto w-full px-10 pt-6 pb-28 space-y-8">

          {/* AI Briefing Card */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 relative flex items-start gap-4 group">
            <div className="p-2 bg-primary/10 rounded-xl text-primary flex-shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div className="flex-1 space-y-2.5">
              <p className="text-sm font-medium leading-relaxed text-on-surface">
                <span className="text-primary font-bold">Good morning, James.</span>{' '}
                You have 2 reports ready to review and 1 listing awaiting architect selection.
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <Link className="text-xs font-bold text-primary flex items-center gap-1 group/lnk" href="/reports/1/review">
                  Review Church Lane report
                  <span className="material-symbols-outlined text-sm group-hover/lnk:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <Link className="text-xs font-bold text-primary flex items-center gap-1 group/lnk" href="/listings/2">
                  Select architect for Bath Road
                  <span className="material-symbols-outlined text-sm group-hover/lnk:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
            <button className="text-on-surface-variant/30 hover:text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Feed Section */}
          <div className="space-y-5">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-on-surface">Recent Activity</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Updates across your portfolio in the last 72 hours</p>
              </div>
              <Link
                href="/listings/new"
                className="bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-md shadow-primary/10"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                New Listing
              </Link>
            </div>

            <div className="space-y-2.5">
              {feed.map((item) => {
                const isHighlighted = highlightStatuses.includes(item.status);
                return (
                  <Link
                    key={item.id}
                    href={`/listings/${item.id}`}
                    className={`flex items-center gap-5 h-20 px-5 rounded-xl transition-all duration-150 group ${
                      item.status === 'closed'
                        ? 'bg-surface opacity-60 grayscale cursor-default pointer-events-none'
                        : isHighlighted
                        ? 'bg-primary-fixed/30 hover:bg-primary-fixed/50'
                        : 'bg-white hover:bg-surface-container hover:shadow-sm border border-transparent hover:border-outline-variant/10'
                    }`}
                  >
                    <img
                      alt={item.address}
                      className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                      src={item.img}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm truncate">{item.address}</span>
                        <span className="px-2 py-0.5 bg-on-surface/5 text-[9px] font-bold text-on-surface-variant rounded uppercase tracking-wider flex-shrink-0">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5 truncate">{item.meta}</p>
                    </div>
                    <div className="flex items-center gap-5 flex-shrink-0">
                      {item.action && (
                        <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.action.label} →
                        </span>
                      )}
                      <StatusBadge variant={item.status} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats footer bar */}
        <footer className="fixed bottom-0 right-0 left-60 flex justify-between items-center px-8 h-10 bg-[#FAF8FF]/90 backdrop-blur-md border-t border-slate-200/30 font-mono text-[10px] uppercase tracking-widest z-40">
          <div className="flex gap-8 items-center text-on-surface-variant">
            <span className="flex items-center gap-2">
              <span className="text-primary font-bold">Active Listings:</span>
              <span className="text-on-surface">12 <span className="text-primary">+2 this week</span></span>
            </span>
            <div className="w-px h-3 bg-outline-variant/30" />
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              Press ⌘K to search · <span className="text-secondary font-bold">04 due today</span>
            </span>
          </div>
          <div className="flex gap-8 items-center text-on-surface-variant">
            <span>Client Feedback: <span className="text-primary font-bold">98% Satisfied</span></span>
            <span className="text-outline font-sans lowercase opacity-40">Possible v1.0.4</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
