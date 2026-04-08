'use client';

import { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import AppHeader from '@/components/AppHeader';
import toast from 'react-hot-toast';

const sections = [
  { id: 'profile', icon: 'person', label: 'Profile' },
  { id: 'firm', icon: 'business', label: 'Firm' },
  { id: 'notifications', icon: 'notifications', label: 'Notifications' },
  { id: 'portals', icon: 'link', label: 'Connected Portals' },
  { id: 'billing', icon: 'credit_card', label: 'Billing' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'James',
    lastName: 'Miller',
    email: 'james.miller@spencers.co.uk',
    phone: '+44 117 900 1234',
    role: 'Estate Agent',
    title: 'Head of Development',
  });

  const [firm, setFirm] = useState({
    name: 'Spencers',
    website: 'www.spencers.co.uk',
    location: 'Bristol, UK',
    size: '11-50 employees',
    tagline: 'Premium Property. Possible.',
  });

  const [notifications, setNotifications] = useState({
    newInterest: true,
    designSubmitted: true,
    reportReady: true,
    deadlineReminder: true,
    clientViewed: false,
    weeklyDigest: true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success('Settings saved');
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <AppSidebar />
      <main className="flex-1 ml-60 flex flex-col min-h-screen bg-[#FAF8FF] overflow-y-auto">
        <AppHeader />

        <section className="max-w-5xl mx-auto w-full px-10 pt-6 pb-28">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Settings</h1>
            <p className="text-xs text-on-surface-variant mt-1">Manage your profile, firm, and preferences</p>
          </div>

          <div className="flex gap-8">
            {/* Left Nav */}
            <nav className="w-48 flex-shrink-0 space-y-0.5">
              {sections.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    activeSection === id
                      ? 'bg-white text-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-white/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  {label}
                </button>
              ))}
            </nav>

            {/* Right Panel */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

              {/* Profile */}
              {activeSection === 'profile' && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                    <div className="relative">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDffMM25tw6R5Se_A4l7UychoKSrucAU7YDuPH6cuUMT2wZrmCICjABJLlwtN5mMQOTWa1TbFYcVxPgpen0Kyob8igPWS0cT3I-g1eeQNzZeyd8mtIvn-xRsFBnGMEzFrCV5GAfJ2ovzBIAEFKYPvAHRmRYjZIQmesdK5DgCwjka_qt59oOuDE3KvFuE32Fs-wq1SF86F4YhJeKeIcuIe63EXOkIlWTbWc_jhfNvYzAIc2EoU35j8BpR7f4Rd_kCf-WLMF9Nu8_Y0Y"
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                      />
                      <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-sm hover:brightness-110 transition-all">
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                      </button>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-on-surface">James Miller</p>
                      <p className="text-xs text-on-surface-variant">Head of Development · Spencers</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'First Name', key: 'firstName' },
                      { label: 'Last Name', key: 'lastName' },
                      { label: 'Email Address', key: 'email' },
                      { label: 'Phone Number', key: 'phone' },
                      { label: 'Title', key: 'title' },
                    ].map(({ label, key }) => (
                      <div key={key} className="space-y-1.5">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{label}</label>
                        <input
                          value={(profile as any)[key]}
                          onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                          className="w-full bg-transparent border-none outline-none border-b border-slate-200 focus:border-primary py-2 text-sm font-medium text-on-surface transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Firm */}
              {activeSection === 'firm' && (
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-5 pb-8 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-2xl">S</div>
                    <div>
                      <p className="text-lg font-bold text-on-surface">Spencers</p>
                      <p className="text-xs text-on-surface-variant">Bristol, UK · Premium Estate Agency</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'Firm Name', key: 'name' },
                      { label: 'Website', key: 'website' },
                      { label: 'Location', key: 'location' },
                      { label: 'Team Size', key: 'size' },
                      { label: 'Tagline', key: 'tagline' },
                    ].map(({ label, key }) => (
                      <div key={key} className="space-y-1.5">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{label}</label>
                        <input
                          value={(firm as any)[key]}
                          onChange={(e) => setFirm((f) => ({ ...f, [key]: e.target.value }))}
                          className="w-full bg-transparent border-none outline-none border-b border-slate-200 focus:border-primary py-2 text-sm font-medium text-on-surface transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeSection === 'notifications' && (
                <div className="p-8 space-y-2">
                  <p className="text-xs text-on-surface-variant pb-4 border-b border-slate-100">Choose which events trigger notifications in-app and by email.</p>
                  {[
                    { key: 'newInterest', label: 'Architect expresses interest', sub: 'When an architect marks interest in one of your listings' },
                    { key: 'designSubmitted', label: 'Design submitted', sub: 'When an architect submits their design package' },
                    { key: 'reportReady', label: 'Report ready for review', sub: 'When a full development report is ready for your sign-off' },
                    { key: 'deadlineReminder', label: 'Deadline reminder', sub: '24h before an architect submission deadline' },
                    { key: 'clientViewed', label: 'Client viewed report', sub: 'When your client opens their shared report link' },
                    { key: 'weeklyDigest', label: 'Weekly digest', sub: 'A summary of your portfolio activity every Monday' },
                  ].map(({ key, label, sub }) => (
                    <div key={key} className="flex items-center justify-between py-4 border-b border-slate-50">
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{label}</p>
                        <p className="text-[11px] text-on-surface-variant mt-0.5">{sub}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((n) => ({ ...n, [key]: !(n as any)[key] }))}
                        className={`relative w-11 h-6 rounded-full transition-all ${
                          (notifications as any)[key] ? 'bg-primary' : 'bg-slate-200'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                            (notifications as any)[key] ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Connected Portals */}
              {activeSection === 'portals' && (
                <div className="p-8 space-y-4">
                  <p className="text-xs text-on-surface-variant pb-4 border-b border-slate-100">Connect your portal accounts to automatically sync listings into Possible.</p>
                  {[
                    { name: 'Rightmove', connected: true, logo: 'R', color: 'bg-[#00DEB6]' },
                    { name: 'Zoopla', connected: false, logo: 'Z', color: 'bg-[#8247E5]' },
                    { name: 'OnTheMarket', connected: false, logo: 'O', color: 'bg-[#1A3C5E]' },
                  ].map(({ name, connected, logo, color }) => (
                    <div key={name} className="flex items-center justify-between p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white font-black text-lg`}>
                          {logo}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">{name}</p>
                          <p className="text-[11px] text-on-surface-variant">{connected ? 'Connected · Syncing listings' : 'Not connected'}</p>
                        </div>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all ${
                          connected
                            ? 'bg-primary/10 text-primary hover:bg-primary/20'
                            : 'bg-primary text-white hover:brightness-110 shadow-sm'
                        }`}
                      >
                        {connected ? 'Manage' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Billing */}
              {activeSection === 'billing' && (
                <div className="p-8 space-y-6">
                  <div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-2xl text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Current Plan</p>
                    <p className="text-2xl font-black">Professional</p>
                    <p className="text-sm opacity-80 mt-1">Unlimited listings · Priority AI research · Full reporting suite</p>
                    <p className="text-3xl font-black mt-4">£149<span className="text-base font-medium opacity-70">/month</span></p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Usage this month</p>
                    {[
                      { label: 'Active Listings', used: 12, limit: 'Unlimited' },
                      { label: 'Reports Generated', used: 4, limit: 'Unlimited' },
                      { label: 'AI Research Runs', used: 18, limit: 'Unlimited' },
                    ].map(({ label, used, limit }) => (
                      <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50">
                        <span className="text-sm text-on-surface">{label}</span>
                        <span className="text-sm font-bold text-on-surface">{used} <span className="text-on-surface-variant font-normal">/ {limit}</span></span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-3 border-2 border-primary text-primary rounded-full font-bold text-sm hover:bg-primary/5 transition-all">
                    Manage Billing
                  </button>
                </div>
              )}

              {/* Save Footer */}
              <div className="px-8 py-5 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-3">
                <button className="px-5 py-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-full hover:brightness-110 transition-all shadow-sm shadow-primary/10 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                      Saving…
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
