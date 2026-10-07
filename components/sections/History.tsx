import { timeline } from "@/data/experience";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

const KIND_LABEL: Record<string, string> = {
  education: "DEVELOPMENT",
  competition: "COMPETITIVE PLAY",
  internship: "TOURNAMENT",
  project: "OPENING PREP",
};

export function History() {
  return (
    <section id="experience" className="relative border-t border-line py-[clamp(5rem,14vh,9rem)]">
      <div className="shell">
        <div className="mb-[clamp(2.5rem,7vh,5rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">07 — MATCH HISTORY</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">D5</span>
        </div>

        <div className="grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[0.8fr_1.6fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h3 className="max-w-[12ch]">
              <LineReveal lines={["MOVES", "PLAYED", "SO FAR."]} className="t-display-2" step={110} />
            </h3>
            <Reveal delay={300}>
              <p className="t-body mt-5 max-w-[34ch]">
                Chronological record — education, competitions, internships and the
                projects that came out of them.
              </p>
            </Reveal>
          </div>

          <ol className="relative border-l border-line pl-[clamp(1.5rem,4vw,3.5rem)]">
            {timeline.map((entry) => (
              <Reveal key={entry.move} delay={60}>
                <li className="group relative pb-[clamp(2.5rem,7vh,4.5rem)] last:pb-0">
                  <span className="absolute -left-[calc(clamp(1.5rem,4vw,3.5rem)+5px)] top-2 h-[9px] w-[9px] rotate-45 border border-ivory-3 bg-ink transition-colors duration-500 group-hover:border-accent group-hover:bg-accent" />

                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">
                      MOVE {String(entry.move).padStart(2, "0")}
                    </span>
                    <span className="t-meta !text-ivory-3">
                      {KIND_LABEL[entry.kind]}
                    </span>
                    <span className="t-meta">{entry.date}</span>
                  </div>

                  <h4 className="t-display-3 mt-3">{entry.title}</h4>
                  {entry.subtitle && (
                    <div className="t-meta mt-1.5 !text-ivory-2">{entry.subtitle}</div>
                  )}
                  <p className="t-body mt-3 max-w-[62ch] text-[0.95rem]">{entry.content}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
