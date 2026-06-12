interface CrownedCandleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: { width: 28, height: 36, stroke: 2.5 },
  md: { width: 40, height: 52, stroke: 3 },
  lg: { width: 60, height: 80, stroke: 3.5 },
  xl: { width: 120, height: 160, stroke: 4 },
};

export function CrownedCandleLogo({ size = 'md', className = '' }: CrownedCandleLogoProps) {
  const config = sizeMap[size];
  const color = size === 'xl' ? '#E8C46A' : '#B87333'; // gold-light for display, gold for nav

  return (
    <svg
      width={config.width}
      height={config.height}
      viewBox="0 0 56 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Candle Body */}
      <rect x="12" y="30" width="32" height="38" rx="2" stroke={color} strokeWidth={config.stroke} fill="none" />

      {/* Midline */}
      <line x1="12" y1="49" x2="44" y2="49" stroke={color} strokeWidth={config.stroke * 0.5} opacity="0.3" />

      {/* Wick */}
      <line x1="28" y1="30" x2="28" y2="20" stroke={color} strokeWidth={config.stroke} strokeLinecap="round" />

      {/* Crown - 7 connected segments forming 2 peaks */}
      <line x1="8" y1="20" x2="15" y2="26" stroke={color} strokeWidth={config.stroke} strokeLinecap="round" />
      <line x1="15" y1="26" x2="24" y2="14" stroke={color} strokeWidth={config.stroke} strokeLinecap="round" />
      <line x1="24" y1="14" x2="28" y2="22" stroke={color} strokeWidth={config.stroke} strokeLinecap="round" />
      <line x1="28" y1="22" x2="32" y2="14" stroke={color} strokeWidth={config.stroke} strokeLinecap="round" />
      <line x1="32" y1="14" x2="41" y2="26" stroke={color} strokeWidth={config.stroke} strokeLinecap="round" />
      <line x1="41" y1="26" x2="48" y2="20" stroke={color} strokeWidth={config.stroke} strokeLinecap="round" />

      {/* Crown jewels - 3 dots at peaks and center valley */}
      <circle cx="8" cy="20" r="3" fill={color} />
      <circle cx="28" cy="22" r="3" fill={color} />
      <circle cx="48" cy="20" r="3" fill={color} />
    </svg>
  );
}
