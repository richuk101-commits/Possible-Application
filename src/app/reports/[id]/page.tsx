export default function PropertyDevReport() {
  return (
    <div className="bg-surface text-on-surface antialiased scroll-smooth">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm dark:shadow-none flex justify-between items-center px-8 py-4 glass-header">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tighter text-slate-900 dark:text-slate-50 uppercase">Spencers x Spacecraft</span>
        </div>
        
        <div className="hidden md:flex flex-col items-center">
          <span className="font-sans tracking-[0.2em] text-[10px] uppercase font-bold text-slate-400">Development Potential Report</span>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex gap-8 items-center">
            <a className="font-sans tracking-tight text-sm uppercase font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">Portfolio</a>
            <a className="font-sans tracking-tight text-sm uppercase font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">Planning</a>
            <a className="font-sans tracking-tight text-sm uppercase font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">Impact</a>
          </nav>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-all shadow-lg shadow-primary/20">
            Download PDF
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* Section 1: Hero */}
        <section className="relative h-[819px] w-full overflow-hidden flex items-end pb-24 px-12">
          <div className="absolute inset-0 z-0">
            <img alt="Minstead House" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR5YPIeQgLUGPZTjuto7JDXZ9kcJmsxwJO0jzlkU005usV39X-B-mu8BDlBEftFhvSM5j8brYT97O6Q2onUqS0ipjibKyMhb3qZXMxNcd0AMvNOYtCPoAQYMElxIlSKEs6gJsRm7eN6Hbx07kNpfzj0hckk4Lu8MRlsS-z5cbE5av_uuiLWvqH2DVVDAFUpyMJT06IYKjXNs86DWDCO2GyfpuhWdMu_Mh86P3FAjEdQ6m1Iob7PX5tqvkgD_e4w5SNhwAvSj527XA"/>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-4xl">
            <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] font-black tracking-[0.2em] uppercase rounded-sm mb-6">Development Potential Report</span>
            <h1 className="text-white text-6xl lg:text-8xl font-bold tracking-tighter mb-4">Minstead, Lyndhurst, SO43 7FQ</h1>
            <p className="text-slate-300 text-xl font-light tracking-wide uppercase">Country House · Freehold</p>
          </div>
        </section>

        {/* Section 2: Overview */}
        <section className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-20">
          <div className="flex flex-col justify-center">
            <div className="space-y-12">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-on-surface mb-4">Minstead House, Lyndhurst, SO43 7FQ</h1>
                <p className="text-2xl font-light tracking-wide uppercase text-primary">Country House · Freehold</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-outline-variant">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Bedrooms</p>
                  <p className="text-4xl font-bold mono">6</p>
                </div>
                <div className="space-y-1 border-l-0 md:border-l border-outline-variant md:pl-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Bathrooms</p>
                  <p className="text-4xl font-bold mono">5</p>
                </div>
                <div className="space-y-1 border-l-0 md:border-l border-outline-variant md:pl-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Living Rooms</p>
                  <p className="text-4xl font-bold mono">5</p>
                </div>
              </div>

              <div className="prose prose-lg text-on-surface-variant max-w-none">
                <p className="text-xl leading-relaxed italic border-l-4 border-primary pl-8 py-2">
                  "A wonderful country home presented in fine order, set in a picturesque and secluded New Forest location. Minstead House features an array of highlights, fused with luxury and modern specification."
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-12">
              <div className="w-12 h-[1px] bg-primary"></div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Property Status</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-8">Executive Summary</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-8 bg-surface-container-low rounded-2xl">
                <div className="w-16 h-16 bg-white flex items-center justify-center rounded-xl shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-sm uppercase tracking-widest font-semibold mb-1">Current Valuation</p>
                  <p className="text-4xl font-bold mono">£2,375,000</p>
                </div>
              </div>

              <div className="bg-surface-container-low p-8 rounded-2xl">
                <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-4">Energy Performance</p>
                <div className="flex items-center gap-4">
                  <div className="px-6 py-3 bg-[#FFD700] text-black font-black rounded-sm text-2xl shadow-sm">D</div>
                  <span className="text-sm text-on-surface-variant leading-tight">Current rating for this period manor house. Potential for enhancement through modernization.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Design Potential */}
        <section className="bg-surface-container-low py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24">
              <h2 className="text-5xl font-bold tracking-tighter mb-4">What This Property Could Become</h2>
              <p className="text-on-surface-variant text-xl">Architectural transformations curated by Spacecraft Architecture</p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
              <div className="relative group">
                <span className="absolute top-6 left-6 z-10 bg-black/40 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Current Manor</span>
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-4 border-white">
                  <img alt="Existing Manor" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0uifbgz_g3vFoaxEH2n-bQYEZChiCLYWOJ9CSRR6etkBS8h1Ao6QDHGZs1kzMhkNuuykO2kcs_NKb443ZblzR0eMVicPUZwkehHUIWXRA90RUuMAj1yw2GW3JzdznNBN0viBz_pndTZDffkny7xnAw3VhVPXcY9rk8CCGxDkbV3dDsRpeykbzX5Fg7HFBS8JnhNC3PTzpWKldE2Qv-bBeTNfqoMzJUxaTVjo-oM4NjkYdBex9woUszh0p71iKvKYi_kekZ-L-ih2oQ"/>
                </div>
              </div>

              <div className="relative group">
                <span className="absolute top-6 left-6 z-10 bg-primary/80 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Proposed Evolution (CGI)</span>
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl border-4 border-white">
                  <img alt="Proposed Luxury Extension" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0ujb58XJw2j-UbjLQAYOGhAnpLSZanVbDlWXxKXCxzS0Tps_3usuiHw5fzX18a0VRRi_dHcMgnZoXBGaQwGi_S6YqD0qeuGkQ5uR2ikrgNGMw9-qNm6gLCxKy_5Ou4xLlEz0duXmWd7ygGMz6Sn5H888sJJsreBwtdoQyPkPKrSQkoWxBAzQJ-yJyWRdwxw0x1Hxn6AlJrH5ZEy-xbNtuf4EJWk3jvlTTYNc08YLaKAE-k9eV6VYvKj8-WHtJ6qaGIEVr09AWD6zvQ"/>
                </div>
              </div>
            </div>

            {/* Proposed Floor Plans */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold tracking-tight mb-2">Proposed Master Plan</h3>
                <p className="text-on-surface-variant">Optimizing floorplates for multi-generational living</p>
              </div>

              <div className="w-full max-w-5xl bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl mb-12 border border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-slate-100 pb-8">
                  <div className="text-left">
                    <h4 className="text-2xl font-bold">Spacecraft Proposal</h4>
                    <p className="text-on-surface-variant text-sm font-medium">Grand Glazed Pavilion & Wellness Suite Integration</p>
                  </div>
                  <div className="text-right mt-6 md:mt-0">
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Estimated Project Investment</p>
                    <p className="text-3xl font-bold text-primary mono">£300,000 – £450,000</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-2">
                  <img alt="Proposed Plan" className="w-full h-auto rounded-xl shadow-inner" src="https://lh3.googleusercontent.com/aida/ADBb0ujYgNud7z3GHExPcYo_ySVTPt9ZBZwZvF2rZGBhjHUc1CxcHqZe1ku9CvmBBUci3bs-gFViVoR89QglRyC9DxVjZoUO6pCun_obU01io_bccdBGe20LY2pdEe-9Xip-cyme2UAQ3xgSOoJOSZpmKYc6PD_aZg84PvqQDu3__FaS3AtjfgSSxpSbK4P-Z3sNfO6zXS-KUQvhnrpcLuKPCQ5wxNfPZU1pnMuH-8UjrJQfX2P5uldeH5l4euecTRpnkCUz0u4oHfPQOQ"/>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">zoom_in</span>
                    <div>
                      <p className="font-bold text-sm">Estate Enhancement</p>
                      <p className="text-xs text-on-surface-variant">Significant increase in prime entertaining space.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">light_mode</span>
                    <div>
                      <p className="font-bold text-sm">Panoramic Aspect</p>
                      <p className="text-xs text-on-surface-variant">Floor-to-ceiling glass to capture New Forest vistas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">landscape</span>
                    <div>
                      <p className="font-bold text-sm">Ground Integration</p>
                      <p className="text-xs text-on-surface-variant">Seamless connectivity with established gardens.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Planning */}
        <section className="max-w-7xl mx-auto px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-24 mb-24">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-8">Planning Assessment</h2>
              <p className="text-[18px] leading-[1.8] text-on-surface-variant max-w-3xl">
                  Our spatial analysis indicates strong precedent for sympathetic extensions within the New Forest National Park, provided architectural materiality respects the local vernacular. The property's secluded position offers significant flexibility for rear-facing contemporary interventions. Existing infrastructure supports a substantial increase in internal floor area without infringing on the surrounding protected woodland.
              </p>
            </div>
            <div className="bg-surface-container-high/50 p-8 rounded-2xl flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Confidence Score</span>
              <div className="text-5xl font-black text-on-surface mb-2">88%</div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[88%] h-full bg-primary"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(13,148,136,0.6)]"></div>
                <h4 className="font-bold uppercase tracking-widest text-xs">Opportunities</h4>
              </div>
              <ul className="space-y-4 text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <span>Secluded plot allows for bold design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                  <span>Existing outbuildings for conversion</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                <h4 className="font-bold uppercase tracking-widest text-xs">To Investigate</h4>
              </div>
              <ul className="space-y-4 text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-sm mt-1">help</span>
                  <span>New Forest National Park planning constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-sm mt-1">help</span>
                  <span>Ecological impact survey requirements</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-error rounded-full shadow-[0_0_8px_rgba(186,26,26,0.6)]"></div>
                <h4 className="font-bold uppercase tracking-widest text-xs">Constraints</h4>
              </div>
              <ul className="space-y-4 text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-error text-sm mt-1">warning</span>
                  <span>Listed status potential (period details)</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Nearby Premium Approvals</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="font-bold text-sm mb-1">Beech House</p>
                <p className="text-xs text-slate-400">Glass Pavilion • 2023</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="font-bold text-sm mb-1">The Gables</p>
                <p className="text-xs text-slate-400">Wellness Wing • 2022</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="font-bold text-sm mb-1">Forest Lodge</p>
                <p className="text-xs text-slate-400">Ancillary Barn • 2023</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="font-bold text-sm mb-1">Highwood Manor</p>
                <p className="text-xs text-slate-400">Basement Cinema • 2021</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Numbers */}
        <section className="bg-[#0F172A] py-32 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
              <div className="p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Current Value</p>
                <p className="text-5xl font-bold text-white mono">£2.375m</p>
              </div>
              <div className="p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Projected Value</p>
                <p className="text-5xl font-bold text-white mono">£2.850m</p>
              </div>
              <div className="p-10 bg-primary/10 backdrop-blur-xl rounded-3xl border border-primary/30">
                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Net Uplift</p>
                <p className="text-5xl font-bold text-primary mono">£350k – £450k</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <span className="material-symbols-outlined text-6xl text-primary/40 mb-8" style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
              <blockquote className="text-3xl text-white font-light italic leading-relaxed mb-8">
                "The demand for significant country estates in the New Forest remains exceptionally high. A sympathetic modernization and extension of this floorplate would command a substantial premium in the current market."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img alt="James Miller" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFvmPB4vcg7zxuqjj-lHSsD3uOa-vCEAzI8yWAyD6czkm0rU0XLKOyEkPsLkRc1Cf_sTkdIg-92995J6jfN0oRH2Xbe0pKSkkBNJq2jVhc4H5IwQHe_F8n4ObcIefeP6Z3CtUkEipVkDsIh_ZVc6IqFH0IJklWxnylKFzRlYvjOSYNWWKR7sJ1VF0-6jfPJZa3lz6gIae2ULZ027hTzQQusXbJGf_SJVmoMVQ-brLaBMDkW8gwTvRH6JPGkgRbDkXwjdIH3HvIfoU"/>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">James Miller</p>
                  <p className="text-slate-400 text-xs uppercase tracking-widest">Head of Development, Spencers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Next Steps */}
        <section className="max-w-7xl mx-auto px-8 py-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold tracking-tighter">Initiate Strategic Development</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-12 bg-surface-container-low rounded-[2rem] hover:bg-surface-container-high transition-all duration-500 flex flex-col items-center text-center border border-slate-100">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-8 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl text-primary">real_estate_agent</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Contact Agent</h3>
              <p className="text-on-surface-variant mb-8 max-w-xs">Discuss high-end market positioning and schedule a discrete site consultation.</p>
              <button className="w-full bg-primary py-5 rounded-xl text-white font-bold text-lg hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20">Speak with Spencers</button>
            </div>

            <div className="group p-12 bg-surface-container-low rounded-[2rem] hover:bg-surface-container-high transition-all duration-500 flex flex-col items-center text-center border border-slate-100">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-8 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl text-primary">architecture</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Contact Architect</h3>
              <p className="text-on-surface-variant mb-8 max-w-xs">Refine the architectural vision and initiate the pre-planning inquiry.</p>
              <button className="w-full bg-primary py-5 rounded-xl text-white font-bold text-lg hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20">Speak with Spacecraft</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black w-full relative py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <span className="text-sm font-bold text-slate-50 uppercase tracking-tighter">Spencers x Spacecraft</span>
          </div>
          <div className="flex gap-8 mb-8 md:mb-0">
            <a className="font-sans text-xs tracking-wide text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-sans text-xs tracking-wide text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-sans text-xs tracking-wide text-slate-400 hover:text-primary transition-colors" href="#">Sustainability Report</a>
          </div>
          <p className="font-sans text-xs tracking-wide text-slate-500 text-center md:text-right max-w-xs">
            © 2024 Spencers x Spacecraft. All rights reserved. <br/>
            <span className="text-[10px] opacity-40">Disclaimer: This report is for informational purposes only. Estimates are subject to formal planning permission and site-specific surveys.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
