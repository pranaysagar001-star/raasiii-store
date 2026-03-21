export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-sm text-white/70 md:text-base">{subtitle}</p> : null}
    </div>
  );
}
