'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppSidebar from '@/components/AppSidebar';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function NewListing() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    address: '14 Church Lane, Bristol, BS1 4QR',
    property_type: 'Terraced House',
    tenure: 'Freehold',
    epc_rating: 'D',
    description: 'A charming three-bedroom Victorian terraced house located on the desirable Church Lane. The property boasts original features, high ceilings, and a private rear garden. Situated within walking distance to Bristol Temple Meads and local independent cafés.',
    current_valuation: '485000',
    deadline: '2026-04-09T14:00',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (isDraft = true) => {
    setLoading(true);
    try {
      // In a real app, we'd get the user ID from auth
      // For this MVP demo, we'll try to insert and catch if auth isn't set up yet
      const { data, error } = await supabase
        .from('listings')
        .insert([
          {
            address: formData.address,
            property_type: formData.property_type,
            tenure: formData.tenure,
            epc_rating: formData.epc_rating,
            description: formData.description,
            current_valuation: parseFloat(formData.current_valuation),
            status: isDraft ? 'open' : 'active',
          }
        ])
        .select();

      if (error) throw error;

      toast.success(isDraft ? 'Draft saved successfully!' : 'Listing published!');
      if (!isDraft) router.push('/');
    } catch (error: any) {
      console.error('Error saving listing:', error.message);
      toast.error('Error saving listing. Check your Supabase connection.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="flex min-h-screen overflow-hidden bg-surface text-on-surface selection:bg-primary-fixed">
      <AppSidebar />
      <main className="ml-60 flex-1 min-h-screen flex flex-col bg-[#FAF8FF]">
        {/* TOP NAV BAR */}
        <header className="flex justify-between items-center h-16 px-10 sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/20 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-on-surface">arrow_back</span>
            </button>
            <h2 className="text-xl font-bold text-on-surface tracking-tight">New Listing</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleSave(true)}
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Draft'}
            </button>
            <button 
              onClick={step === 3 ? () => handleSave(false) : nextStep}
              className="px-5 py-2 text-sm font-bold bg-primary text-white rounded-full hover:brightness-110 transition-all flex items-center gap-2 shadow-md shadow-primary/10"
            >
              {step === 3 ? 'Publish Listing' : step === 2 ? 'Next: Review' : 'Next: Valuation'}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </header>

        {/* STEP PROGRESS */}
        <section className="px-10 py-6 bg-white/40 border-b border-slate-200/10 shrink-0">
          <div className="max-w-2xl mx-auto flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 -z-0">
              <div className={`h-full bg-primary transition-all duration-500 ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`}></div>
            </div>
            
            <div className={`relative z-10 flex flex-col items-center gap-2 transition-all ${step >= 1 ? 'text-primary' : 'text-slate-300'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-[#FAF8FF] transition-all ${step >= 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100'}`}>
                <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: step >= 1 ? "'FILL' 1" : ""}}>home</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Property</span>
            </div>

            <div className={`relative z-10 flex flex-col items-center gap-2 transition-all ${step >= 2 ? 'text-primary' : 'text-slate-300'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-[#FAF8FF] transition-all ${step >= 2 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100'}`}>
                <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: step >= 2 ? "'FILL' 1" : ""}}>payments</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Valuation</span>
            </div>

            <div className={`relative z-10 flex flex-col items-center gap-2 transition-all ${step >= 3 ? 'text-primary' : 'text-slate-300'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-[#FAF8FF] transition-all ${step >= 3 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100'}`}>
                <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: step >= 3 ? "'FILL' 1" : ""}}>publish</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Review</span>
            </div>
          </div>
        </section>

        {/* FORM BODY */}
        <section className="flex-1 px-10 py-12 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-12 pb-24">
            
            {step === 1 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Mode Selector */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Input Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative p-5 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer flex flex-col gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">link</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">Paste URL</h4>
                        <p className="text-[11px] text-on-surface-variant leading-snug">Sync from portal (Rightmove/Zoopla)</p>
                      </div>
                      <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-4 border-primary bg-white shadow-sm"></div>
                    </div>
                    <div className="relative p-5 rounded-2xl border-2 border-slate-100 bg-white cursor-pointer flex flex-col gap-3 hover:border-slate-300 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">edit_note</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">Manual Entry</h4>
                        <p className="text-[11px] text-on-surface-variant leading-snug">Enter details manually</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Form */}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Full Address</label>
                    <input 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-none outline-none border-b border-slate-200 focus:border-primary px-0 py-3 text-lg font-bold text-on-surface transition-all placeholder:text-slate-300" 
                      placeholder="Street, City, Postcode"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Property Type</label>
                      <select 
                        name="property_type"
                        value={formData.property_type}
                        onChange={handleInputChange}
                        className="w-full appearance-none outline-none bg-transparent border-none border-b border-slate-200 focus:border-primary px-0 py-3 text-sm font-semibold"
                      >
                        <option>Terraced House</option>
                        <option>Semi-Detached</option>
                        <option>Detached House</option>
                        <option>Apartment</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Tenure</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['Freehold', 'Leasehold'].map(t => (
                          <button 
                            key={t}
                            onClick={() => setFormData(prev => ({ ...prev, tenure: t }))}
                            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${formData.tenure === t ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">EPC Rating</label>
                    <div className="flex gap-2">
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((rating) => (
                        <button 
                          key={rating}
                          onClick={() => setFormData(prev => ({ ...prev, epc_rating: rating }))}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all border-2 ${
                            formData.epc_rating === rating 
                              ? 'bg-primary text-white border-primary shadow-md shadow-primary/10' 
                              : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Description</label>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full bg-white outline-none border border-slate-100 focus:border-primary rounded-xl p-4 text-sm leading-relaxed text-on-surface-variant resize-none h-32 shadow-sm" 
                      placeholder="Describe the property..."
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Current Valuation (£)</label>
                    <div className="relative">
                      <span className="absolute left-0 bottom-3 text-2xl font-light text-slate-300">£</span>
                      <input 
                        name="current_valuation"
                        value={formData.current_valuation}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-none outline-none border-b border-slate-200 focus:border-primary pl-7 py-3 text-3xl font-black text-on-surface transition-all tracking-tighter" 
                        type="number"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2">This is the current market value before any development potential is considered.</p>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-primary mb-1">AI Recommendation</h5>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed">Based on local comparables in BS1, properties with rear extensions typically see a 15-20% value uplift.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Architect Submission Deadline</label>
                  <div className="flex items-center bg-white rounded-xl border border-slate-100 p-4 shadow-sm group focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-slate-400 mr-3 group-focus-within:text-primary transition-colors">calendar_month</span>
                    <input 
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full outline-none bg-transparent border-none p-0 text-sm font-semibold" 
                      type="datetime-local" 
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-on-surface tracking-tight">{formData.address}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider px-2 py-0.5 bg-primary/10 rounded">{formData.property_type}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-0.5 bg-slate-100 rounded">EPC {formData.epc_rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">VALUATION</span>
                      <span className="text-xl font-black text-on-surface tracking-tighter">£{parseFloat(formData.current_valuation).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DESCRIPTION</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3 italic">"{formData.description}"</p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-lg">person_add</span>
                      </div>
                      <span className="text-[11px] font-medium text-on-surface-variant">Architect assignment triggered on publish</span>
                    </div>
                    <span className="text-[11px] font-bold text-primary">Deadline: {new Date(formData.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-xl flex gap-3 text-amber-800">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  <p className="text-[10px] leading-relaxed font-medium">By publishing, this listing will become visible to your panel of architects for interest expression. Ensure all property details are accurate.</p>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* BOTTOM ACTIONS BAR */}
        <footer className="h-20 bg-white/80 backdrop-blur-md border-t border-slate-200/20 flex items-center px-10 sticky bottom-0 z-40 shrink-0">
          <div className="flex-1">
            {step > 1 && (
              <button onClick={prevStep} className="text-sm font-bold text-slate-400 hover:text-on-surface transition-colors flex items-center gap-2 group">
                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Previous
              </button>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-300">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            Secure encrypted data transmission
          </div>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={step === 3 ? () => handleSave(false) : nextStep}
              disabled={loading}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:brightness-110 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Processing...' : step === 3 ? 'Publish Listing' : 'Next Step'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
