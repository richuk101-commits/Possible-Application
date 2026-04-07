type StatusVariant = 'active' | 'urgent' | 'open' | 'closed' | 'expired' | 'draft' | 'pending';

const variantStyles: Record<StatusVariant, { dot: string; text: string; label: string }> = {
  active:  { dot: 'bg-[#0D9488]',  text: 'text-[#0D9488]',  label: 'ACTIVE'  },
  urgent:  { dot: 'bg-amber-400',  text: 'text-amber-600',  label: 'URGENT'  },
  open:    { dot: 'bg-blue-400',   text: 'text-blue-500',   label: 'OPEN'    },
  closed:  { dot: 'bg-slate-300',  text: 'text-slate-400',  label: 'CLOSED'  },
  expired: { dot: 'bg-slate-300',  text: 'text-slate-400',  label: 'EXPIRED' },
  draft:   { dot: 'bg-amber-400',  text: 'text-amber-600',  label: 'DRAFT'   },
  pending: { dot: 'bg-blue-400',   text: 'text-blue-500',   label: 'PENDING' },
};

interface StatusBadgeProps {
  variant: StatusVariant;
  label?: string;
}

export default function StatusBadge({ variant, label }: StatusBadgeProps) {
  const styles = variantStyles[variant];
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${styles.dot} blur-[1px]`} />
      <span className={`text-[10px] font-bold tracking-wider ${styles.text}`}>
        {label ?? styles.label}
      </span>
    </div>
  );
}
