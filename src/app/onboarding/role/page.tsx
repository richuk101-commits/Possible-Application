export default function ChooseRole() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 md:py-24 z-10">
        
        {/* Brand Identity Section */}
        <div className="text-center mb-16 space-y-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-on-surface leading-none">
              Possible
          </h1>
          <p className="text-xs font-bold tracking-[0.2em] text-on-surface-variant uppercase">
              THE INTELLIGENT ESTATE
          </p>
          <p className="pt-6 text-xl text-on-surface-variant font-light tracking-tight">
              Reimagine what's possible for your home.
          </p>
        </div>

        {/* Role Selection Header */}
        <div className="text-center mb-12">
          <h2 className="text-[28px] font-bold text-on-surface tracking-tight mb-2">
              How will you be using Possible?
          </h2>
          <p className="text-on-surface-variant text-base">
              We'll set up your account based on your role.
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
          
          {/* Card A: Estate Agent */}
          <div className="group relative bg-surface-container-lowest p-10 rounded-xl border border-outline-variant/15 shadow-[0_20px_50px_-12px_rgba(19,27,46,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(19,27,46,0.08)] flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary transition-transform duration-500 group-hover:scale-110">
              <span className="material-symbols-outlined text-4xl">apartment</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">I'm an Estate Agent</h3>
            <p className="text-on-surface-variant mb-10 leading-relaxed text-balance max-w-xs">
                Manage high-performance property portfolios and streamline client negotiations with curated intelligence.
            </p>
            <a href="/" className="mt-auto w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-semibold tracking-tight transition-all active:scale-[0.98] hover:brightness-110 flex items-center justify-center gap-2">
                Get started free
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>

          {/* Card B: Architect */}
          <div className="group relative bg-surface-container-lowest p-10 rounded-xl border border-outline-variant/15 shadow-[0_20px_50px_-12px_rgba(19,27,46,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(19,27,46,0.08)] flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary transition-transform duration-500 group-hover:scale-110">
              <span className="material-symbols-outlined text-4xl">architecture</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-4">I'm an Architect</h3>
            <p className="text-on-surface-variant mb-10 leading-relaxed text-balance max-w-xs">
                Visualize complex structural data and collaborate on precision-driven property transformations.
            </p>
            <a href="/assignments" className="mt-auto w-full py-4 border-2 border-primary text-primary rounded-full font-semibold tracking-tight transition-all active:scale-[0.98] hover:bg-primary/5 flex items-center justify-center gap-2">
                Get started free
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Footer Sign-in Link */}
        <div className="mt-16 text-center">
          <a className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">
            Already have an account? <span className="text-on-surface font-bold border-b-2 border-primary/20 hover:border-primary transition-all">Sign in</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
        </div>
      </main>

      {/* Visual Decorative Elements */}
      <div className="fixed top-0 right-0 w-1/3 h-full pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-bl from-surface-container-highest/50 to-transparent"></div>
      </div>
      <div className="fixed bottom-0 left-0 w-1/4 h-1/2 pointer-events-none z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed/20 to-transparent"></div>
      </div>

      {/* Footer Component */}
      <footer className="bg-[#F2F3FF] dark:bg-[#131B2E] font-['Inter'] text-sm tracking-wide py-12 border-t border-slate-200/10 flex flex-col md:flex-row justify-between items-center px-8 w-full mt-auto z-10">
        <div className="text-[#3D4947] mb-4 md:mb-0">
            © 2024 Possible. All rights reserved.
        </div>
        <div className="flex gap-8">
          <a className="text-[#3D4947] hover:text-teal-500 transition-colors" href="#">Privacy Policy</a>
          <a className="text-[#3D4947] hover:text-teal-500 transition-colors" href="#">Terms of Service</a>
          <a className="text-[#3D4947] hover:text-teal-500 transition-colors" href="#">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
