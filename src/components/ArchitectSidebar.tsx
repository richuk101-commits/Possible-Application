'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/assignments', icon: 'dynamic_feed',  label: 'Feed'           },
  { href: '/my-work',    icon: 'assignment',     label: 'My Assignments' },
  { href: '/archive',    icon: 'archive',        label: 'Archive'        },
  { href: '/settings',   icon: 'settings',       label: 'Settings'       },
];

export default function ArchitectSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 flex flex-col justify-between py-8 px-5 h-screen w-60 bg-slate-50 font-sans antialiased tracking-tight text-sm font-medium z-50 border-r border-slate-200">
      <div className="space-y-10">
        {/* Brand */}
        <div className="space-y-0.5 px-2">
          <h1 className="text-lg font-black tracking-tighter text-slate-900 uppercase">Possible</h1>
          <p className="text-[9px] tracking-[0.2em] font-bold text-on-surface-variant/70 uppercase">The Intelligent Estate</p>
          <div className="mt-1.5 h-0.5 w-8 bg-primary rounded-full"></div>
        </div>

        {/* Nav */}
        <nav className="space-y-0.5">
          {navItems.map(({ href, icon, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-slate-200 text-teal-700 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
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
      <div className="flex items-center gap-3 px-2 pt-6 border-t border-slate-200">
        <img
          alt="Sarah Chen"
          className="w-9 h-9 rounded-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7JJ_LFVjH8W4ilyjE9CqIG_QiWC1aoRgUH6GCeRKVSJjnERTw1ux8AKjyjg56wSgmyMJ88gnWM4j6UCa_8Yt7RGNf3M-zkgS_bPV7mCj9GMtpXEL7_u5EF00RnG-k8NjkPFhD167xQPLt7wirCZHbRJvJl7s8AomV_tbOEUogIQAFHiz_CCrtUZxUvysM_shwctChtQrLJGwvmqKbJTiqCEbzSJjM-NtwI5kKjHtZy3XSHcYYX263rPwVQ85z3VJasWHp0dvEFHU"
        />
        <div className="flex flex-col">
          <span className="text-xs font-bold text-on-surface">Sarah Chen</span>
          <span className="text-[10px] text-on-surface-variant">Principal · Spacecraft</span>
        </div>
      </div>
    </aside>
  );
}
