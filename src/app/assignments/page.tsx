import Link from 'next/link';
import ArchitectSidebar from '@/components/ArchitectSidebar';
import StatusBadge from '@/components/StatusBadge';

export default function ArchitectAssignments() {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface antialiased">
      <ArchitectSidebar />

      <main className="ml-60 flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 w-full h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200/30 flex items-center justify-between px-10 shrink-0">
          <div className="flex-1 max-w-xl relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <input
              className="w-full bg-surface-container-highest/40 border-none rounded-full py-2.5 pl-12 pr-16 text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Search listings or ask anything…"
              type="text"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-on-surface-variant/40 border border-outline-variant/30 px-1.5 py-0.5 rounded">⌘K</span>
          </div>
          <div className="flex items-center gap-4 ml-6">
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="pt-8 pb-28 px-10 max-w-5xl mx-auto w-full space-y-8">

          {/* AI Briefing */}
          <section className="bg-primary-container/10 border border-primary/10 rounded-xl p-6 relative overflow-hidden">
            <button className="absolute top-4 right-4 text-on-surface-variant/30 hover:text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="space-y-3">
                <p className="text-on-surface text-base font-medium leading-relaxed">
                  <span className="text-primary font-bold">Good morning, Sarah.</span>{' '}
                  You have 1 design submission due in 6 hours and 3 new listings in your area to review.
                </p>
                <div className="flex gap-6">
                  <Link className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline underline-offset-4 group" href="/designs/submit">
                    Submit Church Lane design
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                  <Link className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline underline-offset-4 group" href="#">
                    Browse new listings
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* My Assignments */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0D9488]">MY ASSIGNMENTS</h2>
            <div className="bg-primary/5 rounded-xl border border-primary/5 p-1">
              <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img alt="Church Lane Bristol" className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCe7MN5GDp2J7QFJNwL92z-lo_Uw2fqHGJcy0PZTaWgTx0hToaqaa8wHtWXsVIyesyPyMzLXeGALC0CMZdE0JfJtH6KM8GYOn3w7BEi2GUJqg5POteiEdt55h5-wXtMCgg0giTzC2HNrNUMbUbqRlHKAbHhUzODItoFdFY4HtzMaEu2N7YyybcbPHpDXojAfGQYONgqdZrFJiI2kZjJBmeZcqdwEMEU2jkVgkkTbz8ygLE8GroFlkumWS8lg64XSi4uD4OONzlUZI"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-on-surface">14 Church Lane, Bristol</span>
                      <span className="text-[9px] font-mono bg-on-surface/5 text-on-surface/60 px-1.5 py-0.5 rounded">HOUSE</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">Design due in 6 hours · Spacecraft Architecture assigned</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <StatusBadge variant="urgent" />
                  <Link href="/designs/submit" className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:brightness-110 transition-all">
                    Submit Design
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* New Listings Near You */}
          <section className="space-y-3">
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">NEW LISTINGS NEAR YOU</h2>
              <p className="text-xs text-on-surface-variant/60 mt-1">Showing listings within 25 miles of Bristol</p>
            </div>

            <div className="space-y-2">
              {[
                {
                  name: 'Hartley Grange, Somerset', type: 'DETACHED', meta: 'Published 4h ago · Deadline: 3 days',
                  status: 'open' as const, cta: 'Express Interest', ctaBordered: true,
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSDQETGMhRbcPoFOn5BAKuq-4-Wasec4DQv384l9HEudBn8B9qzWhaVkF-lO6srGR9c85rGJGCOwTDk87Q_IYg1HdpO0uUwLwDWUCWqT71mbyfwHrnabHid86jbE1o-mzU4YC50Z41gTif2IkFcRBB90Eb_rjgGSgxhs9jKAxf_3kGGHZjb5BX15jKzq0_lMEY3uS3aq-0SBBkXajRsO2M-pjhOaZC2OVp3iXZdb7kxseL72O3UkwXp_IjMczpi5AoG4mM2u1K27Q',
                },
                {
                  name: '28 Royal York Crescent, Bristol', type: 'TERRACED', meta: 'Published 1 day ago · Interest expressed',
                  status: 'active' as const, cta: 'Interest expressed ✓', ctaBordered: false,
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhpkS51_uZFVEKm91v54s3vqPTNeYaUj7vv1GdYcZkAeKy08ouTDa1-ANbjEChDGpY2QoEwDBVxag_4_FBPH9uX-kiRBspBqQUVdh6d61ThcrNgcOecihHQWDhd87EAbZLEcYDT3n7imiLLUWxwCl_nWq1uO__x61wD7xcBmIe6rFhNXgMev3x9L3gqJQa12P4J7EO-4lyVsJRY6sQEHx8QW8AeeOFcPvS_RfEbhUmyGTlhUXWc6I4CbX6rPjspmYl1DT3aC4rk2k',
                },
                {
                  name: 'Old Mill House, Bath', type: 'SEMI-DETACHED', meta: 'Published 2 days ago · Another architect selected',
                  status: 'closed' as const, cta: 'Not selected', ctaBordered: false,
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD5vgwu4KJQvZz8F_vTDm-l-9lsEhcWaHaqjeB9Sw4m3TgOWk6NnsGvvf9e34YJ_zeU_NYzieCCq088v2rHr1JnItgDbjBH1ULT7ZoDwRw16X4Si0JgYnIm9g4TrMKZ0W3nedx-e1L5DemrUDKaSciFUF0Ryz8dniRsX-L3eKj25wgS6IgIzLxQGuEXbg41NX2oqfTXH1n2AW55mg9HHVsoOL1xWUu-HHviQRGlSwzFYUM_CNgJdbh2NT0Ncvgp2JQ9OR7jHD3o5E',
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between rounded-lg p-4 transition-all ${
                    item.status === 'closed'
                      ? 'bg-white/50 opacity-60'
                      : 'bg-white hover:bg-surface-container-low border border-transparent hover:border-outline-variant/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ${item.status === 'closed' ? 'grayscale' : ''}`}>
                      <img alt={item.name} className="w-full h-full object-cover" src={item.img} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-on-surface">{item.name}</span>
                        <span className="text-[9px] font-mono bg-on-surface/5 text-on-surface/60 px-1.5 py-0.5 rounded">{item.type}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant">{item.meta}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <StatusBadge variant={item.status} />
                    {item.status !== 'closed' ? (
                      <button className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                        item.ctaBordered
                          ? 'border border-primary text-primary hover:bg-primary/5'
                          : 'text-[#0D9488] font-semibold'
                      }`}>
                        {item.cta}
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-on-surface-variant/60 px-4 italic">{item.cta}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Stats Bar */}
        <footer className="fixed bottom-0 right-0 left-60 h-12 border-t border-slate-100 bg-[#FAF8FF]/90 backdrop-blur-md flex justify-end items-center gap-8 px-10 z-40">
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-widest text-[#3D4947]">
            <span className="text-[#0D9488] font-bold">ACTIVE ASSIGNMENTS: 1</span>
            <div className="w-px h-4 bg-slate-200" />
            <span>COMPLETED REPORTS: 8 this year</span>
            <div className="w-px h-4 bg-slate-200" />
            <span>INSTRUCTIONS: 2 clients confirmed</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
