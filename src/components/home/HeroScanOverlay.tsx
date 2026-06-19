export default function HeroScanOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] hidden sm:block"
      aria-hidden
    >
      {/* LiDAR cone — drone to quarry */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="scanCone" x1="72%" y1="8%" x2="58%" y2="72%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#2563eb" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="scanLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <filter id="scanGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Scan cone from drone position to quarry surface */}
        <path
          d="M1008,72 L1180,520 L860,580 L780,420 Z"
          fill="url(#scanCone)"
          className="animate-[scanPulse_3s_ease-in-out_infinite]"
        />

        {/* Terrain mesh on quarry — visible immediately */}
        <g opacity="0.85" filter="url(#scanGlow)">
          {[0, 1, 2, 3, 4, 5, 6].map((row) => (
            <line
              key={`h-${row}`}
              x1={820 + row * 18}
              y1={380 + row * 22}
              x2={1180 - row * 8}
              y2={420 + row * 28}
              stroke="#38bdf8"
              strokeOpacity={0.35 + row * 0.05}
              strokeWidth="1"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
            <line
              key={`v-${col}`}
              x1={860 + col * 42}
              y1={360}
              x2={820 + col * 38}
              y2={560}
              stroke="#2563eb"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          ))}
          {[
            [920, 440],
            [980, 460],
            [1040, 430],
            [1100, 480],
            [960, 510],
            [1080, 520],
            [1140, 450],
            [880, 490],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#60a5fa" opacity="0.9" />
          ))}
        </g>

        {/* Animated scan sweep */}
        <g className="animate-[scanSweep_2.4s_ease-in-out_infinite]">
          <rect
            x="820"
            y="380"
            width="360"
            height="3"
            fill="url(#scanLine)"
            filter="url(#scanGlow)"
          />
        </g>

        {/* Connection line — quarry scan to dashboard zone */}
        <path
          d="M1050,560 Q1120,620 1220,680"
          stroke="#3b82f6"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="animate-[dashFlow_2s_linear_infinite]"
        />
      </svg>

      {/* Point cloud shimmer */}
      <div className="absolute right-[8%] top-[42%] h-[28%] w-[32%] opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_70%)]" />
        <div className="scan-point-cloud absolute inset-0" />
      </div>
    </div>
  );
}
