export default function HeroScanOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[4] hidden md:block" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="scanBeam" x1="72%" y1="8%" x2="58%" y2="52%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <filter id="beamGlow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Scan cone from drone */}
        <path
          d="M1020,88 L1220,420 L980,460 L820,240 Z"
          fill="url(#scanBeam)"
          className="animate-[scanPulse_2.5s_ease-in-out_infinite]"
        />
        <line
          x1="1020"
          y1="88"
          x2="980"
          y2="460"
          stroke="#7dd3fc"
          strokeWidth="2"
          opacity="0.75"
          filter="url(#beamGlow)"
        />
        <line
          x1="1020"
          y1="88"
          x2="820"
          y2="240"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          opacity="0.55"
          filter="url(#beamGlow)"
        />

        {/* Ground mesh at impact */}
        <g opacity="0.8" filter="url(#beamGlow)">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={`h${i}`}
              x1={840 + i * 14}
              y1={360 + i * 14}
              x2={1140 - i * 6}
              y2={380 + i * 16}
              stroke="#7dd3fc"
              strokeOpacity={0.45 + i * 0.04}
              strokeWidth="1.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={`v${i}`}
              x1={860 + i * 38}
              y1="350"
              x2={820 + i * 36}
              y2="480"
              stroke="#38bdf8"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
          ))}
        </g>

        {/* Scan sweep */}
        <g className="animate-[scanSweep_2s_ease-in-out_infinite]">
          <rect x="840" y="360" width="300" height="3" rx="1.5" fill="#e0f2fe" opacity="0.85" filter="url(#beamGlow)" />
        </g>
      </svg>
    </div>
  );
}
