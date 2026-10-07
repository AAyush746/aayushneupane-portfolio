import type { ProjectVisual } from "@/data/projects";

const CELLS = "01001101001110100101100111001010011100010110100110101100010110";

export function ProjectVisual({ kind, name }: { kind: ProjectVisual; name: string }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-ink-2">
      <svg
        viewBox="0 0 160 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {kind === "packets" && (
          <g stroke="#f1eee6" strokeOpacity="0.32" fill="none" strokeWidth="0.4">
            {[14, 28, 42, 56, 70, 84].map((y, i) => (
              <g key={y}>
                <line x1="0" y1={y} x2="160" y2={y} strokeDasharray="10 6" opacity="0.35">
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-32"
                    dur={`${2.4 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </line>
                <rect x={12 + i * 22} y={y - 2.4} width="7" height="4.8" fill="#1fde85" fillOpacity="0.85" stroke="none">
                  <animate attributeName="x" values={`8;150;8`} dur={`${6 + i}s`} repeatCount="indefinite" />
                </rect>
              </g>
            ))}
          </g>
        )}

        {kind === "topology" && (
          <g stroke="#f1eee6" strokeOpacity="0.35" fill="none" strokeWidth="0.4">
            <line x1="30" y1="50" x2="80" y2="26" />
            <line x1="30" y1="50" x2="78" y2="74" />
            <line x1="80" y1="26" x2="130" y2="44" />
            <line x1="78" y1="74" x2="130" y2="44" />
            <line x1="80" y1="26" x2="78" y2="74" strokeDasharray="3 3" />
            {[
              [30, 50],
              [80, 26],
              [78, 74],
              [130, 44],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="5.5" fill="#08090a" />
                <circle cx={x} cy={y} r="3" fill={i === 3 ? "#1fde85" : "#f1eee6"} fillOpacity={i === 3 ? 1 : 0.75} stroke="none">
                  <animate attributeName="r" values="3;5;3" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </g>
        )}

        {kind === "phish" && (
          <g>
            <rect x="46" y="30" width="68" height="42" fill="none" stroke="#f1eee6" strokeOpacity="0.4" strokeWidth="0.6" />
            <path d="M46 30 L80 54 L114 30" fill="none" stroke="#1fde85" strokeOpacity="0.9" strokeWidth="0.7" />
            <line x1="46" y1="72" x2="114" y2="30" stroke="#f1eee6" strokeOpacity="0.18" strokeWidth="0.4" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2s" repeatCount="indefinite" />
            </line>
            <circle cx="114" cy="30" r="7" fill="#08090a" stroke="#1fde85" strokeWidth="0.6" />
            <path d="M111 30 l2 2 l4 -4.5" fill="none" stroke="#1fde85" strokeWidth="0.8" />
          </g>
        )}

        {kind === "cipher" && (
          <g fontFamily="monospace" fontSize="5.4" fill="#f1eee6" fillOpacity="0.5">
            {Array.from({ length: 8 }).map((_, r) => (
              <text key={r} x="16" y={22 + r * 8.4}>
                {CELLS.slice(r * 8, r * 8 + 16)}
                <animate
                  attributeName="opacity"
                  values="0.35;1;0.35"
                  dur="4s"
                  begin={`${r * 0.35}s`}
                  repeatCount="indefinite"
                />
              </text>
            ))}
            <rect x="90" y="14" width="58" height="72" fill="#08090a" fillOpacity="0.0" stroke="#1fde85" strokeOpacity="0.7" strokeWidth="0.6" />
          </g>
        )}

        {kind === "editorial" && (
          <g>
            <rect x="24" y="18" width="112" height="64" fill="none" stroke="#f1eee6" strokeOpacity="0.3" strokeWidth="0.5" />
            <text
              x="80"
              y="58"
              textAnchor="middle"
              fontFamily="serif"
              fontStyle="italic"
              fontSize="22"
              fill="#f1eee6"
              fillOpacity="0.85"
            >
              {name.split(" ")[0]}
            </text>
            <line x1="24" y1="70" x2="136" y2="70" stroke="#1fde85" strokeOpacity="0.8" strokeWidth="0.5">
              <animate attributeName="x2" values="40;136;40" dur="6s" repeatCount="indefinite" />
            </line>
          </g>
        )}
      </svg>

      <span className="absolute left-3 top-3 font-mono text-[0.6rem] tracking-[0.2em] text-ivory-3">
        FIG. {name.toUpperCase()}
      </span>
      <span className="absolute bottom-3 right-3 font-mono text-[0.6rem] tracking-[0.2em] text-accent">
        LIVE TRACE
      </span>
    </div>
  );
}
