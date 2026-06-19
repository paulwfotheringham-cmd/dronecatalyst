export default function HeroScanOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block" aria-hidden>
      {/* Scan cone — anchored to drone in hero image (upper-right) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="beamOuter" x1="78%" y1="4%" x2="58%" y2="55%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beamCore" x1="76%" y1="6%" x2="62%" y2="48%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="groundHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#2563eb" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Drone origin marker */}
        <circle cx="1080" cy="72" r="8" fill="#e0f2fe" filter="url(#glow)" opacity="0.95" />

        {/* Main scan cone */}
        <path
          d="M1080,72 L1380,480 L1120,520 L880,280 Z"
          fill="url(#beamOuter)"
          className="animate-[scanPulse_2s_ease-in-out_infinite]"
        />
        <path
          d="M1080,72 L1240,420 L1100,450 L940,220 Z"
          fill="url(#beamCore)"
          filter="url(#glow)"
          className="animate-[scanPulse_2s_ease-in-out_infinite]"
        />

        {/* Beam edges */}
        <line x1="1080" y1="72" x2="1100" y2="450" stroke="#e0f2fe" strokeWidth="2.5" opacity="0.85" filter="url(#glow)" />
        <line x1="1080" y1="72" x2="940" y2="220" stroke="#7dd3fc" strokeWidth="2" opacity="0.7" filter="url(#glow)" />

        {/* Ground impact — centre of quarry scan zone */}
        <ellipse cx="1060" cy="430" rx="200" ry="90" fill="url(#groundHeat)" filter="url(#glow)" />

        {/* LiDAR mesh on terrain */}
        <g filter="url(#glow)" opacity="0.95">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <line
              key={`r${i}`}
              x1={860 + i * 12}
              y1={360 + i * 14}
              x2={1260 - i * 8}
              y2={380 + i * 16}
              stroke="#bae6fd"
              strokeOpacity={0.5 + i * 0.03}
              strokeWidth="1.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <line
              key={`c${i}`}
              x1={880 + i * 36}
              y1="350"
              x2={840 + i * 34}
              y2="510"
              stroke="#38bdf8"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
          ))}
        </g>

        {/* Scan sweep line */}
        <g className="animate-[scanSweep_1.8s_ease-in-out_infinite]">
          <rect x="860" y="360" width="400" height="5" rx="2.5" fill="#e0f2fe" opacity="0.9" filter="url(#glow)" />
        </g>
      </svg>

      {/* Point cloud shimmer on impact zone */}
      <div className="absolute right-[6%] top-[28%] h-[32%] w-[46%] max-w-[640px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.35)_0%,rgba(37,99,235,0.15)_50%,transparent_75%)]" />
        <div className="scan-point-cloud absolute inset-0" />
      </div>
    </div>
  );
}
