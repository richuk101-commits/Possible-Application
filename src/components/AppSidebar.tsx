'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/',             icon: 'dynamic_feed',  label: 'Feed'      },
  { href: '/listings/new', icon: 'add_home',       label: 'New Listing' },
  { href: '/archive',      icon: 'archive',        label: 'Archive'   },
  { href: '/settings',     icon: 'settings',       label: 'Settings'  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 flex flex-col justify-between py-8 px-5 h-screen w-60 bg-[#F2F3FF] font-sans antialiased tracking-tight text-sm font-medium z-50 border-r border-slate-200/30">
      <div className="space-y-10">
        {/* Brand */}
        <div className="space-y-0.5 px-2">
          <h1 className="text-2xl font-black tracking-tighter text-[#131B2E]">Possible</h1>
          <p className="text-[9px] tracking-[0.2em] font-bold text-[#0D9488]/70 uppercase">The Intelligent Estate</p>
        </div>

        {/* Nav */}
        <nav className="space-y-0.5">
          {navItems.map(({ href, icon, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-primary font-semibold shadow-sm'
                    : 'text-[#3D4947] hover:text-[#131B2E] hover:bg-white/60'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
        <img
          alt="James Miller"
          className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDffMM25tw6R5Se_A4l7UychoKSrucAU7YDuPH6cuUMT2wZrmCICjABJLlwtN5mMQOTWa1TbFYcVxPgpen0Kyob8igPWS0cT3I-g1eeQNzZeyd8mtIvn-xRsFBnGMEzFrCV5GAfJ2ovzBIAEFKYPvAHRmRYjZIQmesdK5DgCwjka_qt59oOuDE3KvFuE32Fs-wq1SF86F4YhJeKeIcuIe63EXOkIlWTbWc_jhfNvYzAIc2EoU35j8BpR7f4Rd_kCf-WLMF9Nu8_Y0Y"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-[#131B2E] truncate">James Miller</span>
          <span className="text-[10px] text-[#3D4947]">Spencers</span>
        </div>
        <span className="material-symbols-outlined text-[#3D4947] ml-auto text-sm opacity-50">unfold_more</span>
      </div>
    </aside>
  );
}
