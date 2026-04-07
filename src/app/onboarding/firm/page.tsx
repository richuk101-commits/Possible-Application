export default function FirmSetup() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <header className="bg-[#FAF8FF] dark:bg-[#0D1321] font-['Inter'] antialiased tracking-tight sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-6 w-full max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-[#131B2E] dark:text-[#FAF8FF]">
            Possible
          </div>
          {/* Progress Stepper */}
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-outline-variant"></div>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-outline-variant"></div>
          </div>
          <div className="text-on-surface-variant text-sm font-medium cursor-pointer hover:text-on-surface transition-colors">
            Help
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-start pt-12 pb-24 px-6 relative">
        {/* Page Header */}
        <div className="text-center mb-12 max-w-xl z-10">
          <h1 className="text-[28px] font-extrabold tracking-tight text-on-surface mb-3">Set up your firm profile</h1>
          <p className="text-on-surface-variant text-base">This takes 2 minutes. Your logo and name will appear on every report.</p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[480px] space-y-8 z-10">
          <form className="space-y-6">
            {/* Firm Name */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Firm Name</label>
              <input className="w-full bg-transparent border-0 outline-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 text-lg font-medium transition-colors" placeholder="e.g. Spencers Estate Agents" type="text" defaultValue="Spencers Estate Agents"/>
            </div>

            {/* Your Name */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Your Name</label>
              <input className="w-full bg-transparent border-0 outline-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 text-lg font-medium transition-colors" placeholder="Full name" type="text"/>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Email Address</label>
              <input className="w-full bg-transparent border-0 outline-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 text-lg font-medium transition-colors" placeholder="name@firm.com" type="email"/>
            </div>

            {/* Firm Logo Upload Zone */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Firm Logo</label>
              <div className="group relative flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-xl p-8 bg-surface-container-lowest hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-4xl mb-2">cloud_upload</span>
                <p className="text-sm font-medium text-on-surface">Click to upload or drag and drop</p>
                <p className="text-xs text-on-surface-variant mt-1">SVG, PNG, or JPG (max. 800x400px)</p>
                <input className="absolute inset-0 opacity-0 cursor-pointer" type="file"/>
              </div>
            </div>

            {/* Your Location */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">Your Location</label>
              <div className="relative">
                <input className="w-full bg-transparent border-0 outline-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 text-lg font-medium transition-colors pr-10" placeholder="City, Country" type="text"/>
                <span className="material-symbols-outlined absolute right-0 top-3 text-on-surface-variant">location_on</span>
              </div>
            </div>

            {/* Data Agreement */}
            <div className="flex items-start gap-3 pt-4">
              <div className="flex items-center h-5">
                <input className="w-5 h-5 border-outline-variant rounded text-primary focus:ring-primary cursor-pointer" id="agreement" type="checkbox"/>
              </div>
              <label className="text-sm text-on-surface-variant leading-relaxed select-none cursor-pointer" htmlFor="agreement">
                I agree to the <a className="text-primary font-semibold hover:underline" href="#">Data Processing Agreement</a> and confirm I have the authority to manage this firm profile.
              </label>
            </div>

            {/* CTA Actions */}
            <div className="flex items-center justify-between pt-8">
              <a href="/onboarding/role" className="flex items-center gap-2 text-on-surface-variant font-semibold hover:text-on-surface transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back
              </a>
              <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2" type="submit">
                Continue
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        {/* Visual Background Decoration (Subtle asymmetric element) */}
        <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-primary-fixed opacity-10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="fixed -top-24 -right-24 w-64 h-64 bg-secondary-fixed opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F2F3FF] dark:bg-[#131B2E] font-['Inter'] text-sm tracking-wide py-12 border-t border-slate-200/10 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full max-w-7xl mx-auto">
          <div className="text-[#3D4947] mb-4 md:mb-0">
            © 2024 Possible. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a className="text-[#3D4947] hover:text-teal-500 transition-colors" href="#">Privacy Policy</a>
            <a className="text-[#3D4947] hover:text-teal-500 transition-colors" href="#">Terms of Service</a>
            <a className="text-[#3D4947] hover:text-teal-500 transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
