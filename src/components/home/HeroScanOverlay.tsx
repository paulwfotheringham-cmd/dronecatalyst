export default function HeroScanOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4] hidden sm:block"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="scanConeOuter" x1="68%" y1="6%" x2="52%" y2="58%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#2563eb" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="scanConeCore" x1="68%" y1="8%" x2="55%" y2="52%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="scanImpact" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#2563eb" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="scanLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#e0f2fe" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <filter id="scanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="impactGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Wide outer scan cone — drone to quarry */}
        <path
          d="M968,58 L1340,420 L1040,480 L720,240 Z"
          fill="url(#scanConeOuter)"
          className="animate-[scanPulse_2.5s_ease-in-out_infinite]"
        />
        {/* Bright inner beam core */}
        <path
          d="M988,68 L1180,380 L1020,410 L860,180 Z"
          fill="url(#scanConeCore)"
          filter="url(#scanGlow)"
          className="animate-[scanPulse_2.5s_ease-in-out_infinite]"
        />
        {/* Beam edge lines for readability */}
        <line
          x1="988"
          y1="68"
          x2="1020"
          y2="410"
          stroke="#7dd3fc"
          strokeOpacity="0.7"
          strokeWidth="2"
          filter="url(#scanGlow)"
        />
        <line
          x1="988"
          y1="68"
          x2="860"
          y2="180"
          stroke="#7dd3fc"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          filter="url(#scanGlow)"
        />

        {/* Ground impact heatmap — where beam hits quarry */}
        <ellipse
          cx="980"
          cy="400"
          rx="165"
          ry="72"
          fill="url(#scanImpact)"
          filter="url(#impactGlow)"
        />

        {/* LiDAR terrain mesh at scan impact */}
        <g filter="url(#scanGlow)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
            <line
              key={`h-${row}`}
              x1={820 + row * 14}
              y1={340 + row * 16}
              x2={1140 - row * 6}
              y2={360 + row * 18}
              stroke="#7dd3fc"
              strokeOpacity={0.45 + row * 0.04}
              strokeWidth="1.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
            <line
              key={`v-${col}`}
              x1={840 + col * 32}
              y1="330"
              x2={800 + col * 30}
              y2="470"
              stroke="#38bdf8"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
          ))}
          {[
            [880, 370], [920, 385], [960, 360], [1000, 390], [1040, 375],
            [1080, 400], [1120, 385], [900, 410], [980, 420], [1060, 415],
            [940, 395], [1020, 405], [860, 390], [1100, 370],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#e0f2fe" opacity="0.95" />
          ))}
        </g>

        {/* Animated scan sweep across impact zone */}
        <g className="animate-[scanSweep_2s_ease-in-out_infinite]">
          <rect
            x="820"
            y="340"
            width="340"
            height="4"
            rx="2"
            fill="url(#scanLine)"
            filter="url(#scanGlow)"
          />
        </g>

        {/* Data flow — scan output to dashboard below-right */}
        <path
          d="M1040,470 C1080,530 1180,620 1280,710"
          stroke="#60a5fa"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="8 10"
          filter="url(#scanGlow)"
          className="animate-[dashFlow_2s_linear_infinite]"
        />
        <circle cx="1040" cy="470" r="6" fill="#38bdf8" opacity="0.9" filter="url(#scanGlow)" />
      </svg>

      {/* Point cloud at impact zone — upper quarry, not dashboard area */}
      <div className="absolute right-[14%] top-[34%] h-[22%] w-[38%]">
        <div className="absolute inset-0 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28)_0%,rgba(37,99,235,0.12)_45%,transparent_72%)]" />
        <div className="scan-point-cloud absolute inset-0 opacity-90" />
      </div>
    </div>
  );
}
