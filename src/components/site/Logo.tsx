export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-3 group">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant">
        <span className="font-display text-xl font-bold">ॐ</span>
        <span className="absolute inset-0 rounded-full ring-2 ring-[var(--color-gold)]/70 ring-offset-2 ring-offset-background transition group-hover:ring-offset-4" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-lg font-bold tracking-wide text-foreground">
            GANESH <span className="text-primary">DHABA</span>
          </span>
          <span className="block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Authentic • Since 2014
          </span>
        </span>
      )}
    </a>
  );
}
