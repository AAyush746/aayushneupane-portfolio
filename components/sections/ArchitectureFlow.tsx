import { Reveal } from "@/components/ui/Reveal";

/**
 * Animated vertical architecture diagram — the engineering spine of a case
 * study, drawn as a move list rather than a flowchart widget.
 */
export function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="relative">
      <span
        aria-hidden
        className="absolute left-[1.05rem] top-3 bottom-3 w-px bg-line sm:left-[1.35rem]"
      />
      {steps.map((step, i) => {
        const isTerminal = i === steps.length - 1;
        const isBranch = step.includes("+") || step.toLowerCase() === "alert";
        return (
          <Reveal key={step} delay={i * 90}>
            <li className="relative flex items-start gap-5 pb-7 last:pb-0 sm:gap-7">
              <span
                className={`relative z-10 mt-1 flex h-[2.1rem] w-[2.1rem] shrink-0 items-center justify-center border bg-ink font-mono text-[0.62rem] tracking-[0.06em] transition-colors duration-500 sm:h-[2.7rem] sm:w-[2.7rem] ${
                  isTerminal
                    ? "border-accent text-accent"
                    : isBranch
                      ? "border-line-2 text-ivory"
                      : "border-line text-ivory-3"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 pt-1">
                <div
                  className={`t-display-3 !text-[clamp(1.05rem,2.2vw,1.7rem)] ${
                    isTerminal ? "text-accent" : ""
                  }`}
                >
                  {step}
                </div>
                {!isTerminal && (
                  <span className="mt-2 block font-mono text-[0.62rem] tracking-[0.28em] text-ivory-3">
                    ↓
                  </span>
                )}
              </div>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}
