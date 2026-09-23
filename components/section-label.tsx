export function SectionLabel({
  children,
  number,
}: {
  children: React.ReactNode;
  number: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em]">
      <span className="text-foreground/70">{number}</span>
      <span className="h-px w-6 bg-foreground/30" />
      {children}
    </div>
  );
}
