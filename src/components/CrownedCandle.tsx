export function CrownedCandle({ size = 36, color = '#B87333' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={Math.round(size * (72 / 56))}
      viewBox="0 0 56 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SireMammat Crowned Candle"
    >
      {/* Crown zigzag: 2 peaks, 3 valleys */}
      <polyline
        points="8,20 14,7 21,14 28,22 35,14 42,7 48,20"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Crown jewels */}
      <circle cx="8" cy="20" r="2.5" fill={color} />
      <circle cx="28" cy="22" r="2.5" fill={color} />
      <circle cx="48" cy="20" r="2.5" fill={color} />
      {/* Wick */}
      <line x1="28" y1="30" x2="28" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Candle body */}
      <rect x="17" y="38" width="22" height="28" rx="4" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Body midline */}
      <line x1="21" y1="52" x2="35" y2="52" stroke={color} strokeWidth="1.5" opacity="0.45" strokeLinecap="round" />
    </svg>
  );
}
