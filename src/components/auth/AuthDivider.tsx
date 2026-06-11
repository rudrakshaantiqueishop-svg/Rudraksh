export default function AuthDivider({ label = "or continue with" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="font-lato text-xs uppercase tracking-[0.08em] text-gray-text">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
