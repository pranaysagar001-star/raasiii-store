'use client';

type SalesChartProps = {
  title: string;
  points: { label: string; value: number }[];
};

export function SalesChart({ title, points }: SalesChartProps) {
  const gradientId = `chart-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const values = points.map((point) => point.value);
  const maxValue = Math.max(...values, 1);
  const width = 100;
  const height = 56;

  const polyline = points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - (point.value / maxValue) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="admin-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold/80">Sales Chart</p>
          <h3 className="mt-1 font-display text-3xl">{title}</h3>
        </div>
        <p className="text-sm text-white/70">Mock analytics-ready</p>
      </div>

      <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7d48a" />
              <stop offset="100%" stopColor="#c89b3c" />
            </linearGradient>
          </defs>
          <polyline fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" points={`0,${height} ${width},${height}`} />
          <polyline fill="none" stroke={`url(#${gradientId})`} strokeWidth="3" points={polyline} />
          {points.map((point, index) => {
            const x = (index / Math.max(points.length - 1, 1)) * width;
            const y = height - (point.value / maxValue) * height;
            return <circle key={`${point.label}-${point.value}`} cx={x} cy={y} r="2.4" fill="#f7d48a" />;
          })}
        </svg>
        <div className="mt-4 grid grid-cols-4 gap-2 text-[11px] uppercase tracking-[0.16em] text-white/65">
          {points.map((point) => (
            <div key={point.label}>
              <p>{point.label}</p>
              <p className="mt-1 text-gold">₹{point.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
