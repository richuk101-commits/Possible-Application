'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArchitectSidebar from '@/components/ArchitectSidebar';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function SubmitDesign() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    scope: "The proposed design introduces a double-height rear extension maximizing natural light and creating an open-plan kitchen/living area, while maintaining the heritage character of the street-facing facade.",
    min_cost: "300000",
    max_cost: "450000"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // In a real app, we'd use the assignment ID from the URL params
      // For this demo, we'll simulate a successful submission
      
      // 1. We would create a report entry or update the assignment
      // const { error } = await supabase.from('reports').insert([...])

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success('Design submitted successfully!');
      router.push('/assignments');
    } catch (error: any) {
      toast.error('Error submitting design.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen selection:bg-teal-100">
      <ArchitectSidebar />

      {/* Main Container */}
      <div className="flex-1 ml-60 flex flex-col relative min-h-screen bg-white">
        {/* TOP BAR */}
        <header className="fixed top-0 right-0 w-[calc(100%-15rem)] h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200/20 flex items-center justify-between px-10 z-40 shadow-sm shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <span className="text-xs font-bold uppercase tracking-wider">Back</span>
            </button>
            <div className="h-4 w-px bg-slate-200"></div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 truncate">Submit Design: 14 Church Lane</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full flex items-center gap-2 border border-amber-100 shadow-sm shadow-amber-900/5">
              <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>schedule</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Due in 6 hours</span>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT CANVAS */}
        <main className="pt-24 pb-32 px-10 flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-12 pb-12">
            
            {/* PROPERTY CONTEXT CARD */}
            <section className="bg-slate-50 p-6 rounded-2xl flex gap-6 items-center border border-slate-100">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-white">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQVWe7YA1kd4qbOtdBw1PWfSVU_NswMSIGgDzzwnNlIzql7MDBjBbf3SXN_BI4lTwZhSZs29VPgkk84bwCKy_wrVYTltAM2zzU34XljQe8gq4-SovHClFioRTljXFMCvYusAHfeOfHZ4EG4E8w8A798TZWlCbuIOo8E4_Tq3d10yb98nQ-2yV-NxNn1rprYWdtePd7CI6JAjdOmcnGE4dpNtdc1FIL_Q6w2mR9TqIaYb8E6fj4Vy2TfYwOqVIhsrzQLDWEZZ_Y9zI" alt="Property Profile"/>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                  <span className="text-primary-container font-black">TERRACED HOUSE</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>Published by Spencers</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">14 Church Lane, Bristol</h3>
                <div className="relative pl-4 border-l-2 border-primary/20 py-1 italic text-xs text-on-surface-variant leading-relaxed">
                  "Potential for loft conversion and full rear extension — agent sees significant uplift possible"
                </div>
              </div>
            </section>

            {/* SECTION 1: BEFORE IMAGES */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Before Images</h4>
                <div className="bg-slate-100 p-1 rounded-xl flex text-[10px] font-bold">
                  <button className="bg-white shadow-sm px-4 py-2 rounded-lg text-primary">Listing photos</button>
                  <button className="px-4 py-2 rounded-lg text-slate-500 opacity-60 hover:opacity-100 transition-opacity">Upload new</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCxWwEbTwXiE5PmBWYSxUrQ05xBXLBjr36agFO-VMCwG88ruGkpgps-n2NGYz5_Hjn2sdg-qZHwxVPJA4ujx_VvDVjV4h87pP9qwTt52ZV76ZPOoBi5JbBMnDB_O4OWru0vX_jK5ML_9ySPVVynxUfw2N86H8WWH9ftO-4pWi5NLBQ390SvDD-Vli4wWSlKO2rngA8NTY400pnPxTbFgz9yjXwMAr4Z0LdWwiYs78lnCzAEGI9igbSOiTlw9SDIMfcy5TGed1F5LKw",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDkX64byvUrOlVWwYDshM7bvcnptqUIH_INxsmCDlDTpxSbibEHx4ODG5OEoL-IxAchSzRgX_MM1punn65Zh_uXINsaWxWGo2VgxjryBylEHfLlACnGlvqUGXR2-MU1SLyaMEMq9BKdhm7HkeAifMk3GavFxS0tq6cyaxNGb_ztUmU3xBqoYjQlclk5Jj8KMqg-qgmAwi3BOzlvLaF4QOKKxdaCOyZZs2Ngxi8Jf9k14wCcp7-UvIqJ_-t8m1AIvEo7lrTDR3rdVxo",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBEheDQUx2Qz1v8ZNNuxEcHZEacF7angx7GvSjZ0bpsu9JiTKNBe-1mjxNr_TwDivFMmRD_61zkTGjwq0KEcUtDxCrP_VDRsZAyoF1duBR-Sav0FHKMkWJDI9uwZ2wNpARxRP5VC3mIPmzQV4ADGmY3mGxHnacearenhaFBBhjQ2dOMkjGSgWPb-xexNet0fe6a_RFADA9eEQR022oHkSvMhnWfazd06vuglQQEPMf1OOT46Dd2K7yB37rDKQArj_CZvbUVDGrKmV0"
                ].map((img, i) => (
                  <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-primary ring-4 ring-primary/5 shadow-md">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={img} alt={`Before ${i}`}/>
                    <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 2: YOUR DESIGN RENDERS */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Design Renders</h4>
                <span className="text-primary-container animate-pulse text-[10px] font-bold">REQUIRED</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 bg-slate-50 hover:bg-slate-100 hover:border-primary/50 transition-all group cursor-pointer aspect-[16/10]">
                  <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:scale-110 group-hover:text-primary transition-all mb-3">image</span>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-1">Add Render</p>
                  <p className="text-[10px] text-slate-400">JPG or PNG allowed</p>
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-100 group shadow-sm transition-all hover:shadow-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV39Zwis-pQQHEI3LX6DXc6C4rSq668QgZMLGD2jOzj2Xnf1V0uJ63ydBoLdlBbecq1WR4L-AQHf7-ZCvYgVAvjqmvlRkaVV7KQvpHcBVvJ56Lty0R7Zm96nDj_9okrOcvTMtPRHB8HEUQYtvTiO_8WPFt4bKAjky1zIVYUTRZ1wrcxAoblze2bgSB0vhDmMIDXkB2D49UMrtCRO1nTpB2L60psxya4TaOysZQEIASGtAaAOGlY9Ufnn1mZiGozfRB3VgzSRQSkI4" alt="Render 01"/>
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-white text-primary p-1.5 rounded-full shadow-xl flex items-center justify-center ring-2 ring-primary">
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white text-[9px] font-black tracking-widest px-2.5 py-1.5 rounded-lg border border-white/20 uppercase">Render_01.jpg</div>
                </div>
              </div>
            </section>

            {/* SECTION 4: YOUR PROPOSED SCOPE */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Proposed Scope</h4>
                <span className="font-mono text-[9px] text-slate-400 tracking-wider">320 / 500 characters</span>
              </div>
              <div className="relative group focus-within:ring-2 ring-primary/10 ring-offset-4 rounded-2xl transition-all">
                <textarea 
                  name="scope"
                  value={formData.scope}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50/50 border-b-2 border-primary/20 outline-none p-6 text-sm text-slate-900 leading-relaxed focus:border-primary placeholder:text-slate-300 resize-none rounded-t-2xl shadow-sm" 
                  placeholder="Describe your proposal..." 
                  rows={6}
                />
              </div>
            </section>

            {/* SECTION 5: ESTIMATED DEVELOPMENT COST */}
            <section className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Development Cost Estimate</h4>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Minimum</label>
                  <div className="relative group">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xl">£</span>
                    <input 
                      name="min_cost"
                      value={formData.min_cost}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-none outline-none border-b border-slate-200 focus:border-primary pl-5 py-3 font-black text-2xl text-slate-900 tracking-tight transition-all" 
                      type="number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Maximum</label>
                  <div className="relative group">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xl">£</span>
                    <input 
                      name="max_cost"
                      value={formData.max_cost}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-none outline-none border-b border-slate-200 focus:border-primary pl-5 py-3 font-black text-2xl text-slate-900 tracking-tight transition-all" 
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 p-4 bg-teal-50 border border-teal-100 rounded-xl">
                <span className="material-symbols-outlined text-teal-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <p className="text-[10px] text-teal-800 leading-relaxed font-medium italic">
                  This estimate will be shared with the agent and client to assess project viability against market uplift figures.
                </p>
              </div>
            </section>
          </div>
        </main>

        {/* BOTTOM ACTIONS (Sticky Footer) */}
        <footer className="fixed bottom-0 right-0 w-[calc(100%-15rem)] bg-white/80 backdrop-blur-xl border-t border-slate-200/20 px-10 py-6 flex items-center justify-between z-40 shrink-0 shadow-lg shadow-black/5">
          <button className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 group">
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">save</span>
            Save Draft
          </button>
          
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5 mb-2">
              <div className="h-1 w-8 rounded-full bg-primary/20"></div>
              <div className="h-1 w-8 rounded-full bg-primary"></div>
              <div className="h-1 w-8 rounded-full bg-primary"></div>
              <div className="h-1 w-8 rounded-full bg-primary"></div>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">All steps complete</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Estimate</span>
              <span className="text-lg font-black text-slate-900 tracking-tighter">£300k — £450k</span>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary text-white px-10 py-3.5 rounded-full font-black text-sm shadow-xl shadow-primary/20 hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Design'}
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
